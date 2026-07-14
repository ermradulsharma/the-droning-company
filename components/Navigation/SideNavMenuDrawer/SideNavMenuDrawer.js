import React from 'react';
//import { NavLink, Link} from 'react-router-dom';
import Link from 'next/link';
import Image from 'next/image';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import useUserContext from "../../../hooks/useUserContext";
import useAuthContext from "../../../hooks/useAuthContext";

const SideNavMenuDrawer = (props) => {
    const { drawerCollapsed, setDrawerCollapsed } = useUserContext();
    const { userType } = useAuthContext();
    const drawerCollapsedHandler = (isCollapsed) => {
        if (isCollapsed) {
            document.body.className = "sidebar-toggled";
        } else {
            document.body.className = "";
        }
        setDrawerCollapsed(isCollapsed);
    }

    return (
        <Aux>
            <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${drawerCollapsed ? 'toggled' : null}`} id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <Link href="/" className="sidebar-brand d-flex align-items-center justify-content-center">

                    <Image className="img-fluid" src="/images/logo.png" alt="logo" width={60} height={60} />

                </Link>
                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!--Nav Item - Dashboard --> */}
                <li className="nav-item">
                    <Link href={`${userType.id === 3 ? "/pilot-area/dashboard" : "/user/dashboard"}`} className="nav-link">

                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>

                    </Link>
                </li>

                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">
                </div>

                {
                    userType.id !== 3
                        ?
                        <Aux>
                            {/* <!-- Nav Item - Pages Collapse Menu --> */}
                            <li className="nav-item">
                                <Link href="/user/jobs" className="nav-link">

                                    <i className="fas fa-list-alt"></i>
                                    <span>My Jobs</span>

                                </Link>
                            </li>

                            {/* <!-- Nav Item - Pages Collapse Menu --> */}
                            <li className="nav-item">
                                <Link href="/user/create-job" className="nav-link collapsed">

                                    <i className="fas fa-file-signature"></i>
                                    <span>Create Job</span>

                                </Link>
                            </li>

                            {/* <!-- Nav Item - Charts --> */}
                            {/* <li className="nav-item">
                            <a className="nav-link" href="">
                                <i className="fas fa-user-times"></i>
                                <span>Pilots Hired</span></a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" href="/user/job-progress">
                                <i className="fas fa-tasks"></i>
                                <span>Job Progress Tracking</span></NavLink>
                        </li> */}
                        </Aux>
                        :
                        <Aux>
                            <li className="nav-item">
                                <Link href="/pilot-area/build-profile" className="nav-link">

                                    <i className="fas fa-money-check-alt"></i>
                                    <span>Build Profile</span>

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pilot-area/subscriptions" className="nav-link">

                                    <i className="fas fa-money-check-alt"></i>
                                    <span>My Subscriptions</span>

                                </Link>
                            </li>
                            { /* add below more menus for pilot */}

                            <li className="nav-item">
                                <Link href="/pilot-area/service-location" className="nav-link">

                                    <i className="fas fa-location-arrow"></i>
                                    <span>Service Locations</span>

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pilot-area/gallery" className="nav-link">

                                    <i className="fas fa-images"></i>
                                    <span>Photo Gallery</span>

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pilot-area/videos" className="nav-link">

                                    <i className="fas fa-video"></i>
                                    <span>Video Gallery</span>

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pilot-area/equipments" className="nav-link">

                                    <i className="fas fa-toolbox"></i>
                                    <span>My Equipment</span>

                                </Link>
                            </li>
                        </Aux>
                }


                {/* <!-- Nav Item - Tables --> */}
                {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-cogs"></i>
                        <span>Settings</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link href={`${userType.id === 3 ? "/pilot-area/edit-profile" : "/user/edit-profile"}`} className="collapse-item">Edit Profile</Link>
                            <Link href={`${userType.id === 3 ? "/pilot-area/change-password" : "/user/change-password"}`} className="collapse-item">Change Password</Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <button className="nav-link" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => drawerCollapsedHandler(!drawerCollapsed)}></button>
                </div>

            </ul>
        </Aux>
    );
}

export default SideNavMenuDrawer;