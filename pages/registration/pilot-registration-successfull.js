import React, {useEffect, Fragment} from "react";
import Link from "next/link";
import Script from "next/script";
const PilotRegistrationSuccess = () => {

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    },[])
    return (
        <Fragment>
            <Script 
                id="fbq-pilot"
                dangerouslySetInnerHTML={{
                    __html: `
                    fbq('track', 'Lead');
                    gtag('event', 'conversion', {{'send_to': 'AW-10844007686/ZnTpCJ_etJMDEIba6bIo'}});
                    `,
                }}
            />
            <div className="paddngtb"> 
                <div className="container">
                    <div className="row no-gutters row-item">
                        <div className="offset-sm-2 col-sm-8 col-item">
                            <div className="SignForm ThankYouPage">
                        <div className="form-card">
                        <h1 className="fs-title text-center" style={{marginBottom:'30px'}}>Thanks for the Payment! <br />{/* <small>Subscription Id: THD01234567890</small> */}</h1>
                        <h2>Your Subscription has been successfully created.</h2>
                        <center>
                                <Link className="btn btnRegister" href="/pilot-area/dashboard">Go To Dashboard</Link>
                            </center>
                            <br />
                        <div className="row justify-content-center">
                            <div className="col-3"> <i className="far fa-thumbs-up" ></i> </div>
                            </div> <br /><br />
                            <div className="row justify-content-center">
                            <div className="col-7 text-center">                            
                                <h5>Welcome to The Droning Company community. It&apos;s time to take flight!</h5>
                            </div>
                            </div>
                        
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PilotRegistrationSuccess;