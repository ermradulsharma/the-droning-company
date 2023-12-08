import React, {useEffect} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const FindingDronePlot = () => {
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);

  return (
    <Aux>
      <div className="Banner d-none d-sm-block">    
        <div className="BannerInner BannerInn BannerInn-contactus">      
          <div className="container"> 
            <div className="row"> 
              <div className="offset-sm-2 col-sm-8"> 
                <div className="BannerText">
                  <div className="BannerTitle">We&apos;re here to help you</div>
                  <p>We always want to hear from you! Let us know how we can best help
  you and we&apos;ll do our very best.</p>                
                </div>
                </div>
            </div>
          </div>
      </div>
    </div>
      <div className="ContactUs paddngtb">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 offset-lg-1">
              <div className="ContactForm">
                <div className="row">
                  <div className="col-sm-12 form-group">
                  <iframe src="https://thankyou.formstack.com/forms/finding_a_drone_pilot" title="Contact Form" width="100%" height="700"></iframe>
                  </div>
                  
                </div>

                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default FindingDronePlot;
