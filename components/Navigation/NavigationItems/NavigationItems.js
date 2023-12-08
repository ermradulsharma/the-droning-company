import React from 'react';
import './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import useAuthContext from "../../../hooks/useAuthContext";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
const NavigationItems = () => {
    const { authTokens } = useAuthContext();
    return (
        <ul className="ULnavbar-nav ULd-flex f-right">
            {
                authTokens ?
                (
                    <Aux>
                        <NavigationItem link="/dashboard" id="dashboard">Dashboard</NavigationItem>
                        <NavigationItem link="/my-account" id="account">My Account</NavigationItem>
                        <NavigationItem link="/logout" id="logout">Logout</NavigationItem>
                    </Aux>
                ) :
                (
                    <Aux>                            
                        <NavigationItem link="/login"  id="login">Login</NavigationItem>
                        <NavigationItem link="/sign-up" id="sign-up">Sign Up</NavigationItem>
                        <NavigationItem link="/forgot-password" id="forgot-pwd">Forgot Password</NavigationItem>
                    </Aux>                    
                )
            }           
            
        </ul>        
    );
    
}

export default NavigationItems;