import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';

const MenuDropdown = (props) => {

    return (
        <div id={`menu-${props.id}`} className={` UL-pos-relative ${props.open ? 'UL-d-block' : 'UL-d-none'}`}>
            <div className="UL-profile-div ULbgF ULBorderForm UL-rounded f-right UL-pos-absolute UL-mg-t-40 UL-r-0">
                <div className="ul-col-md-12">
                    <div className="UL-profile Ul-float-revert">
                        <div className="UL-profile-pic">
                        <p>UN</p>
                        </div>
                        <div className="upload-pic text-center"><i className="fas fa-camera"></i></div>
                    </div>
                </div>
                <div className="ul-col-md-12 UL-mg-t-40">
                    <div className="UL-border-bt UL-clearBoth">
                        <h2>Unknown Name</h2>
                        <div className="ul-email">unknown.name@ul.com</div>
                        <div className="UL-service-dpt">Information Service</div>
                        <div className="UL-service-dpt">TS Solution Architect</div>
                    </div>
                </div>
                <div className="ul-col-md-12">
                    <div className="UL-profile-menu pd10">
                        <ul>
                            <NavigationItem link="/my-account" id="account" display>Account Details</NavigationItem>
                            <NavigationItem link="/logout" id="logout" display>Logout</NavigationItem>
                        </ul>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default MenuDropdown;