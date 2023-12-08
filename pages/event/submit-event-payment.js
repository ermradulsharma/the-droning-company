import React, { useState, useRef, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCardFormEvent from "../../components/StripeCardForm/StripeCardFormEvent";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import { SERVER_URL, STRIPE_KEY } from "../../util/Constants";
import axios from "axios";

const stripePromise = loadStripe(STRIPE_KEY); //STRIPE_KEY

const EventPayment = () => {
	const [coupon, setCouponCode] = useState('');
	const [couponApplied, setCouponApplied] = useState(false);
	const [planId, setSubscriptionPlanId] = useState(null);
	const { tempUserSubscriptionData } = useUserContext();
	const [couponPlans, setCouponPlan] = useState([]);
	const { hideToast, showToastSuccess, showToastError } = useToastContext();
	const [planAmount, setPlanAmount] = useState(null);

	const monthlyPlanRef = useRef();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
		console.log(tempUserSubscriptionData);
		setCouponPlan(tempUserSubscriptionData.plans ? tempUserSubscriptionData.plans : []);
		setSubscriptionPlanId(tempUserSubscriptionData.plans ? tempUserSubscriptionData.plans : []);
		setPlanAmount(25);
	}, [])

	const onEnterCouponCode = (e) => {
		setCouponCode(e.target.value);
	}



	const couponCodeHandler = async () => {
		if (coupon.length < 1) {
			showToastError('Enter coupon code');
			return;
		}
		let fields = {
			coupon_code: coupon,
			coupon_plan_id: planId //'price_1N431cBbrKa9p7qI3RjBAyyv' //
		}
		// const SERVER_URL = "http://127.0.0.1:8000/api/v1";
		await axios.post(`${SERVER_URL}/coupon/verify`, fields, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		})
			.then((response) => {
				hideToast();
				if (response.data.statusCode === 200) {
					showToastSuccess('Coupon applied successfully');
					setCouponApplied(true);
					setPlanAmount(response.data.data.final_pay);
				}

			})
			.catch((error) => {
				console.log(error.response);
				hideToast();
				setCouponCode('');
				setCouponApplied(false);
				setPlanAmount(25);
				showToastError(error.response.data.message);
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
									<h1>Submit Event Fee to Publish Event</h1>
								</div>

								<form className="formFill PilotRegistrationForm">
									<div className="row">
										<div className="col-sm-12 form-group">
											<div className="accordion" id="accordionExample">
												<div className="card">
													<div className="card-header" id="headingOne">
														<h2 className="mb-0">
															<button type="button" className="btn btn-link" data-toggle="collapse" data-target="#collapseOne"><i className="fa fa-plus"></i> Have a Promo Code?</button>
														</h2>
													</div>
													<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
														<div className="card-body">
															<div className="form-group">
																<label className="text-black">Promo Code</label>
																<input className="form-control" type="text" onChange={(e) => onEnterCouponCode(e)} value={coupon} name="couponCode" placeholder="" />
															</div>
															<button type="button" className="btn btnRegister" onClick={() => couponCodeHandler()}>Apply Code</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="clearfix"></div>
									</div>

									<div className="row mt-4">
										<div className="col-sm-12 form-group">
											<div className="card">
												<div className="card-body">
													<div className="EnterBankDetails mb-0">
														<h4 className="mb-3">Total Amount: ${planAmount} <span style={{ fontSize: '12px', fontStyle: 'italic', color: '#1cc88a', fontWeight: 'bold' }}>{couponApplied ? '   (Coupon Applied)' : null}</span></h4>
														<h3 className="mb-3">Enter Card Details</h3>
														<hr></hr>
														<Elements stripe={stripePromise}>
															<StripeCardFormEvent
																userId={tempUserSubscriptionData.userId}
																eventId={tempUserSubscriptionData.eventId}
																eventTitle={tempUserSubscriptionData.eventTitle}
																planId={tempUserSubscriptionData.plans}
																couponCode={couponApplied ? coupon : ''}
																planAmount={planAmount}
																eventData={tempUserSubscriptionData}
															/>
														</Elements>
													</div>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventPayment;