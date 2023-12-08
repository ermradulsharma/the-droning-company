import React, { useEffect, useState} from 'react';
import './Menubar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import useAuthContext from "../../../hooks/useAuthContext";
import useThemeContext from "../../../hooks/useThemeContext";

const Menubar = (props) => {
        const {themeMode, setThemeMode} = useThemeContext();
        const { authTokens } = useAuthContext();
        const [ open, setOpen ] = useState(false);
        useEffect(() => {
                const clickHandler = ({ target }) => {
                  const container = document.getElementById(`menu-top`);
                  const profile = document.getElementById(`profile-icon`);
                  if ((container && container.contains(target)) || (profile && profile.contains(target))) return;
                  setOpen(false);
                };
            
                document.addEventListener("click", clickHandler);
            
                // these functions clean up the event listeners
                return () => document.removeEventListener("click", clickHandler);
        });

        return (        
                <header className="UL-main-header UL-pos-absolute">
                <div className="w100pr DesktopOnly"> 
                {
                        authTokens ? <div className="profile f-right">
                                    <div className="UL-pos-relative UL-avatar-xs ml10 UL-mg-t-5 UL-mg-r-15">
                                        <span id="profile-icon" className="UL-avatar-initial UL-rounded-circle cr-pointer" onClick={ () => setOpen(!open) }>UN</span>
                                    </div>
                        </div>
                        : null
                }           
                        <NavigationItems />
                        <label className="ULswitchS UL-pos-relative f-right UL-mg-t-10 UL-mg-r-30" title={themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}>
                                <input type="checkbox" onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} checked={themeMode === 'dark' ? true : false}/>
                                <span className="ULsliderS ULround UL-pos-absolute cr-pointer"></span>
                        </label>
                        <MenuDropdown open={open} id="top"/>
                
                </div>
                </header>
        )
};

export default Menubar;