import React, {useState, useEffect} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { SERVER_URL } from "../../util/Constants";
import parse from 'html-react-parser';

const PrivacyPolicy = () => {

    const [aboutTitle, setAboutTitle] = useState("");
	const [aboutDescription, setAboutDescription] = useState("");
	const [aboutExcerpt, setAboutExcerpt] = useState("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
		    window.scrollTo(0, 0);
        }
        getPrivacyPolicy();
	}, []);

    const getPrivacyPolicy = async() => {
		fetch(`${SERVER_URL}/cms/privacy-policy`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
				console.log(response);
                if (response.statusCode === 200) {
                    setAboutTitle(response.data[0].title)
                    setAboutDescription(response.data[0].page_text)
					setAboutExcerpt(response.data[0].excerpt)
                }
            });
	}
    return (
        <Aux>
            <div className="Banner d-none d-sm-block">    
                <div className="BannerInner BackgroundPrivacy">
                
                    <div className="container"> 
                    <div className="row"> 
                        <div className="offset-sm-2 col-sm-8"> 
                        <div className="BannerText">
                            <div className="BannerTitle">{aboutTitle}</div>
                            <p>{aboutExcerpt}</p>                
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="PrivacyPage paddngtb"> 
                <div className="container">
                    <div className="row"> 
                        <div className="col-sm-12"> 
                            <div className="justify-content-center">
                                <div className="MainHeading text-left">
                                {parse(`${aboutDescription}`)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
        
    )
}
export default PrivacyPolicy;