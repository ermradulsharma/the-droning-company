import React, {useState, useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useRouter } from "next/router";
import { SERVER_URL } from "../../../util/Constants";
import Multiselect from "multiselect-react-dropdown";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import SearchLocationInput from "../../../components/SearchLocationInput/SearchLocationInput";
import useCommonFunctionContext from "../../../hooks/useCommonFunctionContext";
import Loader from "react-loader-spinner";

const EditJob = () => {
    let history = useRouter();
    const jobId  = history.query.jobId;
    const [skillCategories, setSkillCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { accessToken, userId } = useAuthContext();
    const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
    const { setSearchLocation } = useCommonFunctionContext();
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobDetailData, setJobDetailData] = useState({
        id: "",
        job_title: "",
        job_description: "",
        company_name: "",
        contact: [],
        location: []
    });
    const [contactVia, setContactVia] = useState([]);
    

    useEffect(() => {
        getSkillCategories();
        getJobDetail();
      }, [jobId]);

      const getJobDetail = async () => {
        try {
          await fetch(`${SERVER_URL}/job/show/${jobId}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
          })
            .then((res) => res.json())
            .then((response) => {
              console.log(response);
              setLoading(false);
              if (response.statusCode === 200) {
                  let contactArray = [];
                  if (response.data.contact_via_email) {
                      contactArray.push('email');
                  }
                  if (response.data.contact_via_phone_number) {
                    contactArray.push('phone');
                }
                setContactVia(contactArray);
                let locationArray = [];
                console.log(response.data.location)
                
                for (let i=0; i< response.data.location.length; i++) {
                    //locationArray.push(response.data.location[i].city+' ,'+response.data.location[i].state+' ,'+response.data.location[i].country)
                    // let str = `${response.data.location[i].city}, ${response.data.location[i].state}, ${response.data.location[i].country}`;
                    // locationArray.push(str);
                }
                //console.log(locationArray)
                setSelectedLocation([...response.data.location]);
                setJobDetailData(response.data);
              }
            });
        } catch (error) {
          setLoading(false);
        }
    }

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

    const getSkillCategories = async () => {
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
    }

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

    const addLocation = (setFieldValue) => {
        let obj = document.getElementById('location-input').getAttribute('data-obj');
        const location  = JSON.parse(obj);
        setSearchLocation(location);
        setSelectedLocation(selectedLocation.concat(location));
        setFieldValue('jobLocation', JSON.stringify(selectedLocation.concat(location)));
    }

    console.log(jobDetailData)
    return (
        loading
                ?
                <div className="col-md-12" style={{ textAlign: 'center' }}>
                    <Loader
                        type="ThreeDots"
                        color="#ffcc0e"
                        height={100}
                        width={100}
                        visible={loading}
                    />
                </div>
                :
        <div className="container-fluid">
                    <div className="DashHeading">
                        <h1 className="h1 mb-0 text-black"><i className="far fa-arrow-alt-circle-right"></i> Edit a Job</h1>
                        <p className="lead">Please complete the form to save your job.</p>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-9 col-md-7 col-lg-12 text-center mt-3 mb-2">
                            <div className="card px-0 pb-0 mb-3">
                                <Formik 
                                    enableReinitialize={true}
                                    initialValues={{
                                        jobLocation : jobDetailData.location.length === 0? '': JSON.stringify(selectedLocation),
                                        jobTitle : jobDetailData.job_title,
                                        //jobCategory : '',
                                        jobDescription : jobDetailData.job_description,
                                        //jobAttachement : '',
                                        //jobBudget : '',
                                        companyName: jobDetailData.company_name,
                                        contact: contactVia.length ? contactVia : []
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
                                        contact:  Yup.array().min(1, 'Please check at least one option given'),
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
                                        showToast('Uob updating is in progress...')
                                        const formData = new FormData();
                                        formData.append('userId', userId);
                                        formData.append('companyName', fields.companyName);
                                        //formData.append('contact', fields.contact);
                                        formData.append('phoneNumber', fields.contact.includes('phone'));
                                        formData.append('email', fields.contact.includes('email'));
                                        //formData.append('jobAttachement', fields.jobAttachement);
                                        formData.append('isNewJobAttachement', false);
                                        formData.append('jobTitle', fields.jobTitle);
                                        //formData.append('jobBudget', fields.jobBudget);
                                        formData.append('jobDescription', fields.jobDescription);
                                        //formData.append('jobCategory', JSON.stringify(selectedCategories));
                                        formData.append('location', JSON.stringify(selectedLocation));
                                       
                                        axios.post(`${SERVER_URL}/job/update/${jobDetailData.id}`, formData, {
                                            headers:{
                                                "Content-Type": 'application/octet-stream',
                                                "Authorization": `Bearer ${accessToken}`,
                                                "Access-Control-Allow-Origin": "*"
                                            }
                                        }).then(response => {
                                            console.log(response.data);
                                            hideToast();
                                            showToastSuccess('Your job has been updated successfully');
                                            history.push(`/user/job-detail/${jobDetailData.id}`);
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
                                                                    <div className="col-12">
                                                                        <div className="form-group searchWrap">
                                                                            <SearchLocationInput 
                                                                                setInputLocation = {values.jobLocation}
                                                                                //locationSelect = {locationSelectHandler}
                                                                            />
                                                                            <ErrorMessage name="jobLocation" component="div" className="error-color" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 text-right">
                                                                        <button type="button" className="d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={() => addLocation(setFieldValue)}><i className="fas fa-plus fa-sm text-white-50"></i> Add Location</button>
                                                                    </div>
                                                                    <div className="col-12 JobLocationAdded">
                                                                        {
                                                                            selectedLocation.map(location => {
                                                                                return <p key={location.city}><small>{/* <strong>{location.address}</strong> */}{`${location.city}, ${location.state}, ${location.country}`}</small> <span className="badge" style={{cursor:'pointer'}} onClick={()=>removeSelectedLocationHandler(location.city, setFieldValue)}>Remove</span></p>
                                                                            })
                                                                        }
                                                                        <hr/>
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
                                                                            <div className="custom-control custom-checkbox mb-1" style={{display:'inline-block'}}>
                                                                                <Field type="checkbox" checked={values.contact.includes('phone')} className="custom-control-input" id="phoneNumber" name="contact" value="phone"/>	
                                                                                <label className="custom-control-label" style={{display:'inline-block', width:'auto'}} htmlFor="phoneNumber">Phone Number</label>
                                                                            </div>
                                                                            <div className="custom-control custom-checkbox mb-1 ml-1" style={{display:'inline-block'}}>
                                                                                <Field type="checkbox" checked={values.contact.includes('email')} className="custom-control-input" id="email" name="contact" value="email"/>	
                                                                                <label className="custom-control-label" style={{display:'inline-block', width:'auto'}} htmlFor="email">Email</label>
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

export default EditJob;