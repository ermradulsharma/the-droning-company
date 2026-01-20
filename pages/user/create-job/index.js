import React, { useState, useEffect, useCallback } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useRouter } from "next/router";
import { SERVER_URL } from "../../../util/Constants";
//import Multiselect from "multiselect-react-dropdown";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import SearchLocationInput from "../../../components/SearchLocationInput/SearchLocationInput";
import useCommonFunctionContext from "../../../hooks/useCommonFunctionContext";
const CreateJob = () => {
    const [skillCategories, setSkillCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { accessToken, userId } = useAuthContext();
    const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
    const { setSearchLocation } = useCommonFunctionContext();
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [isAnywhereLocation, setAnywhereLocation] = useState(false);
    let history = useRouter();

    useEffect(() => {
        getSkillCategories();
    }, [getSkillCategories]);
    const validateFile = (file) => {
        console.log(file);
        const validTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'image/png',
            'image/jpeg',
            'application/pdf'
        ];
        return validTypes.includes(file.type) && file.size > 0;
    }

    const getSkillCategories = useCallback(async () => {
        try {
            await fetch(`${SERVER_URL}/skill-categories`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.statusCode === 200) {
                        setSkillCategories(response.data);
                    }
                });
        } catch (error) {
        }
    }, []);

    const onSelectCategory = (selectedList, selectedItem, setFieldValue) => {
        setSelectedCategories([...selectedCategories, selectedItem]);
        setFieldValue('jobCategory', JSON.stringify([...selectedCategories, selectedItem]));
    }

    const onRemoveCategory = (selectedList, selectedItem, setFieldValue) => {
        const newList = selectedCategories.filter(selectedCategory => selectedCategory.id !== selectedItem.id);
        setSelectedCategories(newList);
        if (newList.length === 0) {
            setFieldValue('jobCategory', '');
        }
    }

    const removeSelectedLocationHandler = (city, setFieldValue) => {
        const newLocationList = selectedLocation.filter(loc => loc.city !== city);
        setSelectedLocation(newLocationList);
        if (newLocationList.length === 0) {
            setFieldValue('jobLocation', '');
        }
    }

    const addLocation = (setFieldValue, extra = '') => {
        let obj = '';
        let location = '';
        if (extra) {
            location = {
                address: '',
                city: 'Anywhere',
                state: '',
                country: ''
            };
        } else {
            obj = document.getElementById('location-input').getAttribute('data-obj');
            location = JSON.parse(obj);
        }
        setSearchLocation(location);
        setSelectedLocation(selectedLocation.concat(location));
        setFieldValue('jobLocation', JSON.stringify(selectedLocation.concat(location)));
    }
    return (
        <div className="container-fluid">
            <div className="DashHeading">
                <h1 className="h1 mb-0 text-black"><i className="far fa-arrow-alt-circle-right"></i> Create a Job</h1>
                <p className="lead">Please complete the form to post your job.</p>
            </div>
            <div className="row">
                <div className="col-12 col-sm-9 col-md-7 col-lg-12 text-center mt-3 mb-2">
                    <div className="card px-0 pb-0 mb-3">
                        <Formik
                            initialValues={{
                                jobLocation: '',
                                jobTitle: '',
                                //jobCategory : '',
                                jobDescription: '',
                                //jobAttachement : '',
                                //jobBudget : '',
                                companyName: '',
                                contact: []
                            }}
                            validationSchema={Yup.object().shape({
                                jobLocation: Yup.string()
                                    .required('Job Location is required'),
                                jobTitle: Yup.string()
                                    .required('Job title is required'),
                                jobDescription: Yup.string()
                                    .required('Job description is required'),
                                /*jobBudget: Yup.string()
                                .required('Job budget is required'),
                                jobCategory: Yup.string()
                                .required('Job category is required'), */
                                //terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
                                contact: Yup.array().min(1, 'Please check at least one option given'),
                                /* contact :Yup.object({
                                    phoneNumber: Yup.boolean(),
                                    email: Yup.boolean()
                                })
                                .test(
                                'contact',
                                'You have choose any of the given option',
                                (obj) => {
                                    if ( obj.phoneNumber || obj.email ) {
                                      return true; // everything is fine
                                    }
                              
                                    return new Yup.ValidationError(
                                      'Please check at least one option given',
                                      null,
                                      'contact'
                                    );
                                  }
                                )
                                .required(
                                'You have to agree with our Terms and Conditions!'
                                ) */
                            })}
                            onSubmit={fields => {
                                showToast('Job is submitting for review...')
                                const formData = new FormData();
                                formData.append('userId', userId);
                                formData.append('companyName', fields.companyName);
                                //formData.append('contact', fields.contact);
                                formData.append('phoneNumber', fields.contact.includes('phone'));
                                formData.append('email', fields.contact.includes('email'));
                                //formData.append('jobAttachement', fields.jobAttachement);
                                formData.append('jobTitle', fields.jobTitle);
                                //formData.append('jobBudget', fields.jobBudget);
                                formData.append('jobDescription', fields.jobDescription);
                                //formData.append('jobCategory', JSON.stringify(selectedCategories));
                                formData.append('location', JSON.stringify(selectedLocation));

                                axios.post(`${SERVER_URL}/job/create`, formData, {
                                    headers: {
                                        "Content-Type": 'application/octet-stream',
                                        "Authorization": `Bearer ${accessToken}`,
                                        "Access-Control-Allow-Origin": "*"
                                    }
                                }).then(response => {
                                    console.log(response.data);
                                    hideToast();
                                    showToastSuccess('Your job is under review');
                                    history.push('/user/jobs');
                                }).catch(error => {
                                    console.log(error.response);
                                    showToastError(error.response.message)
                                    console.log(error.response)
                                })
                                console.log(fields);
                            }}
                            render={({ errors, values, touched, handleChange, isSubmitting, setFieldValue }) => (
                                <Form id="msform" name="create-job" className="msform DashForm">
                                    <div className="container-fluid">
                                        <div className="row justify-content-sm-center">
                                            <div className="col-xs-12 col-sm-10 text-left">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="companyName">Company Name</label>
                                                            <Field name="companyName" id="companyName" placeholder="Company Name" type="text" className='form-control' />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="job_location">Job Location <small>(You can add multiple job location)</small></label>
                                                        <div className="row">
                                                            <div className="custom-control custom-checkbox mb-1" style={{ display: 'inline-block' }}>
                                                                <Field type="checkbox" onChange={(e) => {
                                                                    setAnywhereLocation(e.target.checked);
                                                                    if (e.target.checked) {
                                                                        addLocation(setFieldValue, 'Anywhere')
                                                                    } else {
                                                                        removeSelectedLocationHandler('Anywhere', setFieldValue)
                                                                    }

                                                                }} className="custom-control-input" id="anywhere" name="anyWhere" checked={isAnywhereLocation} value={isAnywhereLocation} />
                                                                <label className="custom-control-label" style={{ display: 'inline-block', width: 'auto' }} htmlFor="anywhere">Anywhere</label>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-group searchWrap">
                                                                    <SearchLocationInput
                                                                        setInputLocation={values.jobLocation}
                                                                    //locationSelect = {locationSelectHandler}
                                                                    />
                                                                    <ErrorMessage name="jobLocation" component="div" className="error-color" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 text-right">
                                                                <button type="button" disabled={isAnywhereLocation} className="d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={() => addLocation(setFieldValue)}><i className="fas fa-plus fa-sm text-white-50"></i> Add Location</button>
                                                            </div>
                                                            <div className="col-12 JobLocationAdded">
                                                                {
                                                                    selectedLocation.map(location => {
                                                                        return <p key={location.city}><small>{/* <strong>{location.address}</strong> */}{`${location.city}${location.state ? ` ,` + location.state : ''}${location.country ? ` ,` + location.country : ''}`}</small> <span className="badge" style={{ cursor: 'pointer' }} onClick={() => removeSelectedLocationHandler(location.city, setFieldValue)}>Remove</span></p>
                                                                    })
                                                                }
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mt-4" id="">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="job_title">Job Title</label>
                                                                    <Field name="jobTitle" id="jobTitle" placeholder="Job Title" type="text" className={'form-control' + (errors.jobTitle && touched.jobTitle ? ' is-invalid' : '')} />
                                                                    <ErrorMessage name="jobTitle" component="div" className="error-color" />
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-12 mt-2">
                                                                        <div className="form-group">
                                                                            <label htmlFor="job_categories">Job Categories</label>
                                                                            <Multiselect 
                                                                                options={skillCategories}
                                                                                displayValue="skill_name"
                                                                                onSelect={(selectedList, selectedItem)=>onSelectCategory(selectedList, selectedItem, setFieldValue)}
                                                                                onRemove={(selectedList, selectedItem)=>onRemoveCategory(selectedList, selectedItem, setFieldValue)}
                                                                                placeholder="Select categories max upto 5"
                                                                                selectionLimit={5}
                                                                                style={{
                                                                                    chips: {
                                                                                      background: '#ffcc0e'
                                                                                    },
                                                                                    searchBox: {
                                                                                      border: 'none',
                                                                                    },
                                                                                    option: { // To change css for dropdown options
                                                                                        color: '#ffcc0e'
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <ErrorMessage name="jobCategory" component="div" className="error-color" />
                                                                        </div>
                                                                    </div> */}
                                                            <div className="col-12 mt-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="job_description">Job Description</label>
                                                                    <Field name="jobDescription" id="jobDescription" placeholder="Job Description" rows="8" as="textarea" className={'form-control' + (errors.jobDescription && touched.jobDescription ? ' is-invalid' : '')} />
                                                                    <ErrorMessage name="jobDescription" component="div" className="error-color" />
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-12 mt-2">
                                                                        <div className="form-group">
                                                                            <label htmlFor="job_attachment">Job Attachment</label>
                                                                            <div className="custom-file">
                                                                                <input
                                                                                    name="jobAttachement"
                                                                                    type="file"
                                                                                    className="custom-file-input" 
                                                                                    id="validatedCustomFile" 
                                                                                    onChange={(event) =>{
                                                                                        const selectedFile = event.currentTarget.files[0];
                                                                                        validateFile(selectedFile);
                                                                                        setFieldValue("jobAttachement", selectedFile);
                                                                                    }} />
                                                                                <label className="custom-file-label" htmlFor="validatedCustomFile">Attachment...</label>
                                                                                <small>Only allowed extension: jpg, jpeg, png, doc, docx, xlsx, pdf.</small>
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                            {/* <div className="col-12 mt-2">
                                                                        <label htmlFor="job_budget">Job Budget</label>
                                                                        <Field name="jobBudget" id="jobBudget" placeholder="Job Budget" type="number" className={'form-control' + (errors.jobBudget && touched.jobBudget ? ' is-invalid' : '')} />
                                                                        <ErrorMessage name="jobBudget" component="div" className="error-color" />
                                                                    </div> */}
                                                            <div className="col-12 mt-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="job_description">How would you like the candidate to contact you?</label>
                                                                    <div className="custom-control custom-checkbox mb-1" style={{ display: 'inline-block' }}>
                                                                        <Field type="checkbox" className="custom-control-input" id="phoneNumber" name="contact" value="phone" />
                                                                        <label className="custom-control-label" style={{ display: 'inline-block', width: 'auto' }} htmlFor="phoneNumber">Phone Number</label>
                                                                    </div>
                                                                    <div className="custom-control custom-checkbox mb-1 ml-1" style={{ display: 'inline-block' }}>
                                                                        <Field type="checkbox" className="custom-control-input" id="email" name="contact" value="email" />
                                                                        <label className="custom-control-label" style={{ display: 'inline-block', width: 'auto' }} htmlFor="email">Email</label>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="contact" component="div" className="error-color" />
                                                            </div>
                                                            <div className="col-12 mt-4">
                                                                <button type="submit" className="BtnSubmitJob btn btn-sm btn-primary shadow-sm">Submit for Review</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateJob;