import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import useResponsiveFontSize from "../ResponsiveFontSize/useResponsiveFontSize";
import useToastContext from "../../hooks/useToastContext";
import useAuthContext from "../../hooks/useAuthContext";
import axios from "axios";
import { SERVER_URL } from "../../util/Constants";
import { useRouter } from "next/router";
const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const StripeCardForm = (props) => {

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
	  let history = useRouter();
    const { setAuthTokens } = useAuthContext();
    const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
    const [isSubscriptionSuccessful, setSubscriptionSuccessfull] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!props.userId) {
            history.push('/registration');
            return;
        }

        if (!props.planId) {
            showToastError('Please select the subscription plan');
            return;
        }

        if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
        }
        showToast('Subscription is in progress...');
        setSubscriptionSuccessfull(true);
        const payload = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement)
        });

        if (payload.error) {
            hideToast();
            setSubscriptionSuccessfull(false);
            showToastError(payload.error.message);
        } else {            
            let fields = {};
            fields.user_id = props.userId;
            fields.stripe_pm_id = payload.paymentMethod.id;
            fields.plan_id = props.planId;
            fields.coupon_code = props.couponCode;
            await axios.post(`${SERVER_URL}/subscription/create`, fields, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                hideToast();
                showToastSuccess(response.message);
                setAuthTokens(props.userData);
                if (response.data.data.user.roles[0].id == 3) {
                  history.push('registration/pilot-registration-successfull');
                }else if (response.data.data.user.roles[0].id == 4) {
                  history.push('registration/company-registration-successfull');
                }
            })
            .catch((error) => {
                setSubscriptionSuccessfull(false)
               
                hideToast();
                showToastError(error.response.data.message)
                //setLoading(false);
            })
        }
        //console.log("[PaymentMethod]", payload);
    };

  return (
    <form style={{width:'100%'}}>
      {/* <label>
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label> */}
      <label>
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            //console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            //console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            //console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            //console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            //console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            //console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            //console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            //console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            //console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            //console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            //console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            //console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <center className="paddngt">
        <button className="btn btnRegister" type="button" onClick={(e)=> handleSubmit(e)} style={{display:`${isSubscriptionSuccessful ? "none" : "block"}`}} disabled={!stripe && !isSubscriptionSuccessful}>
            Pay
        </button>
      </center>
      
    </form>
  );
};

export default StripeCardForm;
