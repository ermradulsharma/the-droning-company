import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './NavigationItem.css';
import { LANDING_PAGE } from '../../../util/Constants';
/**
 * 
 * @param {integer}  props.id
 * @param {string}   props.MobileOnly to show menu only for Mobile View
 * @param {string}   props.link       link/href for the menu
 * @param {boolean}  props.drawer     wheteher menu created for drawer or top menu bar
*  @param {boolean}  props.display    wheteher display or not the menu
 */

const NavigationItem = (props) => {
    
    let location = useLocation();

    return props.drawer  ? 
                    (
                        <li ref={props.reference} id={`menu-${props.id}`} data-toggle="collapse" className={`${props.MobileOnly ? 'MobileOnly' : ''} ${props.display ? 'UL-d-block' : 'UL-d-none'} ${props.margin ? props.margin : ''} ${ props.active || (location.pathname == '/dashboard' && props.isLanding) ? 'active': ""}`} onClick={ (e) => props.onClickEvent (e, !props.active, props.id) }>                                
                            <NavLink  to={props.link} className={`cl000 UL-wd-100p UL-d-block UL-pd7 UL-mg-b-10 ${ props.active || (location.pathname == '/dashboard' && props.isLanding) ? 'active': ""}`}>
                                <span><i className={`fas ${props.icon}  UL-cltextfff UL-pd-r-5`}></i></span>
                                <span className="lbText UL-tx-white UL-wd-100p UL-mg-l-5">{props.label}</span>
                                {
                                    props.sections ? <i className={`fas fa-angle-${props.active || (location.pathname == `/${LANDING_PAGE}` && props.isLanding) ? 'down':'right'} UL-pos-relative UL-r-10 UL-t-0 UL-mg-t-6 f-right`}></i>
                                                    : null
                                }
                            </NavLink>
                            <div className="UL-pd-l-40 UL-pd-t-15 UL-sidenavformate">
                                {props.children}
                            </div>
                        </li>
                    ) 
                    : 
                    (
                        <li id={`menu-${props.id}`} className={`${props.display ? 'UL-d-block' : 'UL-d-none'}`}>
                            <NavLink to={props.link} className={`${props.topMenu ? 'nav-link' : ''}`}>
                                {props.children}
                            </NavLink>
                        </li>
                    )
    
}    

export default NavigationItem;