import React from 'react';
import Link from 'next/link';
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { SERVER_URL } from '../../../util/Constants';
import useAuthContext from '../../../hooks/useAuthContext';
import useToastContext from '../../../hooks/useToastContext';

const ChangePassword = () => {
    const { accessToken, userId } = useAuthContext();
    const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4 DashHeading">
                    <h2 className="h2 mb-0 text-black"><i className="far fa-arrow-alt-circle-right"></i> Settings</h2>
                    <Link href="/user/create-job"><a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            className="fas fa-plus fa-sm text-white-50"></i> Create a Job</a></Link>
                   
            </div>
            <Formik 
                initialValues={{
                    old_password: '',
                    new_password: '',
                    confirm_new_password: '',
                }}
                validationSchema={Yup.object().shape({
                    old_password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    new_password: Yup.string()
                        .min(6, 'New Password must be at least 6 characters')
                        .required('New Password is required'),
                    confirm_new_password: Yup.string()
                        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
                onSubmit={async fields => {
                    delete fields.confirm_new_password;
                    fields.user_id = userId;
                    await axios.post(`${SERVER_URL}/change-password`, fields, {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                    .then((response) => {
                        hideToast();
                        showToastSuccess(response.data.message);    
                    })
                    .catch((error) => {
                        hideToast();
                        showToastError(error.response.data.message)
                    })
                }}
                >
                {({ errors, status, touched, isSubmitting }) => (                
                    <Form className="card ProfileForm">
                        <div className="col-sm-10 offset-sm-1">
                            <div className="row">
                                <div className="col-sm-12 form-group">
                                    <label>Old Password</label>
                                    <Field name="old_password" placeholder="Old password" type="password" className={'form-control' + (errors.old_password && touched.old_password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="old_password" component="div" className="error-color" />
                                </div>
                                <div className="col-sm-12 form-group">
                                    <label>New Password</label>
                                    <Field name="new_password" placeholder="New password" type="password" className={'form-control' + (errors.new_password && touched.new_password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="new_password" component="div" className="error-color" />
                                </div>
                                <div className="col-sm-12 form-group">
                                    <label>Confirm New Password</label>
                                    <Field name="confirm_new_password" placeholder="New password" type="password" className={'form-control' + (errors.confirm_new_password && touched.confirm_new_password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="confirm_new_password" component="div" className="error-color" />
                                </div>
                            </div>
                            <center className="paddngt">
                                <button className="action-button" type="submit" disabled={isSubmitting}>Save</button>
                            </center>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        
        
    )
}

export default ChangePassword;