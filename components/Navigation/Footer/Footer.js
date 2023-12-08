import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Link from 'next/link';
import Script from "next/script";
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <Aux>
            <div className="NewsLetter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Get Our Newsletter!</h1>
                            <p>Don&apos;t miss out on essential news, industry updates, hot videos and photos, gear reviews, and more!</p>
                        </div>
                        <div className="col-lg-4">
                            <iframe src="https://gem.godaddy.com/signups/d12a43bb226645dc8d2b0f328832d678/iframe" scrolling="no" frameBorder="0" height="186" style={{ maxWidth: '400px', width: '100%' }}></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="Footer paddngtb">
                <div className="container">
                    <div className="FooterInn text-center">
                        <div><img className="img-fluid FootLogo" src="/images/logo.webp" alt="logo" /></div>
                        {/* <address>1111 Santa Monica Blvd. Los Angeles CA 90025</address>
                        <a href="tel:0123456789">012.345.6789</a><br>
                        <a href="mailto:info@thedroningcompany">info@thedroningcompany</a>
                        <ul className="SocialLinksFoot">
                            <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>    
                            <li><a href="#" target="_blank"><i className="fab fa-yelp"></i></a></li>    
                        </ul> */}
                        <div>
                            <ul className="SocialLinks">
                                <li><a href="https://www.facebook.com/TheDroningCompany" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="https://www.instagram.com/thedroningcompany/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="https://twitter.com/droningcompany" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="https://www.linkedin.com/company/71993438/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                <li><a href="https://www.youtube.com/@thedroningcompany" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                                <li><a href="https://www.tiktok.com/@thedroningcompany" target="_blank" rel="noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16"> <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" /> </svg></a></li>
                            </ul>
                        </div>

                        <center className="mt-3">
                            <Link className="btn BtnAdvertise" href="/advertise-with-us">Advertise with us</Link>
                        </center>
                    </div>
                    <div className="CopyRight">
                        <div className="BottomLinks float-left">
                            <Link href="/terms">Terms &amp; Conditions</Link>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <Link href="/looking-pilots">Looking For Pilot</Link>
                            <Link href="/job-list">Find A Job</Link>
                            <Link href="/pilots-welcome">Welcome Pilots</Link>
                            <Link href="/sitemap">Sitemap</Link>
                        </div>
                        <div className="float-right">
                            <p>&copy; {currentYear} Copyright by The Droning Company. All rights reserved. </p>
                        </div>
                    </div>
                </div>
            </footer>
        </Aux>
    );
}

export default Footer;