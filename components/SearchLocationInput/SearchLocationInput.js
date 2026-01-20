import React, { useState, useEffect, useRef } from "react";
import { GOOGLE_API_KEY } from "../../util/Constants";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";

let autoComplete;

const loadScript = (url, callback) => {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    script.id = 'googleMaps';
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    // Check if script is already loaded and ready
    if (window.google && window.google.maps && window.google.maps.places) {
      callback();
    } else {
      existingScript.addEventListener('load', callback);
    }
  }
};

function handleScriptLoad(updateQuery, autoCompleteRef, props, setLocObj) {
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    // Retry after 100ms if API is not yet available
    setTimeout(() => handleScriptLoad(updateQuery, autoCompleteRef, props, setLocObj), 100);
    return;
  }

  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"] }//, componentRestrictions: { country: "us" } 
  );
  autoComplete.setFields(["address_components", "formatted_address", "name"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, props, setLocObj)
  );
}

async function handlePlaceSelect(updateQuery, props, setLocObj) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  const locationObject = getPlaceObject(addressObject);
  setLocObj(JSON.stringify(locationObject));
  if (props.hasOwnProperty('locationSelect')) {
    props.locationSelect(locationObject);
  }
}


const getPlaceObject = (places) => {
  let address1 = "";
  let postcode = "";
  let city = "";
  let state = "";
  let country = "";
  let placeObject = {};
  for (const component of places.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.long_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }

      case "locality":
        city = component.long_name;
        break;

      case "administrative_area_level_1": {
        state = component.long_name;
        break;
      }

      case "country":
        country = component.long_name;
        break;
    }
  }
  placeObject.address = `${address1} - ${postcode}`;
  placeObject.city = city;
  placeObject.state = state;
  placeObject.country = country;

  return placeObject;
}

const SearchLocationInput = (props) => {
  const [query, setQuery] = useState(props?.setInputLocation);
  const [locObj, setLocObj] = useState("");
  const { location } = useCommonFunctionContext();
  const autoCompleteRef = useRef(null);
  useEffect(() => {
    // The Google Maps script is already loaded via _app.js. Ensure the API is ready before initializing.
    const initAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        handleScriptLoad(setQuery, autoCompleteRef, props, setLocObj);
      } else {
        // Retry after a short delay
        setTimeout(initAutocomplete, 100);
      }
    };
    initAutocomplete();
  }, [props]);

  useEffect(() => {
    if (props.hasOwnProperty('locationString')) {
      setQuery(props.locationString);
    }
    if (location) {
      setQuery("");
      setLocObj("");
    }
  }, [location, props.locationString, props]);

  useEffect(() => {
    if (props.hasOwnProperty('locationSelect')) {
      props.locationSelect(query)
    }
  }, [query, props]);
  return (
    <input
      data-obj={locObj}
      id="location-input"
      ref={autoCompleteRef}
      onChange={event => setQuery(event.target.value)}
      placeholder={props.placeholder ? props.placeholder : 'Enter a City'}
      value={query}
      name={props.name ? props.name : ''}
      style={{ minWidth: 260 }}
      className={props.class ? props.class : "form-control"}
    />
  );
};

export default SearchLocationInput;