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

const StripeCardFormEvent = (props) => {
  //console.log(props);
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
      history.push('/login');
      return;
    }
    if (!props.planId) {
      showToastError('Please select event');
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
      fields.event_id = props.eventId;
      fields.title = props.eventTitle;
      fields.plan_price = props.planAmount;

      // const SERVER_URL = "http://127.0.0.1:8000/api/v1";

      await axios.post(`${SERVER_URL}/event-payment`, fields, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then((response) => {
          hideToast();
          showToastSuccess(response.message);
          history.push('/event/successfull');
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
    <form style={{ width: '100%' }}>
      <div className="row submitEvent">
        <div className="col-md-6 form-group">
          <label for="Cardnumber">Card number</label>
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
        </div>
        <div className="col-md-3 form-group">
          <label for="Expirationdate">Expiration date</label>
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
        </div>
        <div className="col-md-3 form-group">
          <label for="CVC">CVC</label>
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
        </div>
      </div>


      <center className="">
        <button className="btn btnRegister btn-block text-center" type="button" onClick={(e) => handleSubmit(e)} style={{ display: `${isSubscriptionSuccessful ? "none" : "block"}` }} disabled={!stripe && !isSubscriptionSuccessful}>
          Pay
        </button>
      </center>

    </form>
  );
};

export default StripeCardFormEvent;
