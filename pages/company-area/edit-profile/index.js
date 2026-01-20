import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SERVER_URL } from "../../../util/Constants";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import SearchLocationInput from "../../../components/SearchLocationInput/SearchLocationInput";
import Loader from "@/components/Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  DeactivateAccount,
  setRedirectedTo,
} from "../../../redux/profileSlice";
import { useRouter } from "next/router";
import {
  checkTokenExist,
  DisplayAddsInDashboardPages,
} from "../../../util/utils";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

// export const getServerSideProps = async function ({ req, res }) {
//   if (!checkTokenExist()) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
const EditProfile = () => {
  const PROFILE_IMAGE = "/user-pilot/images/undraw_profile.svg";
  const profileInputRef = useRef();
  let history = useRouter();
  const {
    DeactivateAccount_status,
    DeactivateAccount_data,
    DeactivateAccount_error,
    redirected_to,
  } = useSelector((s) => s.profile);
  const dispatch = useDispatch();
  const { accessToken, userId, profileImage, setUserProfileImage } =
    useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  //const [ profileImage, setProfileImage ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserDetailData] = useState({
    first_name: "",
    last_name: "",
    hear_about_us: "",
    address_1: "",
    address_2: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    getUserDetail();
    dispatch(getDashboardAds("pilot-edit-profile"));
  }, [getUserDetail, dispatch]);

  const {
    getDashboardAds_status,
    getDashboardAds_data,
    getDashboardAds_error,
  } = useSelector((state) => state?.home ?? {});

  const [above_title_positon, setAboveTitlePosition] = useState(0);
  const [bottom_page_position, setBottomPagePosition] = useState(0);
  const [above_title2_positon, setAboveTitle2Position] = useState(0);
  const [bottom_page2_position, setBottomPage2Position] = useState(0);

  const [above_title_index, setAboveTitleIndex] = useState(0);
  const [bottom_page_index, setBottomPageIndex] = useState(0);
  const [above_title2_index, setAboveTitle2Index] = useState(0);
  const [bottom_page2_index, setBottomPage2Index] = useState(0);

  useEffect(() => {
    if (getDashboardAds_data) {
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-edit-profile-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "edit_profile_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "edit_profile_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-edit-profile-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "edit_profile_above_title_banner2_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "edit_profile_bottom_page_banner2_index"
      );
    }
  }, [getDashboardAds_data]);

  const getUserDetail = useCallback(async () => {
    setLoading(true);
    try {
      await fetch(`${SERVER_URL}/profile/show/${userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === 200) {
            setLoading(false);
            setUserDetailData(response.data);
            setUserProfileImage(response.data.profile_image);
          }
        });
    } catch (error) {
      setLoading(false);
    }
  }, [userId, accessToken, setUserProfileImage]);

  const profilePictureSelected = () => {
    if (profileInputRef.current.files.length) {
      handleFiles(profileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    profileInputRef.current.click();
  };

  const handleFiles = async (files) => {
    const base64 = await convertBase64(files[0]);
    console.log(base64);
    setUserProfileImage(base64);
    /* if (props.onSetTeamImage) {
            props.onSetTeamImage(base64);
        } */
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
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const handleDeactivateAccount = () => {
    console.log(userId);
    dispatch(DeactivateAccount(userId));
  };

  return loading ? (
    <div className="row">
      <div className="col-md-9" style={{ textAlign: "center" }}>
        <Loader
          type="ThreeDots"
          color="#ffcc0e"
          height={100}
          width={100}
          visible={loading}
        />
      </div>
    </div>
  ) : (
    <div className="container-fluid">
      <AddBannerComponent
        data={getDashboardAds_data}
        status={getDashboardAds_status}
        position={above_title_positon}
        index={above_title_index}
      />
      <AddBannerComponent
        data={getDashboardAds_data}
        status={getDashboardAds_status}
        position={above_title2_positon}
        index={above_title2_index}
      />
      <div className="DashHeading d-flex justify-content-between align-items-center mb-3">
        <h1 className="h1 mb-3 text-black">
          <i className="far fa-arrow-alt-circle-right"></i> Edit Profile
        </h1>
        <button
          onClick={handleDeactivateAccount}
          className="action-button"
          type="button"
          disabled={DeactivateAccount_status === "pending"}
        >
          {DeactivateAccount_status === "pending" && (
            <span
              className="spinner-border mx-1 spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          Deactivate
        </button>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          mobile: userData.mobile,
          address_1: userData.address_1,
          address_2: userData.address_2,
          addressLocation: userData.city
            ? `${userData.city}, ${userData.state}, ${userData.country}`
            : "",
          zip_code: userData.zip_code,
          hear_about_us: userData.hear_about_us,
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required("First name is required"),
          /* email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'), */
          mobile: Yup.string()
            .matches(phoneRegExp, "Contact number is not valid")
            .required("Contact number is required"),
          address_1: Yup.string().required("Address 1 is required"),
          addressLocation: Yup.string().required("Location is required"),
          zip_code: Yup.string().required("Zip code is required"),
        })}
        onSubmit={async (fields) => {
          showToast("Updating profile...");
          //delete fields.addressLocation;
          let obj = {};
          if (userData.city) {
            obj = {
              city: userData.city,
              state: userData.state,
              country: userData.country,
            };
            obj = JSON.stringify(obj);
          }
          let dataObjHasValue = document
            .getElementById("location-input")
            .getAttribute("data-obj");
          if (dataObjHasValue) {
            obj = dataObjHasValue;
          }
          const location = JSON.parse(obj);
          fields.user_id = userId;
          fields.profile_image = profileImage;
          fields.city = location.city;
          fields.state = location.state;
          fields.country = location.country;

          console.log(fields);
          await axios
            .post(`${SERVER_URL}/profile/update`, fields, {
              headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            })
            .then((response) => {
              hideToast();
              showToastSuccess(response.data.message);
            })
            .catch((error) => {
              hideToast();
              //showToastError(error.response.data.message)
            });
        }}
      >
        {({ errors, values, status, touched, isSubmitting, setFieldValue }) => (
          <Form className="card shadow pt-5 pb-5 mb-3 ProfileEdit">
            <div className="col-sm-10 offset-sm-1">
              <h4 className="fs-title text-black mb-4">
                <strong>Personal Details</strong>
              </h4>
              <div className="row">
                <div className="col-sm-3">
                  <figure
                    className="pilot-profile mr-3"
                    onClick={() => fileInputClicked()}
                  >
                    <Image
                      className="img-profile rounded-circle"
                      height={150}
                      width={150}
                      style={{ objectFit: "cover" }}
                      alt="profile"
                      src={profileImage ? profileImage : PROFILE_IMAGE}
                    />
                    <div className="pilot-edit">
                      <input
                        ref={profileInputRef}
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        onChange={() => profilePictureSelected()}
                        style={{ display: "none" }}
                      />
                    </div>
                    {/* <div className="ImgfileUpld btn btn-outline-primary mr-2" onClick={()=>fileInputClicked()}>Change Avatar 
                                        <input
                                            ref = {profileInputRef}
                                            accept = ".png, .jpg, .jpeg"
                                            type="file"
                                            onChange={()=> profilePictureSelected()}
                                        />
                                    </div> */}
                  </figure>
                </div>
                <div className="col-sm-9 form-group">
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>First Name</label>
                      <Field
                        name="first_name"
                        placeholder="First Name"
                        type="text"
                        className={
                          "form-control" +
                          (errors.first_name && touched.first_name
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="error-color"
                      />
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Last Name</label>
                      <Field
                        name="last_name"
                        placeholder="Last Name"
                        type="text"
                        className={"form-control"}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Email</label>
                      <Field
                        name="email"
                        placeholder="Enter your email to register"
                        type="text"
                        disabled={true}
                        className={"form-control"}
                      />
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Contact Number</label>
                      <Field
                        name="mobile"
                        placeholder="Enter your contact number"
                        type="text"
                        className={
                          "form-control" +
                          (errors.mobile && touched.mobile ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="error-color"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="fs-title text-black mb-4">
                <strong>Contact Details</strong>
              </h4>

              <div className="row">
                <div className="col-sm-12 form-group">
                  <label>Address 1</label>
                  <Field
                    name="address_1"
                    placeholder="Enter your address"
                    type="text"
                    className={
                      "form-control" +
                      (errors.address_1 && touched.address_1
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="address_1"
                    component="div"
                    className="error-color"
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <label>Address 2</label>
                  <Field
                    name="address_2"
                    placeholder="Enter your address 2"
                    type="text"
                    className={
                      "form-control" +
                      (errors.address_2 && touched.address_2
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="address_2"
                    component="div"
                    className="error-color"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 form-group  searchWrap">
                  <label>
                    Location
                    <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                      {" "}
                      (search and select)
                    </span>
                  </label>
                  <SearchLocationInput
                    //setInputLocation = {values.location}
                    className="form-control"
                    locationSelect={(loc) => {
                      setFieldValue("addressLocation", loc);
                    }}
                    locationString={
                      userData.city
                        ? `${userData.city}, ${userData.state}, ${userData.country}`
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="addressLocation"
                    component="div"
                    className="error-color"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 form-group">
                  <label>Zip Code</label>
                  <Field
                    name="zip_code"
                    placeholder="Enter zip code"
                    type="text"
                    className={
                      "form-control" +
                      (errors.zip_code && touched.zip_code ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="zip_code"
                    component="div"
                    className="error-color"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 form-group">
                  <label>How did you hear about us? </label>
                  <Field
                    as="select"
                    className="form-control"
                    name="hear_about_us"
                  >
                    <option value="social-media">Social Media</option>
                    <option value="google-search">Google Search</option>
                    <option value="friend-referral">Friend Referral</option>
                    <option value="television-podcast">
                      Television/Podcast
                    </option>
                    <option value="other">Other, (please explain)</option>
                  </Field>
                </div>
              </div>
              <center className="paddngt">
                <button className="action-button" type="submit">
                  Save
                </button>
              </center>
            </div>
          </Form>
        )}
      </Formik>
      <AddBannerComponent
        data={getDashboardAds_data}
        status={getDashboardAds_status}
        position={bottom_page_position}
        index={bottom_page_index}
      />
      <AddBannerComponent
        data={getDashboardAds_data}
        status={getDashboardAds_status}
        position={bottom_page2_position}
        index={bottom_page2_index}
      />
    </div>
  );
};

export default EditProfile;
