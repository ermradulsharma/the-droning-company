import React, { useState, useRef, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCardForm from "../../components/StripeCardForm/StripeCardForm";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import { SERVER_URL, STRIPE_KEY} from "../../util/Constants";
import axios from "axios";

const stripePromise = loadStripe(STRIPE_KEY);

const Subscription = () => {
	const [coupon, setCouponCode] = useState('');
	const [couponApplied, setCouponApplied] = useState(false);
	const [planId, setSubscriptionPlanId] = useState(null);
	const [planType, setPlanType] = useState(null);
	const [planAmount, setPlanAmount] = useState(null);
	const { tempUserSubscriptionData } = useUserContext();
	const [couponPlans, setCouponPlan] = useState([]);
    const { hideToast, showToastSuccess, showToastError } = useToastContext();

	const monthlyPlanRef = useRef();

	useEffect(()=>{
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
		
		setCouponPlan(tempUserSubscriptionData.plans ? tempUserSubscriptionData.plans : []);
		setTimeout(() => {
			monthlyPlanRef.current.click()
		}, 500);		
	},[])
	const handSubscriptionPlan = (e, plan, amount) => {		
		setPlanType(plan);
		setPlanAmount(amount);
		setSubscriptionPlanId(e.target.value);
		setCouponApplied(false);
		setCouponCode('');
	}

	const onEnterCouponCode = (e) => {
        setCouponCode(e.target.value);
    }

	const couponCodeHandler = async () => {
		if (coupon.length < 1) {
			showToastError('Enter coupon code');
            return;
        }
		let fields ={
			coupon_code: coupon,
			coupon_plan_id: planId
		}
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
			showToastError(error.response.data.message);
		})
	}
	//console.log(tempUserSubscriptionData);

	function handleClickMonthly() {
		document.getElementById("plan_monthly").click();
	}
	function handleClickYearly() {
		document.getElementById("plan_annual").click();
	}
	
    return(

		<div className="SignupForm paddngtb"> 
        <div className="container">
	        <div className="row no-gutters row-item">
		        	
		        <div className="offset-sm-2 col-sm-8 col-item">
				<div className="RegisterBG2 LogsBackground">
    			        <div className="SignForm"> 
    			        	{/* <div className="alternet-access">
    		          			<p>Already have an account? <Link to="/login">Log in now!</Link></p>
    		        		</div> */}
                            <div className="MainHeading text-left form-group">
			        		    <h1>Complete Account Subscription</h1>								
			        	    </div>
							
									<form className="formFill PilotRegistrationForm  paddngtb40">
										
								<div className="MainHeading text-left form-group">
									<h1>Choose Subscription Plan</h1>
								</div>
								<div className="card paddng10">
									
									<div className="row">
										<div className="col-sm-6 form-group">
											<div className="card SubscribeBox mb-2 box-shadow text-center">
												<div className="card-header">
													<div className="custom-control custom-radio">
														<input ref={monthlyPlanRef} type="radio" value={couponPlans.length ? couponPlans[0].monthly.plan_id : ''} onChange={(e)=>handSubscriptionPlan(e, 'monthly', couponPlans.length ? couponPlans[0].monthly.plan_amount : 10)} checked={planType === 'monthly' ? true : false} className="custom-control-input" id="plan_monthly" name="subscriptionPlan" />
														<label className="custom-control-label" htmlFor="plan_monthly">Monthly Plan</label>
													</div>  				
												</div>
												<div className="card-body">
													<h1 className="card-title pricing-card-title">${couponPlans.length ? couponPlans[0].monthly.plan_amount : 10} <small className="text-muted">/ per month</small></h1>
													<h6>Billed Monthly<br></br><br></br></h6>

													<div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
														<label className={`btn btn-success ${planType === 'monthly' ? "active" : null}`} onClick={handleClickMonthly}>
															{
																planType === 'monthly' ? "Selected" : "Select"
															}
														</label>
													</div>
												</div>												
											</div>
										</div>
										<div className="col-sm-6 form-group">
											<div className="card SubscribeBox mb-2 box-shadow text-center">
												<div className="card-header">
													<div className="custom-control custom-radio">
														<input type="radio" value={couponPlans.length ? couponPlans[0].annual.plan_id : ''} onChange={(e)=>handSubscriptionPlan(e, 'annual', couponPlans.length ? couponPlans[0].annual.plan_amount : 99)} checked={planType === 'annual' ? true : false} className="custom-control-input" id="plan_annual" name="subscriptionPlan" />
														<label className="custom-control-label" htmlFor="plan_annual">Yearly Plan</label>
													</div>							
												</div>
												<div className="card-body">
													<h1 className="card-title pricing-card-title">${couponPlans.length ? couponPlans[0].annual.plan_amount : 99} <small className="text-muted">/ Yearly</small></h1>
													<h6>Billed Yearly<br></br>For extra saving</h6>
													<div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
														<label className={`btn btn-success ${planType === 'annual' ? "active" : null}`} onClick={handleClickYearly}>
															{
																planType === 'annual' ? "Selected" : "select"
															}
														</label>
													</div>
												</div>
											</div>
										</div>										
									</div>
									<div className="col-sm-12 form-group text-center">
										<h6><b>Drone Operations and Management Professional (DOMP) </b></h6>
									<ul className="list-unstyled  mb-4">
										<li>Drone Operations Management</li>
										<li>Fleet &#38; Pilots Team Management</li>
										<li>Project Overseeing &#38; Timely Execution</li>
									</ul>
									</div>
								</div>
										<div className="row">
											<div className="col-sm-12 form-group">
												<div className="accordion" id="accordionExample">
													<label>Promo Code</label>
													<div className="card">
														<div className="card-header" id="headingOne">
															<h2 className="mb-0">
																<button type="button" className="btn btn-link" data-toggle="collapse" data-target="#collapseOne"><i className="fa fa-plus"></i> Have a Promo Code?</button>									
															</h2>
														</div>
														<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
															<div className="card-body">
																<div className="form-group">
																	<label>Promo Code</label>
																	<input className="form-control" type="text" onChange={(e) => onEnterCouponCode(e)} value={coupon} name="couponCode" placeholder=""/>
																</div>
																<button type="button" className="btn btnRegister" onClick={()=>couponCodeHandler()}>Apply Code</button>
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
															<h3>Enter Card Details.</h3>
															<h5>Your Subscription will start now.</h5>
															<ul className="list-unstyled text-left mb-4">
																<li><i className="fas fa-arrow-right"></i> Total due now ${planAmount} <span style={{fontSize:'12px', fontStyle:'italic', color:'#1cc88a', fontWeight:'bold'}}>{couponApplied ? '   (Coupon Applied)' : null}</span></li>
																<li><i className="fas fa-arrow-right"></i> Subscribing to <b>{
																			planType === 'annual' ? " Yearly" : " Monthly"
																		}</b>
																</li>
															</ul>
															<div className="row">
																<Elements stripe={stripePromise}>
																	<StripeCardForm
																		userId = {tempUserSubscriptionData.userId}
																		accessToken = {tempUserSubscriptionData.stringEncodedAccess}
																		planId={planId}
																		couponCode={couponApplied ? coupon : ''}
																		userData={tempUserSubscriptionData}
																	/>
																</Elements>																
															</div>
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

export default Subscription;