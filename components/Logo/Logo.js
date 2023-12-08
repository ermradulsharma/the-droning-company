import React from 'react';
import WebsiteLogo from '../../assets/images/logo.png';
import '../Logo/Logo.css';
const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={WebsiteLogo}  alt="home"/>
    </div>
);

export default logo;