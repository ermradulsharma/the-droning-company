import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import useAuthContext from "../../hooks/useAuthContext";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
import SEO from "../../components/Seo/Seo";
// import Facebook from "../../../assets/images/facebook.png";
// import Google from "../../../assets/images/google.png";
//import './Login.css';
const SignIn = () => {
	const { currentUrlFn } = useCommonFunctionContext();
	const currentUrl = currentUrlFn();
	const [isLoggedIn, setLoggedIn] = useState(false);
	const { authTokens, accessToken, setAuthTokens, userType } = useAuthContext();
	const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
	const { setTempUserSubscriptionData } = useUserContext();
	const [isVisibleResendLink, setVisibleResendLink] = useState(false);
	let rememberEmail = '';
	let rememberPassword = '';
	let history = useRouter();

	//const rememberMe = () => {
	if (typeof window !== 'undefined') {
		const rememberMe = localStorage.getItem("rememberMe");
		if (rememberMe) {
			let bufferObj = Buffer.from(rememberMe, "base64");

			//Encode the buffer as a utf8 string
			let decodedString = bufferObj.toString("utf8");
			let cred = decodedString.split(':');
			rememberEmail = cred[0];
			rememberPassword = cred[1];
		}
	}
	//}



	const [isChecked, setRememberMe] = useState(rememberEmail ? true : false);

	// if ((isLoggedIn || authTokens) && accessToken) {
	// 	console.log('user type'+userType);
	// 	if (userType.id === 3) {
	// 		//history.push('/pilot-area/dashboard')
	// 		//return <Redirect to="/pilot-area/dashboard" />;
	// 	} else {
	// 		//history.push('/user/dashboard')
	// 		//return <Redirect to="/user/dashboard" />;
	// 	}
	// 	return;
	// }

	const onChangeCheckbox = event => {
		setRememberMe(event.target.checked);
	}

	const resendVerificationLink = () => {
		hideToast();
		showToast('Sending verification link...');
		const email = document.getElementById('email').getAttribute('value');
		if (!email) {
			showToastError('Email address should not be empty');
			return;
		}

		axios.post(`${SERVER_URL}/resend-verification/email`, { email: email }, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		})
			.then((response) => {
				hideToast();
				if (response.status === 200) {
					showToastSuccess('Verification link has been sent successfully')
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}

	return (
		<div className="SignupForm paddngtb">
			<SEO
				title={`${APPLICATION_NAME} | Login`}
				description={''}
				siteTitle={''}
				keywords={''}
				href={currentUrl}
			/>
			<div className="container">

				<div className="row no-gutters row-item">
					<div className="offset-sm-2 col-sm-8 col-item">
						<div className="LoginBG LogsBackground">
							<div className="SignForm">
								<div className="alternet-access">
									<p>Don&apos;t have an account? <Link href="/registration">Sign Up now!</Link></p>
								</div>
								{
									isVisibleResendLink
										?
										<div style={{ textAlign: 'center', marginTop: '10px', fontFamily: 'Avenir', color: '#fecd0e' }}>
											<p type="button" onClick={() => resendVerificationLink()}>Resend Verification Link</p>
										</div>
										:
										null
								}

								<div className="MainHeading text-left paddngt">
									<h1>Login your account</h1>
								</div>
								<Formik
									initialValues={{
										email: rememberEmail ? rememberEmail : '',
										password: rememberPassword ? rememberPassword : ''
									}}
									validationSchema={Yup.object().shape({
										email: Yup.string()
											.email('Email is invalid')
											.required('Email is required'),
										password: Yup.string()
											.min(6, 'Password must be at least 6 characters')
											.required('Password is required'),
									})}
									onSubmit={fields => {

										showToast('Logging into...');
										const encodedString = Buffer.from(`${fields.email}:${fields.password}`).toString('base64');
										axios.post(`${SERVER_URL}/login`, fields, {
											headers: {
												"Content-Type": "application/json",
												"Access-Control-Allow-Origin": "*"
											}
										})
											.then((response) => {
												hideToast();
												if (response.status === 200) {

													if (response.data.data.roles[0].id == 3) {// id 3 is for pilot

														if (response.data.subscription_on_grace_period && response.data.data.subscriptions) {
															// resume only
															let tempData = {
																userId: response.data.data.id,
																plans: response.data.data.plans,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																rememberMe: isChecked,
															}
															setTempUserSubscriptionData(tempData);
															history.push('/pilot-subscription/resume');
														} else if (!response.data.subscription_on_grace_period && !response.data.data.subscriptions) {
															let tempData = {
																userId: response.data.data.id,
																plans: response.data.data.plans,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																rememberMe: isChecked,
															}
															setTempUserSubscriptionData(tempData);
															showToast('You do not have an active subscription, Please buy a subscription plan to view your dashboard.')
															history.push('/pilot-subscription');
														} else if (!response.data.subscription_on_grace_period && response.data.data.subscriptions) {
															setAuthTokens({
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																rememberMe: isChecked,
																userId: response.data.data.id,
																emailVerified: response.data.data.email_verified_at
															})
															showToastSuccess('Logged In Successfull');
															history.push('/pilot-area/dashboard');
														} else {
															console.log('else subs')
															/* let tempData = {
																userId: response.data.data.id,
																plans: response.data.data.plans,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																rememberMe: isChecked,
															}
															setTempUserSubscriptionData(tempData);
															showToast('You do not have an active subscription, Please buy a subscription plan to view your dashboard.')
															history.push('/pilot-subscription'); */
														}
													} else if (response.data.data.roles[0].id == 2) {
														if (response.data.data.email_verified_at) {
															setAuthTokens({
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																rememberMe: isChecked,
																userId: response.data.data.id
															})
															showToastSuccess('Logged In Successfull');
															history.push('/user/dashboard');
														} else {
															setVisibleResendLink(true);
															showToastError('Please verify your email address to logged in to your account')
														}

													} else if (response.data.data.roles[0].id == 5) {
														if (response.data.data.email_verified_at) {
															setAuthTokens({
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																rememberMe: isChecked,
																userId: response.data.data.id
															})
															showToastSuccess('Logged In Successfull');
															history.push('/event/submit-event');
														} else {
															setVisibleResendLink(true);
															showToastError('Please verify your email address to logged in to your account')
														}

													} else if (response.data.data.roles[0].id == 4) {// id 4 is for company

														if (response.data.subscription_on_grace_period && response.data.data.subscriptions) {
															// resume only
															let tempData = {
																userId: response.data.data.id,
																plans: response.data.data.plans,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																rememberMe: isChecked,
															}
															setTempUserSubscriptionData(tempData);
															history.push('/company-subscription/resume');
														} else if (!response.data.subscription_on_grace_period && !response.data.data.subscriptions) {
															let tempData = {
																userId: response.data.data.id,
																plans: response.data.data.plans,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																rememberMe: isChecked,
															}
															setTempUserSubscriptionData(tempData);
															showToast('You do not have an active subscription, Please buy a subscription plan to view your dashboard.')
															history.push('/company-subscription');
														} else if (!response.data.subscription_on_grace_period && response.data.data.subscriptions) {
															setAuthTokens({
																encodedString: encodedString,
																stringEncodedAccess: response.data.access_token,
																name: `${response.data.data.first_name} ${response.data.data.last_name}`,
																email: response.data.data.email,
																userType: response.data.data.roles[0],
																rememberMe: isChecked,
																userId: response.data.data.id,
																emailVerified: response.data.data.email_verified_at
															})
															showToastSuccess('Logged In Successfull');
															history.push('/company-area/dashboard');
														} else {
															console.log('else subs')
														}
													}
												}
											})
											.catch((error) => {
												console.log(error.response);
												hideToast();
												showToastError(error.response.data.message)
											})
									}}
									render={({ errors, status, touched }) => (
										<Form className="row">

											<div className="col-sm-12 form-group">
												<label>Email Address</label>
												<Field name="email" type="text" id="email" placeholder="Enter your registered email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
												<ErrorMessage name="email" component="div" className="error-color" />
											</div>
											<div className="col-sm-12 form-group">
												<label>Password</label>
												<Field name="password" placeholder="Enter your password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
												<ErrorMessage name="password" component="div" className="error-color" />
											</div>
											<div className="col-sm-12 form-group">
												<div className="float-left">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="remember_me" name="remember_me" onChange={(event) => onChangeCheckbox(event)} />
														<label className="custom-control-label" htmlFor="remember_me">Remember me</label>
													</div>
												</div>
												<div className="ForgotPasw float-right">
													<Link href="/forgot-password">Forgot password?</Link>
												</div>
											</div>

											<div className="col-sm-12 form-group text-center paddngt">
												<button className="btn btnRegister" type="submit">Log in</button>
												<div className="clearfix"></div>
												{/* <a className="mt-3 NotYou" href="#">Not you?</a> */}
											</div>
										</Form>
									)}
								/>


								{/* <p className="btn-separator mt-4"><span >or</span></p>
    
    			            <div className="DroneThirdPartyLogin paddngtb40 row">
    			            	<div className="col-sm-6">
    		                  		<a href="#"><img src={Google} alt="" /> Sign up with Google</a>
    		                  	</div>
    		                  	<div className="col-sm-6">
    		                  		<a href="#"><img src={Facebook} alt="" /> Sign up with Facebook</a>
    		                  	</div>
    		                </div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;