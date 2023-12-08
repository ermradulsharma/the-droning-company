import React, {useState} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { SERVER_URL } from "../../util/Constants";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Link from "next/link";
import { useRouter } from "next/router";
import useToastContext from "../../hooks/useToastContext";

const UpdatePassword = () => {
        const router = useRouter();
        const tokenId = router.query.tokenId;
        const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
        const [isPasswordResetSuccessfully, setStatusPasswordRest] = useState(false);
        return (
           
                <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
                onSubmit={async fields => {
                    let new_password = {
                        "new_password" : fields.password
                    }
                    await axios.post(`${SERVER_URL}/update-password/${tokenId}`, new_password, {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                    .then((response) => {
                        hideToast();
                        showToastSuccess(response.data.message);
                        setStatusPasswordRest(true)                    
                    })
                    .catch((error) => {
                        hideToast();
                        showToastError(error.response.data.message)
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
                                            {
                                                !isPasswordResetSuccessfully
                                                ?
                                                <Aux>
                                                    <div className="MainHeading text-left paddngt">
                                                        <h1>Enter your new Password</h1>
                                                    </div>
                                                    
                                                    <Form className="row paddngt">

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
                                                        <div className="col-sm-12 form-group text-center paddngt">
                                                            <button type="submit" className="btn btnRegister">Update Password</button>
                                                        </div>
                                                    </Form>
                                                </Aux>
                                                :
                                                <Aux>
                                                    <div className="MainHeading text-left paddngt">
                                                        <h1>You have successully updated your password</h1>
                                                    </div>
                                                    <div className="col-sm-12 form-group text-center paddngt">
                                                        <Link href="/login" className="btn btnRegister">LOG IN</Link>
                                                    </div>
                                                </Aux>
                                            }
                                            

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
export default UpdatePassword;