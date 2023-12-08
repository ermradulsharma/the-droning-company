import React, {useState} from 'react';
import ReactFlagsSelect from 'react-flags-select';
import i18next from "i18next";

const LanguageSelector = (props) => {
    const selectedCountry = localStorage.getItem('selected-country') ? localStorage.getItem('selected-country') : 'US';
    const [userCountry, setUserCountry] = useState(selectedCountry);
    const onSelectFlag = (countryCode) => {
        console.log(countryCode);
        let languageCode = countryCode;
        if (countryCode === 'US') {
            languageCode = 'EN';
        }
        languageCode = languageCode.toString().toLowerCase();
        i18next.changeLanguage(languageCode);
        setUserCountry(countryCode);
        localStorage.setItem('selected-country', countryCode);
        localStorage.setItem('selected-language', languageCode);
    }

    return <ReactFlagsSelect 
                countries={["US", "DE"]} 
                defaultCountry = {userCountry}
                customLabels={{"en": "EN-US","de": "DE"}} 
                showSelectedLabel={props.selectedLabel ? props.selectedLabel : false}
                showOptionLabel={props.optionLable ? props.optionLable : false}
                onSelect={onSelectFlag}
                className={props.class}
            />
}

export default LanguageSelector;