/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "@/components/Common/Loader";
import useAuthContext from "../../hooks/useAuthContext";
import useToastContext from "../../hooks/useToastContext";
import { SERVER_URL } from "../../util/Constants";
import axiosInstance from "../../api/AxiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useUserContext from "../../hooks/useUserContext";
import { useRouter } from "next/router";


const SubmitEvent = () => {
  const PROFILE_IMAGE = "/user-pilot/images/undraw_profile_1.svg";
  const profileInputRef = useRef();
  const licenseInputRef = useRef();
  const {
    accessToken,
    authTokens,
    userId,
    name,
    email,
    setVerifyEmail,
    setUserProfileImage,
    profileImage,
  } = useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  const [fullPageLoading, setFullPageLoading] = useState(false);
  const [canEditNow, setCanEdit] = useState(false);
  const [pilotProfileImg, setPilotProfileImage] = useState("");
  const [isImageNew, setImageNew] = useState(false);
  const [eventFeaturedImage, seteventFeaturedImage] = useState("");
  const firstProfileImageRef = useRef();
  const secondProfileImageRef = useRef();
  const thirdProfileImageRef = useRef();
  const fourthProfileImageRef = useRef();
  const fifthProfileImageRef = useRef();
  const sixthProfileImageRef = useRef();
  const [firstProfileImage, setFirstProfileImage] = useState("");
  const [secondProfileImage, setSecondProfileImage] = useState("");
  const [thirdProfileImage, setThirdProfileImage] = useState("");
  const [fourthProfileImage, setFourthProfileImage] = useState("");
  const [fifthProfileImage, setFifthProfileImage] = useState("");
  const [sixthProfileImage, setSixthProfileImage] = useState("");

  let history = useRouter();

  // const [isEventType, setEventType] = useState(false);
  const { userInitialData, setTempUserSubscriptionData } = useUserContext();

  const [profileData, setProfileData] = useState({
    title: '',
    event_type: '',
    other_event_type: '',
    description: '',
    event_video: '',
    event_start: '',
    event_end: '',
    cost: '',
    street_add: '',
    suite: '',
    city: '',
    state: '',
    image: '',
    gallery_img_1: '',
    gallery_img_2: '',
    gallery_img_3: '',
    gallery_img_4: '',
    gallery_img_5: '',
    gallery_img_6: '',
  });

  const licensePictureSelected = (files, setFieldValue) => {
    handleFiles(files, "image", setFieldValue);
  };

  // const SERVER_URL = "http://127.0.0.1:8000/api/v1";

  const firstProfileImageSelected = async (files, setFieldValue) => {
    handleFiles(files, "gallery_img_1", setFieldValue);
  };
  const secondProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "gallery_img_2", setFieldValue);
  };
  const thirdProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "gallery_img_3", setFieldValue);
  };
  const fourthProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "gallery_img_4", setFieldValue);
  };
  const fifthProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "gallery_img_5", setFieldValue);
  };
  const sixthProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "gallery_img_6", setFieldValue);
  };

  const handleFiles = async (files, type, setFieldValue) => {
    const base64 = await convertBase64(files[0]);

    if (!validateFile(files[0])) {
      showToastError("File type not permitted");
    } else {
      if (type === "image") {
        seteventFeaturedImage(base64);
        setFieldValue("image", base64);
        setImageNew(true);
      } else if (type === "gallery_img_1") {
        setFieldValue("gallery_img_1", base64);
        setFirstProfileImage(base64);
      } else if (type === "gallery_img_2") {
        setFieldValue("gallery_img_2", base64);
        setSecondProfileImage(base64);
      } else if (type === "gallery_img_3") {
        setFieldValue("gallery_img_3", base64);
        setThirdProfileImage(base64);
      } else if (type === "gallery_img_4") {
        setFieldValue("gallery_img_4", base64);
        setFourthProfileImage(base64);
      } else if (type === "gallery_img_5") {
        setFieldValue("gallery_img_5", base64);
        setFifthProfileImage(base64);
      } else if (type === "gallery_img_6") {
        setFieldValue("gallery_img_6", base64);
        setSixthProfileImage(base64);
      }
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    return validTypes.includes(file.type) && file.size > 0;
  };
  const dispatch = useDispatch();

  const eventTypes = ["Tradeshow", "Virtual Event", "Product Launch", "Conference", "Grand Opening", "Charity Event", "Educational Event", "Networking Event", "Workshop", "Other"];
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ behavior: 'smooth', top: '0px' });
    }
  }, [userInitialData]);

  useEffect(() => {
    authCheck(router.asPath);
    setFullPageLoading(false);
  }, [userId]);

  function authCheck(url) {
    if (!authTokens) {
      router.push({
        pathname: '/login'
      });
    }
  }

  return fullPageLoading ? (
    <div className="row">
      <div
        className="col-12 text-center justify-content-between"
        style={{ textAlign: "center" }}
      >
        <Loader
          type="ThreeDots"
          color="#ffcc0e"
          height={100}
          width={100}
          visible={fullPageLoading}
        />
      </div>
    </div>
  ) : (
    <div className="container-fluid">
      <div className="DashHeading mt-3 mb-3">
        <h1 className="h1 mb-3 text-black">
          <i className="far fa-arrow-alt-circle-right"></i> Submit Event
        </h1>
      </div>
      <div className="row PilotDashboardProfile">
        <div className="col-12 text-left mb-3">
          <div className="card shadow px-4 py-4">
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card-body">
                  <div className="account-settings text-center">
                    <div className="pilot-profile">
                      <div className="pilot-avatar">
                        <img className="img-profile rounded-circle"
                          src={pilotProfileImg ? pilotProfileImg : profileImage ? profileImage : PROFILE_IMAGE}
                          height="150px"
                          width="150px"
                          style={{ objectFit: "cover" }}
                          alt="profile"
                        />
                      </div>
                      <h5 className="pilot-name">{name}</h5>
                      <h6 className="pilot-email">{email}</h6>
                    </div>
                    {eventFeaturedImage ? (
                      <div className="about-pilot">
                        <h5>Event Featured Image</h5>
                        <img
                          src={eventFeaturedImage}
                          height="150px"
                          style={{ objectFit: "cover" }}
                          alt="Event Featured Image"
                        />
                      </div>
                    ) : null}

                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    title: '',
                    event_type: '',
                    other_event_type: '',
                    description: '',
                    event_video: '',
                    event_link: '',
                    event_start: '',
                    event_end: '',
                    cost: '',
                    phone_number: '',
                    contact_email: '',
                    street_add: '',
                    suite: '',
                    city: '',
                    state: '',
                    image: '',
                    gallery_img_1: '',
                    gallery_img_2: '',
                    gallery_img_3: '',
                    gallery_img_4: '',
                    gallery_img_5: '',
                    gallery_img_6: ''
                  }}
                  validationSchema={Yup.object().shape({
                    title: Yup.string().required("Event title is required"),
                    description: Yup.string().required("Description is required"),
                    // image: Yup.mixed().required("Please upload Event Featured Image"),
                    event_start: Yup.string().required("event start date is required"),
                    event_end: Yup.string().required("event end date is required"),
                    street_add: Yup.string().required("Event Street Address is required"),
                    // suite: Yup.string().required("Event Suite # is required"),
                    city: Yup.string().required("Event city is required"),
                    state: Yup.string().required("Event state is required"),
                  })}
                  onSubmit={async (fields) => {
                    showToast("Submitting you event...");
                    // console.log(JSON.stringify(fields));
                    const formData = new FormData();
                    if (!canEditNow) {
                      formData.append("user_id", userId);
                    }
                    formData.append("title", fields.title);
                    formData.append("event_type", fields.event_type);
                    formData.append("other_event_type", fields.other_event_type);
                    formData.append("description", fields.description);
                    formData.append("event_video", fields.event_video);
                    formData.append("event_link", fields.event_link);
                    formData.append("event_start", fields.event_start);
                    formData.append("event_end", fields.event_end);
                    formData.append("cost", fields.cost);
                    formData.append("phone_number", fields.phone_number);
                    formData.append("contact_email", fields.contact_email);
                    formData.append("street_add", fields.street_add);
                    formData.append("suite", fields.suite);
                    formData.append("city", fields.city);
                    formData.append("state", fields.state);
                    formData.append("image", fields.image);
                    formData.append("gallery_img_1", fields.gallery_img_1);
                    formData.append("gallery_img_2", fields.gallery_img_2);
                    formData.append("gallery_img_3", fields.gallery_img_3);
                    formData.append("gallery_img_4", fields.gallery_img_4);
                    formData.append("gallery_img_5", fields.gallery_img_5);
                    formData.append("gallery_img_6", fields.gallery_img_6);
                    let url = "";
                    if (canEditNow) {
                      //formData.append("is_new_profile_image", isImageNew);
                      //url = `${SERVER_URL}/event/update/${userId}`;
                      url = `${SERVER_URL}/event/create`;
                    } else {
                      url = `${SERVER_URL}/event/create`;
                    }
                    axios
                      .post(url, formData, {
                        headers: {
                          "Content-Type": "application/octet-stream",
                          Authorization: `Bearer ${accessToken}`,
                          "Access-Control-Allow-Origin": "*",
                        },
                      })
                      .then((response) => {
                        hideToast();
                        showToastSuccess('Please submit payment to publish the event!');
                        let tempData = {
                          userId: response.data.data.user_id,
                          eventId: response.data.data.id,
                          eventTitle: response.data.data.title,
                          plans: 'price_1N431cBbrKa9p7qI3RjBAyyv',
                          eventData: response.data.data
                        }
                        setTempUserSubscriptionData(tempData);
                        // console.log(JSON.stringify(tempData));
                        history.push('/event/submit-event-payment');
                      })
                      .catch((error) => {
                        console.log(error);
                        //showToastError(error.response.message)
                      });
                  }}
                >
                  {({
                    errors,
                    values,
                    status,
                    touched,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <Form className="PilotBuildProfile">
                      <div className="card h-100">
                        <div className="card-body">
                          <h3 className="mb-2 text-primary">Event Details</h3>
                          <hr></hr>
                          <div className="htmlForm-group">
                            <label htmlFor="title">Event Title *</label>
                            <Field name="title" placeholder="Enter Event Title" type="text" id="title" className={"form-control" + (errors.title && touched.title ? " is-invalid" : "")} />
                            <ErrorMessage name="title" component="div" className="error-color" />
                          </div>



                          <div className="row gutters">
                            <div className="col-md-6">
                              <div className="htmlForm-group">
                                <label htmlFor="title">Event Type *</label>

                                <Field as="select" name="event_type" id="event_type" className={"form-control" + (errors.event_type && touched.event_type ? " is-invalid" : "")} onChange={(e) => setFieldValue("event_type", e.target.value)}>
                                  <option disabled value="">(Select Event Type)</option>
                                  {eventTypes && eventTypes.map(event_type => (
                                    <option value={event_type}>{event_type}</option>
                                  ))}
                                </Field>
                                <ErrorMessage name="event_type" component="div" className="error-color" />
                              </div>
                            </div>



                            {values.event_type == 'Other' ? (
                              <div className="col-md-6">
                                <div className="htmlForm-group">
                                  <label htmlFor="title">Define Other Event Type</label>
                                  <Field name="other_event_type" placeholder="Enter Other Event Type" type="text" id="other_event_type" className={"form-control" + (errors.other_event_type && touched.other_event_type ? " is-invalid" : "")} />
                                  <ErrorMessage name="other_event_type" component="div" className="error-color" />
                                </div>
                              </div>
                            ) : null}
                          </div>


                          <h6 className="mb-2 text-primary">Event Location</h6>
                          <div className="row gutters">
                            <div className="col-md-3">
                              <div className="htmlForm-group">
                                <label htmlFor="location">Street Address *</label>
                                <Field name="street_add" placeholder="Enter Event Street Address" type="text" id="street_add" className={"form-control" + (errors.street_add && touched.street_add ? " is-invalid" : "")} />
                                <ErrorMessage name="street_add" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="htmlForm-group">
                                <label htmlFor="suite">Suite # </label>
                                <Field name="suite" placeholder="Enter Suite #" type="text" id="suite" className={"form-control" + (errors.suite && touched.suite ? " is-invalid" : "")} />
                                <ErrorMessage name="suite" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="htmlForm-group">
                                <label htmlFor="city">City *</label>
                                <Field name="city" placeholder="Enter Event City" type="text" id="city" className={"form-control" + (errors.city && touched.city ? " is-invalid" : "")} />
                                <ErrorMessage name="city" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="htmlForm-group">
                                <label htmlFor="state">State *</label>
                                <Field name="state" placeholder="Enter Event State" type="text" id="state" className={"form-control" + (errors.state && touched.state ? " is-invalid" : "")} />
                                <ErrorMessage name="state" component="div" className="error-color" />
                              </div>
                            </div>
                          </div>

                          <div className="row gutters">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="event_start">Event Start Date *</label>
                                <Field name="event_start" placeholder="Enter Event Start Date #" type="datetime-local" id="event_start" className={"form-control" + (errors.event_start && touched.event_start ? " is-invalid" : "")} />
                                <ErrorMessage name="event_start" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="event_end">Event End Date *</label>
                                <Field name="event_end" placeholder="Enter Event End Date #" type="datetime-local" id="event_end" className={"form-control" + (errors.event_end && touched.event_end ? " is-invalid" : "")} />
                                <ErrorMessage name="event_end" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="cost">Event Cost *</label>
                                <Field name="cost" placeholder="Enter Event Cost" type="text" id="cost" className={"form-control" + (errors.cost && touched.cost ? " is-invalid" : "")} />
                                <ErrorMessage name="cost" component="div" className="error-color" />
                              </div>
                            </div>
                          </div>


                          <div className="row gutters">
                            <div className="col-md-6">
                              <div className="htmlForm-group">
                                <label htmlFor="phone_number">Phone Number</label>
                                <Field name="phone_number" placeholder="Enter Phone Number" type="text" id="phone_number" className={"form-control" + (errors.phone_number && touched.phone_number ? " is-invalid" : "")} />
                                <ErrorMessage name="phone_number" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="htmlForm-group">
                                <label htmlFor="contact_email">Contact email</label>
                                <Field name="contact_email" placeholder="Enter Contact email" type="email" id="contact_email" className={"form-control" + (errors.contact_email && touched.contact_email ? " is-invalid" : "")} />
                                <ErrorMessage name="contact_email" component="div" className="error-color" />
                              </div>
                            </div>
                          </div>


                          <div className="htmlForm-group">
                            <label htmlFor="image">Featured Image (Photo or flyer) *</label>
                            <input
                              ref={licenseInputRef}
                              name="image"
                              id="image"
                              placeholder="Upload license photo"
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              onChange={(event) =>
                                licensePictureSelected(
                                  event.currentTarget.files,
                                  setFieldValue
                                )
                              }
                              className={
                                "form-control" +
                                (errors.image &&
                                  touched.image
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="image"
                              component="div"
                              className="error-color"
                            />
                          </div>

                          <div className="htmlForm-group">
                            <label htmlFor="event_link">Event URL</label>
                            <Field name="event_link" placeholder="Enter Event URL" type="text" id="event_link" className={"form-control" + (errors.event_link && touched.event_link ? " is-invalid" : "")} />
                            <ErrorMessage name="event_link" component="div" className="error-color" />
                          </div>


                          <div className="htmlForm-group">
                            <label htmlFor="event_video">Event Video</label>
                            <Field
                              name="event_video"
                              id="event_video"
                              placeholder="Event Video"
                              rows="3"
                              as="textarea"
                              className={
                                "form-control" +
                                (errors.event_video && touched.event_video
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="event_video"
                              component="div"
                              className="error-color"
                            />
                          </div>


                          <div className="htmlForm-group">
                            <label htmlFor="description">Description *</label>
                            <Field
                              name="description"
                              id="description"
                              placeholder="Description"
                              rows="15"
                              as="textarea"
                              className={
                                "form-control" +
                                (errors.description && touched.description
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="error-color"
                            />
                          </div>


                          <div className="row gutters">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {firstProfileImage ? (
                                  <div className="about-pilot">
                                    <img
                                      src={firstProfileImage}
                                      height="200px"
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="First Gallery Image"
                                    />
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="gallery_img_1">Gallery Image 1</label>
                                  <input
                                    ref={firstProfileImageRef}
                                    name="gallery_img_1"
                                    id="gallery_img_1"
                                    placeholder="Upload license photo"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => firstProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.gallery_img_1 && touched.gallery_img_1 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="gallery_img_1" component="div" className="error-color" />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {secondProfileImage ? (
                                  <div className="about-pilot">
                                    <img
                                      src={secondProfileImage}
                                      height="200px"
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Second Gallery Image"
                                    />
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="gallery_img_2">Gallery Image 2</label>
                                  <input
                                    ref={secondProfileImageRef}
                                    name="gallery_img_2"
                                    id="gallery_img_2"
                                    placeholder="Upload Second Gallery Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => secondProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.gallery_img_2 && touched.gallery_img_2 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="gallery_img_2" component="div" className="error-color" />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {thirdProfileImage ? (
                                  <div className="about-pilot">
                                    <img
                                      src={thirdProfileImage}
                                      height="200px"
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Third Gallery Image"
                                    />
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="gallery_img_3">Gallery Image 3</label>
                                  <input
                                    ref={thirdProfileImageRef}
                                    name="gallery_img_3"
                                    id="gallery_img_3"
                                    placeholder="Upload Third Gallery Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => thirdProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.gallery_img_3 && touched.gallery_img_3 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="gallery_img_3" component="div" className="error-color" />
                                </div>
                              </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {fourthProfileImage ? (
                                  <div className="about-pilot">
                                    <img
                                      src={fourthProfileImage}
                                      height="200px"
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Fourth Gallery Image"
                                    />
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="gallery_img_4">Gallery Image 4</label>
                                  <input
                                    ref={fourthProfileImageRef}
                                    name="gallery_img_4"
                                    id="gallery_img_4"
                                    placeholder="Upload Fourth Gallery Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => fourthProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.gallery_img_4 && touched.gallery_img_4 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="gallery_img_4" component="div" className="error-color" />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {fifthProfileImage ? (
                                  <div className="about-pilot">
                                    <img
                                      src={fifthProfileImage}
                                      height="200px"
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Fifth Gallery Image"
                                    />
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="gallery_img_5">Gallery Image 5</label>
                                  <input
                                    ref={fifthProfileImageRef}
                                    name="gallery_img_5"
                                    id="gallery_img_5"
                                    placeholder="Upload Fifth Gallery Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => fifthProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.gallery_img_5 && touched.gallery_img_5 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="gallery_img_5" component="div" className="error-color" />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {sixthProfileImage ? (
                                  <div className="about-pilot">
                                    <img
                                      src={sixthProfileImage}
                                      height="200px"
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Sixth Gallery Image"
                                    />
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="gallery_img_6">Gallery Image 6</label>
                                  <input
                                    ref={sixthProfileImageRef}
                                    name="gallery_img_6"
                                    id="gallery_img_6"
                                    placeholder="Upload Sixth Gallery Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => sixthProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.gallery_img_6 && touched.gallery_img_6 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="gallery_img_6" component="div" className="error-color" />
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="text-center">
                                {/* <button type="button" id="submit" name="submit" className="btn previous action-button-previous" >Cancel</button> */}
                                <button
                                  type="submit"
                                  id="submit"
                                  name="submit"
                                  className="btn action-button"
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SubmitEvent;
