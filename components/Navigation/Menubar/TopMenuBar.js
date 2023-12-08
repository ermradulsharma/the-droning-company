import React from "react";
import Link from 'next/link';
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import { SERVER_URL } from "../../../util/Constants";
import axios from "axios";
import { useRouter } from "next/router";
const TopMenuBar = () => {
    const router = useRouter();
    const { name, email, profileImage, emailVerified, userType, setVerifyEmail } = useAuthContext();
    const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
    const resendVerificationLink = () => {
		hideToast();
		showToast('Sending verification link...');
		if (!email) {
			showToastError('Email address should not be empty');
			return;
		}
		
		axios.post(`${SERVER_URL}/resend-verification/email`, {email: email}, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		})
		.then((response) => {
			hideToast();
			if (response.status === 200) {
				showToastSuccess('Verification link has been sent successfully');
			}
		})
		.catch((error)=>{
			console.log(error);
		})
	}

    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-search fa-fw"></i>
            </a>
            {/* <!-- Dropdown - Messages --> */}
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small"
                            placeholder="Search for..." aria-label="Search"
                            aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </li>
            {
                userType.id === 3
                ?
                    emailVerified
                    ?
                    null
                    :
                    <li>
                        <div style={{textAlign:'center', marginTop:'22px', fontFamily:'Avenir', color:'#fecd0e'}}>
                            <p type="button" onClick={()=>resendVerificationLink()}>(Email not verified) Resend Verification Link</p>
                        </div>
                    </li>
                :
                null
            }
            
            {/* <!-- Nav Item - Alerts --> */}
            {/* <li className="nav-item dropdown no-arrow mx-1">
                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                </a>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">
                        Alerts Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-primary">
                                <i className="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 12, 2019</div>
                            <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-success">
                                <i className="fas fa-donate text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 7, 2019</div>
                            $290.29 has been deposited into your account!
                        </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-warning">
                                <i className="fas fa-exclamation-triangle text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 2, 2019</div>
                            Spending Alert: We've noticed unusually high spending for your account.
                        </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                </div>
            </li> */}
            <div className="topbar-divider d-none d-sm-block"></div>
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ name }</span>
                    <img className="img-profile rounded-circle" alt={name}
                        src={profileImage ? profileImage : '/user-pilot/images/undraw_profile.svg'} />
                </a>
                {/* <!-- Dropdown - User Information --> */}
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown">
                    {/* <a className="dropdown-item" href="profile.html">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                    </a>
                    <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                    </a> */}
                    <Link href="/">
                        <a className="dropdown-item">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Web Front
                        </a>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </a>
                </div>
                {/* <!-- Logout Modal--> */}
                <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select &quot;Logout&quot; below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" onClick={()=> router.push('/logout')} type="button" data-dismiss="modal">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default TopMenuBar