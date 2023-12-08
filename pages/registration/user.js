import React, {useState, useEffect} from "react";
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import SEO from "../../components/Seo/Seo";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
const UserRegistration = () => {
	const {currentUrlFn} = useCommonFunctionContext();
    const currentUrl = currentUrlFn();
    const { userInitialData } = useUserContext();
    const [loading, setLoading] = useState(false);
    const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
	let history = useRouter();

	useEffect(() => {
		if (typeof window !== 'undefined') {
        	window.scrollTo({ behavior: 'smooth', top: '0px' });
		}
      }, [userInitialData]);

	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return (
        <div className="SignupForm paddngtb">
			<SEO 
                title={`${APPLICATION_NAME} | User Registration`}
                description={''}
                siteTitle={''}
                keywords={''}
                href={currentUrl}
            />
        <div className="container">
	        <div className="row no-gutters row-item">
		        	
		        <div className="offset-sm-2 col-sm-8 col-item">
				<div className="RegisterBG1 LogsBackground">
    			        <div className="SignForm"> 
    			        	<div className="alternet-access">
    		          			<p>Already have an account? <Link href="/login">Log in now!</Link></p>
    		        		</div>
                            <div className="MainHeading text-left form-group">
			        		    <h1>Complete your Account Setup</h1>
			        	    </div>
							<Formik 
								initialValues={{
									first_name: '',
									last_name: '',
									email: userInitialData.email ? userInitialData.email : '',
									mobile: '',
									password: '',
									confirmPassword: '',
									hear_about_us:'social-media',
									is_agreed : userInitialData.isAgreed ? true : false,
									is_email_subscribed : userInitialData.emailSubscribed ? true : false
								}}
								validationSchema={Yup.object().shape({
									first_name: Yup.string()
										.required('First name is required'),
									email: Yup.string()
										.email('Email is invalid')
										.required('Email is required'),
										mobile: Yup.string()
											.matches(phoneRegExp, 'Contact number is not valid')
											.required('Contact number is required'),
									password: Yup.string()
										.min(6, 'Password must be at least 6 characters')
										.required('Password is required'),
									confirmPassword: Yup.string()
										.oneOf([Yup.ref('password'), null], 'Passwords must match')
										.required('Confirm Password is required'),
									is_agreed  :Yup.bool()
									.test(
									  'is_agreed',
									  'You have to agree with our Terms and Conditions!',
									  value => value === true
									)
									.required(
									  'You have to agree with our Terms and Conditions!'
									),
								})}
								onSubmit={async fields => {
									setLoading(true);
									showToast('Registration is in process...');
									await axios.post(`${SERVER_URL}/register/user`, fields, {
										headers: {
											"Content-Type": "application/json",
											"Access-Control-Allow-Origin": "*"
										}
									})
									.then((response) => {
										hideToast();
										showToastSuccess('Thank you for your Registration!');
										history.push('/registration/user-registration-successfull');
									})
									.catch((error) => {
										console.log(error.response);
										hideToast();
										showToastError(error.response.data.message)
										setLoading(false);
									})
								}}
								render={({ errors, touched, isSubmitting }) => (
									<Form className="formFill UserRegisterationForm paddngtb40">
										<div className="row">
											<div className="col-sm-6 form-group">
												<label>First Name</label>
												<Field name="first_name" placeholder="First Name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
												<ErrorMessage name="first_name" component="div" className="error-color" />
											</div>
											<div className="col-sm-6 form-group">
												<label>Last Name</label>
												<Field name="last_name" placeholder="Last Name" type="text" className={'form-control'} />
											</div>
										</div>
										<div className="row">
											<div className="col-sm-6 form-group">
												<label>Email</label>
												<Field name="email" placeholder="Enter your email to register" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
												<ErrorMessage name="email" component="div" className="error-color" />
											</div>
											<div className="col-sm-6 form-group">
												<label>Contact Number</label>
												<Field name="mobile" placeholder="Enter your contact number" type="text" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
												<ErrorMessage name="mobile" component="div" className="error-color" />
											</div>
											<div className="col-sm-12 form-group">
												<label>Create a Password</label>
												<Field name="password" placeholder="Create a Password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
												<ErrorMessage name="password" component="div" className="error-color" />
											</div>
											<div className="col-sm-12 form-group">
												<label>Confirm Password</label>
												<Field name="confirmPassword" placeholder="Confirm Password" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
												<ErrorMessage name="confirmPassword" component="div" className="error-color" />
											</div>
											<div className="col-sm-12 form-group">
												<label>How did you hear about us? </label>
												<Field as="select" className="form-control" name="hear_about_us">
													<option value="social-media">Social Media</option>
													<option value="google-search">Google Search</option>
													<option value="friend-referral">Friend Referral</option>
													<option value="television-podcast">Television/Podcast</option>
													<option value="other">Other, (please explain)</option>
												</Field>
											</div>
											<div className="col-sm-12 form-group">
												<div className="custom-control custom-checkbox mb-1">
													<Field type="checkbox" className="custom-control-input" id="is_email_subscribed" name="is_email_subscribed" />
													<label className="custom-control-label" htmlFor="is_email_subscribed">Yes! Send me genuinely useful emails every now and then to help me get the most out of Drone.</label>
												</div>
												<div className="custom-control custom-checkbox mb-1">
													<Field type="checkbox" className={'custom-control-input' + (errors.is_agreed  && touched.is_agreed ? ' is-invalid' : '')} id="is_agreed" name="is_agreed" />
													<label className="custom-control-label" htmlFor="is_agreed">Yes, I understand and agree to the <a href="" target="_blank">Drone Terms of Service</a> ,including the
													<a href="#" target="_blank">User Agreement</a> and <Link href="/privacy-policy" >Privacy Policy</Link></label>
												</div>
											</div>
										</div>
										<center className="paddngt">
											<button className="btn btnRegister" type="submit" disabled={isSubmitting}>Create my account <i className="fas fa-arrow-right"></i></button>
										</center>
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

export default UserRegistration;

