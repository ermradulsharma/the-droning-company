import React, {useEffect, Fragment} from "react";
import Script from "next/script";
const UserRegistrationSuccess = () => {
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    },[]);
    
    return (
        <Fragment>
            <Script 
                id="fbq-pilot"
                dangerouslySetInnerHTML={{
                    __html: `
                    fbq('track', 'Lead');
                    gtag('event', 'conversion', {'send_to': 'AW-10844007686/rTf3CK_JoZMDEIba6bIo'});
                    `,
                }}
            />
            <div className="paddngtb"> 
                <div className="container">
                    <div className="row no-gutters row-item">
                        <div className="offset-sm-2 col-sm-8 col-item">
                            <div className="ThankYouPageBg LogsBackground">
                                <div className="SignForm ThankYouPage">
                                    <div className="form-card">
                                        <h1 className="fs-title text-center">Thanks for your Registration!</h1>
                                        <div className="row justify-content-center">
                                            <div className="col-sm-3"> <i className="fas fa-user-check"></i> </div>
                                        </div> <br /><br />
                                        <div className="row justify-content-center">
                                            <div className="col-7 text-center paddngt">
                                            <p>Welcome to The Droning Company community. It&apos;s time to take flight!</p>
                                            <h2 className="fs-title text-center">Please check your email to verify your account.</h2>
                                            </div>
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

export default UserRegistrationSuccess;