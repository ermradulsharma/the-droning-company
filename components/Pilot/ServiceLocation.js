import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAP_PLACE_API_KEY } from "../../util/Constants";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const ServiceLocation = ({ profileId, travelOption }) => {
    const [locations, setLocations] = useState([]);
    const [hasMapDataExist, setMapDataExist] = useState(false);

    useEffect(() => {
        fetch(`${SERVER_URL}/pilot-profile/service-address/${profileId}`, {
            method: "GET",
        }, [profileId])
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    console.log(response);
                    setLocations(response.data);
                    setMapDataExist(true)
                }
            });
    }, []);


    const loader = new Loader({
        apiKey: GOOGLE_MAP_PLACE_API_KEY,
        version: "weekly",
        libraries: ["places", "geometry", "drawing"]
    });

    // Promise
    loader.load().then((google) => {

        //create empty LatLngBounds object
        const bounds = new google.maps.LatLngBounds();
        //  const infowindow = new google.maps.InfoWindow();

        const map = new google.maps.Map(document.getElementById('pilotLocationId'), {
            zoom: 10,
            center: new google.maps.LatLng(locations[0][2], locations[0][3]),
        });

        let marker, i;
        let markers = [];

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][2], locations[i][3]),
                map: map,
            });
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', ((marker, i) => {
                return () => {
                    const getInfoWindow = new google.maps.InfoWindow({
                        content: locations[i][0] + ',' + locations[i][1]
                    });

                    getInfoWindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: true,
                    });
                }
            })(marker, i))

        }

        if(locations.length>=2){
            //   Go through each...
            markers.map((marker, index) => {
            return bounds.extend(marker.position);
            })
        //  Fit these bounds to the map
            map.fitBounds(bounds);
        }

      
    }).catch(e => {
        // do something
    });


    return (
        hasMapDataExist ?
            <Aux>
                <div className="ServiceArea">
                    <div className="NormalHeading">Service Area</div>
                    <p style={{marginLeft:'10px'}}> {locations[0][0] + ',' + locations[0][1]} {travelOption === 'Yes' ? '( Willing to travel )' : ''} </p>
                    <div id="pilotLocationId" style={{ height: '100vh', width: '100%' }}>
                    </div>

                </div>
            </Aux> : ''
    )
}

export default ServiceLocation;
