import React, {useEffect} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
const  Icon3 = "/images/icon-3.png";
import SEO from "../../components/Seo/Seo";
import { APPLICATION_NAME } from "../../util/Constants";
const AdvertiseWith = (props) => {

    useEffect(() => {
      if (typeof window !== 'undefined') {
		    window.scrollTo(0, 0);
      }
	}, []);

  return (
    <Aux>
      <SEO 
        title={`${APPLICATION_NAME}`}
        description={''}
        siteTitle={'Advertise with Us'}
        keywords={''}
        href={props.currentUrl}
      />
      <div className="Banner d-none d-sm-block">    
        <div className="BannerInner BannerInn BannerInn-contactus">      
          <div className="container"> 
            <div className="row"> 
              <div className="offset-sm-2 col-sm-8"> 
                <div className="BannerText">
                  <div className="BannerTitle">Advertise With Us</div>
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
            <div className="col-lg-9 offset-lg-2">
            <div className="ContactForm">
                <div className="row">
                  <div className="col-sm-12 form-group">
                  <iframe src="https://ThankYou.formstack.com/forms/contact_support" title="Contact Form" width="100%" height="700" frameBorder="0"></iframe>
                  </div>
                  
                  </div>

                <div className="clearfix"></div>

                <div className="row paddngt">
                  <div className="col">
                    <div className="ContactBlock">
                      <div className="ContactInfo">
                        <div className="Icon">
                          <img
                            src={Icon3}
                            className="img-fluid"
                            alt="icon"
                          />
                        </div>
                        <h4>Mail Us</h4>
                        <ul>
                          <li><a href="mailto:info@thedroningcompany">info@thedroningcompany</a></li>
                          {/* <li>Support: wehear@thedroningcompany</li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};
export async function getServerSideProps(context) {
	const currentURL = context.req.headers.host+''+context.resolvedUrl;
	return {
	  props: {
		  currentUrl: currentURL
	  }
	}
}
export default AdvertiseWith;
