import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import { useRouter } from "next/router";
import useUserContext from "../../hooks/useUserContext";
import { APPLICATION_NAME } from "../../util/Constants";
import SEO from "../../components/Seo/Seo";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
const Registration = () => {
	const { currentUrlFn } = useCommonFunctionContext();
	const currentUrl = currentUrlFn();
	const { setInitialData } = useUserContext();
	const [activeButton, setActiveButton] = useState('user');
	let history = useRouter();
	const handleChange = (e) => {
		setActiveButton(e.target.value);
	}

	return (
		<div className="SignupForm paddngtb">
			<SEO
				title={`${APPLICATION_NAME} | Registration`}
				description={''}
				siteTitle={''}
				keywords={''}
				href={currentUrl}
			/>
			<div className="container">
				<div className="row no-gutters row-item">

					<div className="offset-sm-2 col-sm-8 col-item">
						<div className="RegisterBg LogsBackground">
							<div className="SignForm SignEmail">
								<div className="alternet-access">
									<p>Already have an account? <Link href="/login">Log in now!</Link></p>
								</div>
								<div className="MainHeading text-left paddngt">
									<h1>Let&apos;s go!<br /> Join with our Platform</h1>
									<p>Enter your email id to start!</p>
								</div>
								<br />
								<Formik
									initialValues={{
										email: '',
										isAgreed: false,
										emailSubscribed: ''
									}}
									validationSchema={Yup.object().shape({
										email: Yup.string()
											.email('Email is invalid')
											.required('Email is required'),
										//isAgreed: Yup.bool.oneOf([true], 'Accept Terms & Conditions is required'),
										isAgreed: Yup.bool()
											.test(
												'isAgreed',
												'You have to agree with our Terms and Conditions!',
												value => value === true
											)
											.required(
												'You have to agree with our Terms and Conditions!'
											),
									})}
									onSubmit={fields => {
										fields.userType = activeButton;
										setInitialData(fields);
										if (activeButton === 'company') {
											history.push('/registration/company');
										} else if (activeButton === 'user') {
											history.push('/registration/user');
										} else if (activeButton === 'pilot') {
											history.push('/registration/pilot');
										} else {
											history.push('/registration/event_user');
										}
									}}
									render={({ errors, touched, isSubmitting }) => (
										<Form>
											<div className="form-group text-center">
												<label><b>I am Looking to</b></label>
												<div id="MyEmailRegistration">
													<div style={{ marginBottom: 10 }}><input label="Sign up as a pilot" className="uregistration" type="radio" name="user_type" onChange={handleChange} value="pilot" /></div>
													<div style={{ marginBottom: 10 }}><input label="Create a profile in the Company Directory" className="uregistration" type="radio" name="user_type" onChange={handleChange} value="company" /></div>
													<div style={{ marginBottom: 10 }}><input label="Post a Job/Find a Pilot" className="uregistration" type="radio" checked={activeButton === 'user' ? true : false} name="user_type" onChange={handleChange} value="user" /></div>
													<div style={{ marginBottom: 10 }}><input label="Post An Event" className="uregistration" type="radio" name="user_type" onChange={handleChange} value="event_user" /></div>
													<div id="Imlooking2" className="UserBox">
														<div className="custom-control custom-checkbox mb-1">
															<Field type="checkbox" className="custom-control-input" id="emailSubscribed" name="emailSubscribed" />
															<label className="custom-control-label" htmlFor="emailSubscribed">Yes! Send me genuinely useful emails every now and then to help me get the most out of Drone.</label>
														</div>
														<div className="custom-control custom-checkbox mb-1">
															<Field type="checkbox" className={'custom-control-input' + (errors.isAgreed && touched.isAgreed ? ' is-invalid' : '')} id="isAgreed" name="isAgreed" />
															<label className="custom-control-label" htmlFor="isAgreed">Yes, I understand and agree to the <Link href="/terms" target="_blank">Drone Terms of Service</Link>, including the
																&nbsp;<Link href="/terms" target="_blank">User Agreement</Link> and <Link href="/privacy-policy" target="_blank">Privacy Policy</Link></label>
															<ErrorMessage name="isAgreed" component="div" className="error-color" />
														</div>
													</div>
												</div>
											</div>
											<div className="form-group">
												<label>Email Address</label>
												<Field name="email" placeholder="Enter your email to register" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
												<ErrorMessage name="email" component="div" className="error-color" />
												<button className="btn btnRegister" type="submit" disabled={isSubmitting}>Let&apos;s Start <i className="fas fa-arrow-right"></i></button>
											</div>
										</Form>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Registration;

