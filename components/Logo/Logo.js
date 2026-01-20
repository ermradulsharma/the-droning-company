import React from 'react';
import Image from "next/image";
import WebsiteLogo from '../../assets/images/logo.png';
import '../Logo/Logo.css';
const logo = (props) => (
    <div className="Logo" style={{ height: props.height }}>
        <Image src={WebsiteLogo} alt="home" width={200} height={50} />
    </div>
);

export default logo;