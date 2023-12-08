import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { SERVER_URL } from "../../util/Constants";
import useAuthContext from "../../hooks/useAuthContext";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";

const ResumeSubscription = () => {
    const { setAuthTokens } = useAuthContext();
    const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
	const { tempUserSubscriptionData } = useUserContext();

    let history = useRouter();

    const handleResumeSubscription = async () => {
        if (!tempUserSubscriptionData.userId) {
            history.push('/login');
            return;
        }
        showToast('Resuming subscription is in progress...');
        await axios.post(`${SERVER_URL}/subscription/resume/${tempUserSubscriptionData.userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((response)=>{      
            console.log(response.data);      
            hideToast();
            if (response.status === 200) {
                showToastSuccess('Your subscription has been resumed successfully');
                setAuthTokens(tempUserSubscriptionData);
                history.push('/pilot-area/dashboard');        
            }
        })
        .catch((error)=>{
            hideToast();
            showToastError(error.response.data.message)     
            console.log(error.response);
        })
    }

    return (
        <div className="SignupForm paddngtb">
            <div className="container">
            <div className="row no-gutters row-item">
		        <div className="offset-sm-2 col-sm-8 col-item">
                    <div className="RegisterBG2 LogsBackground">
                        <div className="SignForm"> 
                            <div className="MainHeading text-left form-group">
			        		    <h1>Resume Account Subscription</h1>								
			        	    </div>
                            <center>
                                <button className="btn btnRegister" onClick={()=>handleResumeSubscription()}>Resume Subscription</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ResumeSubscription;