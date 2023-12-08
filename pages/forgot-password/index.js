import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { SERVER_URL } from "../../util/Constants";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import useToastContext from "../../hooks/useToastContext";

const ForgotPassword = () => {
        const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();

        return (
           
                <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required')
                })}
                onSubmit={async fields => {
                    showToast('Password resetting is in progress...');
                    await axios.post(`${SERVER_URL}/forgot-password`, fields, {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                    .then((response) => {
                        hideToast();
                        showToastSuccess(response.data.message);
                        //history.push(`/update-password/${response.token}`)
                    })
                    .catch((error) => {
                        hideToast();
                        showToastError(error.response.data.message);                       
                    })
                }}
                render={({ errors, status, touched }) => (
                    <Aux>
                        <div className="SignupForm paddngtb"> 
                            <div className="container">
                                
                                <div className="row no-gutters row-item">
                                    
                                    <div className="offset-sm-2 col-sm-8 col-item">
                                        <div className="FortGotPaswBG LogsBackground">
                                        <div className="SignForm"> 
                                            <div className="MainHeading text-left paddngt">
                                                <h1>Reset Password</h1>
                                                <p>Enter your recovery email</p>
                                            </div>
                                            
                                            <Form className="row paddngt">

                                                <div className="col-sm-12 form-group">
                                                    <label>Email Address</label>
                                                    <Field name="email" placeholder="Enter your Registered Email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="email" component="div" className="ulError-color" />
                                                </div>
                                                <div className="col-sm-12 form-group text-center">
                                                    <button type="submit" className="btn btnRegister">Reset Password</button>
                                                </div>
                                            </Form>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Aux>
                    
                )}
            />
               
        );
}
export default ForgotPassword;