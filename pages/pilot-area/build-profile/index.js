import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "@/components/Common/Loader";
import Multiselect from "multiselect-react-dropdown";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import { SERVER_URL } from "../../../util/Constants";
import { checkTokenExist, DisplayAddsInDashboardPages } from "../../../util/utils";
import axiosInstance from "../../../api/AxiosInstance";
import { toast } from "react-toastify";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";
import { useDispatch, useSelector } from "react-redux";

import SearchLocationInput, {
  loadScript,
} from "../../../components/SearchLocationInput/SearchLocationInput";

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

const BuildProfile = () => {
  const PROFILE_IMAGE = "/user-pilot/images/undraw_profile_1.svg";
  const profileInputRef = useRef();
  const licenseInputRef = useRef();
  const {
    accessToken,
    userId,
    name,
    email,
    setVerifyEmail,
    setUserProfileImage,
    profileImage,
  } = useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [skillCategories, setSkillCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [canEditNow, setCanEdit] = useState(false);
  const [pilotProfileImg, setPilotProfileImage] = useState("");
  const [isImageNew, setImageNew] = useState(false);
  const [pilotLicenseImg, setPilotLicenseImage] = useState("");
  const [isLicenseImageNew, setLicenseImageNew] = useState(false);
  const [removeprofilePic, setRemoveProfilePic] = useState(false);
  const [removelicensePic, setRemoveLicensePic] = useState(false);
  const [profileData, setProfileData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    travel_option: "",
    hourly_rate: "",
    short_description: "",
    description: "",
    metatitle: "",
    metakeyword: "",
    metadescription: "",
    skills: [],
    license_image: "",
    addressLocation: "",
    instagram_name: "",
  });

  const getPilotBasicProfileDetail = useCallback(async () => {
    try {
      setFullPageLoading(true);
      await fetch(
        `${SERVER_URL}/pilot-dashboard/basic-profile/show/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          setFullPageLoading(false);
          if (response.statusCode === 200) {
            setProfileData(response.data);
            setPilotProfileImage(response.data.profile_image);
            setUserProfileImage(response.data.profile_image);
            setPilotLicenseImage(response.data.license_image);
            setSelectedCategories(response.data.skills);
            //setFieldValue("addressLocation", response.data.address);
            setCanEdit(true);
          } else {
            setPilotProfileImage("");
            setUserProfileImage("");
            // setFieldValue("addressLocation", "");
            showToastError(
              "Profile not found, please create your profile first"
            );
          }
        });
    } catch (error) {
      console.log(error);
      setFullPageLoading(false);
    }
  }, [userId, accessToken, setUserProfileImage, showToastError]);

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
    } catch (error) { }
  }, []);

  const onSelectCategory = (selectedList, selectedItem, setFieldValue) => {
    //console.log(selectedItem);
    if (selectedItem.id === "*") {
      setSelectedCategories([...skillCategories]);
      setFieldValue("jobCategory", JSON.stringify([...skillCategories]));
    } else {
      setSelectedCategories([...selectedCategories, selectedItem]);
      setFieldValue(
        "jobCategory",
        JSON.stringify([...selectedCategories, selectedItem])
      );
    }
  };

  const onRemoveCategory = (selectedList, selectedItem, setFieldValue) => {
    let newList = [];
    if (selectedItem.id === "*") {
      newList = [];
    } else {
      newList = selectedCategories.filter(
        (selectedCategory) => selectedCategory.id !== selectedItem.id
      );
    }
    setSelectedCategories(newList);
    if (newList.length === 0) {
      setFieldValue("jobCategory", "");
    }
  };

  const licensePictureSelected = (files, setFieldValue) => {
    //if (licenseInputRef.current.files.length) {
    handleFiles(files, "liscense", setFieldValue);
    //}
  };

  const profilePictureSelected = () => {
    if (profileInputRef.current.files.length) {
      handleFiles(profileInputRef.current.files, "profile");
    }
  };

  const fileInputClicked = () => {
    profileInputRef.current.click();
  };

  const handleFiles = async (files, type, setFieldValue) => {
    const base64 = await convertBase64(files[0]);
    if (type === "profile") {
      setPilotProfileImage(base64);
      setImageNew(true);
    } else {
      if (!validateFile(files[0])) {
        showToastError("File type not permitted");
        setFieldValue("license_image", "");
      } else {
        setFieldValue("license_image", base64);
        setPilotLicenseImage(base64);
        setLicenseImageNew(true);
      }
    }

    //setUserProfileImage(base64);
  };

  const handleRemoveProfileImage = async (type) => {
    try {
      let res;
      if (type === "profile") {
        setRemoveProfilePic(true);
        res = await axiosInstance.post("profile/remove-picture", {
          user_id: userId,
          image_type: 0,
        });
        if (res?.data?.statusCode === 200) {
          setRemoveProfilePic(false);
          getPilotBasicProfileDetail();
          toast.success("Profile image removed successfully");
        } else {
          setRemoveProfilePic(false);
          toast.error("Something went wrong");
        }
      } else {
        setRemoveLicensePic(true);
        res = await axiosInstance.post("profile/remove-picture", {
          user_id: userId,
          image_type: 1,
        });
        if (res?.data?.statusCode === 200) {
          getPilotBasicProfileDetail();
          setRemoveLicensePic(false);
          toast.success("License image removed successfully");
        } else {
          setRemoveLicensePic(false);
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      setRemoveLicensePic(false);
      setRemoveProfilePic(false);
      console.log(error);
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
  useEffect(() => {
    getPilotBasicProfileDetail();
    getSkillCategories();
    dispatch(getDashboardAds("pilot-build-profile"));
  }, [getPilotBasicProfileDetail, getSkillCategories, dispatch]);

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
        "above-build-your-profile-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "build_profile_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "build_profile_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-build-profile-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "build_profile_above_title2_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "build_profile_bottom_page2_banner_index"
      );

    }
  }, [getDashboardAds_data]);

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
      <AddBannerComponent
        data={getDashboardAds_data}
        status={getDashboardAds_status}
        position={above_title_positon}
        index={above_title_index}
      />  <AddBannerComponent
        data={getDashboardAds_data}
        status={getDashboardAds_status}
        position={above_title2_positon}
        index={above_title2_index}
      />
      <div className="DashHeading mb-3">
        <h1 className="h1 mb-3 text-black">
          <i className="far fa-arrow-alt-circle-right"></i> Build Your Profile
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
                      <div
                        className="pilot-avatar"
                        onClick={() => fileInputClicked()}
                      >
                        <Image
                          className="img-profile rounded-circle"
                          src={
                            pilotProfileImg
                              ? pilotProfileImg
                              : profileImage
                                ? profileImage
                                : PROFILE_IMAGE
                          }
                          height={150}
                          width={150}
                          style={{ objectFit: "cover" }}
                          alt="profile"
                        />
                        <div className="pilot-edit">
                          <input
                            ref={profileInputRef}
                            accept=".png, .jpg, .jpeg"
                            type="file"
                            onChange={() => profilePictureSelected()}
                            style={{ display: "none" }}
                          />
                          <label htmlFor="imageUpload d-flex">
                            <center>
                              <i className="fas fa-pen"></i>
                            </center>
                          </label>
                        </div>
                      </div>
                      {profileData?.profile_image?.split("/")[3] !==
                        "pilotNoImage.png" && (
                          <p
                            onClick={() => handleRemoveProfileImage("profile")}
                            className="cursorPointer text-danger"
                            disabled={removeprofilePic}
                          >
                            {removeprofilePic
                              ? "Removing..."
                              : "Remove profile picture"}
                          </p>
                        )}

                      <h5 className="pilot-name">{name}</h5>
                      <h6 className="pilot-email">{email}</h6>
                    </div>
                    {pilotLicenseImg ? (
                      <div className="about-pilot">
                        <h5>Current Part 107 or Temporary Certificate image</h5>

                        {profileData?.license_image !== "" && (
                          <p
                            onClick={() => handleRemoveProfileImage("license")}
                            className="cursorPointer text-danger"
                            disabled={removelicensePic}
                          >
                            {removelicensePic
                              ? "Removing..."
                              : "Remove license picture"}
                          </p>
                        )}

                        <Image
                          src={pilotLicenseImg}
                          height={150}
                          width={300}
                          style={{ objectFit: "contain" }}
                          alt="license"
                        />
                        <label>
                          This is only visible to the Droning Company admin
                        </label>
                      </div>
                    ) : null}

                    {profileData.description ? (
                      <div className="about-pilot">
                        <h5>About</h5>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: profileData?.description,
                          }}
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
                    title: profileData.title,

                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    email: profileData.email,
                    mobile: profileData.mobile,

                    travel_option: profileData.travel_option
                      ? profileData.travel_option
                      : false,
                    //hourly_rate: profileData.hourly_rate,
                    //short_description: profileData.short_description,
                    description: profileData.hasOwnProperty("description")
                      ? profileData.description
                      : "",
                    metatitle: profileData.title,
                    metakeyword: profileData.metakeyword,
                    metadescription: profileData.metadescription,
                    jobCategory: profileData.skills,
                    license_image: profileData.license_image,
                    address: profileData.address,
                    zip_code: profileData.zip_code,
                    instagram_name: profileData.instagram_name,
                  }}
                  validationSchema={Yup.object().shape({
                    title: Yup.string().required("Title is required"),
                    addressLocation: Yup.string().required("Location is required"),
                    //hourly_rate : Yup.string().required('Hourly rate is required'),
                    description: Yup.string().required(
                      "Description is required"
                    ),
                    jobCategory: Yup.string().required("Skills is required"),
                    license_image: Yup.string().required(
                      "Please upload your license photo"
                    ),
                  })}
                  onSubmit={async (fields) => {
                    showToast("Updating your profile...");
                    // console.log(JSON.stringify(fields));
                    const formData = new FormData();
                    if (!canEditNow) {
                      formData.append("user_id", userId);
                    }
                    formData.append("title", fields.title);

                    formData.append("first_name", fields.first_name);
                    formData.append("last_name", fields.last_name);
                    formData.append("email", fields.email);
                    formData.append("mobile", fields.mobile);

                    formData.append(
                      "skills",
                      JSON.stringify(selectedCategories)
                    );
                    formData.append(
                      "travel_option",
                      fields.travel_option ? "Yes" : "No"
                    );
                    //formData.append('hourly_rate', fields.hourly_rate);
                    //formData.append('short_description', fields.short_description);
                    formData.append("description", fields.description);
                    formData.append("metatitle", fields.metatitle);
                    formData.append("metakeyword", fields.metakeyword);
                    formData.append("metadescription", fields.metadescription);
                    formData.append("license_image", fields.license_image);
                    if (isImageNew) {
                      formData.append("profile_image", pilotProfileImg);
                    }
                    let url = "";


                    let obj = {};
                    let dataObjHasValue = document.getElementById("location-input").getAttribute("data-obj");
                    let address = document.getElementById("location-input").value;
                    let zip_code = document.getElementById("zip_code").value;
                    if (dataObjHasValue) {
                      obj = dataObjHasValue;
                      obj = JSON.parse(obj);
                      obj.zip_code = zip_code;
                    }

                    formData.append("service_area", JSON.stringify(obj));
                    formData.append("address", address);
                    formData.append("zip_code", zip_code);
                    formData.append("instagram_name", fields.instagram_name);
                    //console.log(canEditNow);

                    if (canEditNow) {
                      formData.append("is_new_profile_image", isImageNew);
                      url = `${SERVER_URL}/pilot-dashboard/basic-profile/update/${userId}`;
                    } else {
                      url = `${SERVER_URL}/pilot-dashboard/basic-profile/create`;
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
                        // console.log(response.data);
                        setUserProfileImage(pilotProfileImg);
                        getPilotBasicProfileDetail();
                        hideToast();
                        showToastSuccess(
                          "Your profile has been updated successfully."
                        );
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




                          <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <h6 className="mb-2 text-primary">
                                Personal / Contact Details
                              </h6>
                            </div>

                            <div className="col-md-6">
                              <div className="htmlForm-group">
                                <label htmlFor="first_name">First Name *</label>
                                <Field
                                  name="first_name"
                                  placeholder="Enter First Name"
                                  type="text"
                                  id="first_name"
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
                            </div>

                            <div className="col-md-6">
                              <div className="htmlForm-group">
                                <label htmlFor="last_name">Last Name *</label>
                                <Field
                                  name="last_name"
                                  placeholder="Enter Last Name"
                                  type="text"
                                  id="last_name"
                                  className={
                                    "form-control" +
                                    (errors.last_name && touched.last_name
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="last_name"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="htmlForm-group">
                                <label htmlFor="email">Email *</label>
                                <Field
                                  name="email"
                                  placeholder="Enter email address"
                                  type="text"
                                  id="email"
                                  className={
                                    "form-control" +
                                    (errors.email && touched.email
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="htmlForm-group">
                                <label htmlFor="mobile">Contact Number *</label>
                                <Field
                                  name="mobile"
                                  placeholder="Enter Contact Number"
                                  type="text"
                                  id="mobile"
                                  className={
                                    "form-control" +
                                    (errors.mobile && touched.mobile
                                      ? " is-invalid"
                                      : "")
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



                          <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <h6 className="mb-2 text-primary">
                                Profile Details
                              </h6>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="title">Title *</label>
                                <Field
                                  name="title"
                                  placeholder="Enter title"
                                  type="text"
                                  id="title"
                                  className={
                                    "form-control" +
                                    (errors.title && touched.title
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label>Skills/Category</label>
                                <Multiselect
                                  showCheckbox={true}
                                  selectedValues={
                                    selectedCategories.length ===
                                      skillCategories.length
                                      ? [
                                        { skill_name: "All", id: "*" },
                                        ...skillCategories,
                                      ]
                                      : selectedCategories
                                  }
                                  options={[
                                    { skill_name: "All", id: "*" },
                                    ...skillCategories,
                                  ]} //{skillCategories}
                                  displayValue="skill_name"
                                  onSelect={(selectedList, selectedItem) =>
                                    onSelectCategory(
                                      selectedList,
                                      selectedItem,
                                      setFieldValue
                                    )
                                  }
                                  onRemove={(selectedList, selectedItem) =>
                                    onRemoveCategory(
                                      selectedList,
                                      selectedItem,
                                      setFieldValue
                                    )
                                  }
                                  placeholder="Select skills/categories"
                                  //selectionLimit="2"
                                  style={{
                                    chips: {
                                      background: "#ffcc0e",
                                    },
                                    option: {
                                      // To change css htmlFor dropdown options
                                      color: "#ffcc0e",
                                    },
                                  }}
                                />
                                <ErrorMessage
                                  name="jobCategory"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>
                            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label htmlFor="hourly_rate">Hourly Rate</label>
                                                    <Field name="hourly_rate" placeholder="Enter hourly rate" type="text" id="hourly_rate" className={'form-control' + (errors.hourly_rate && touched.hourly_rate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="hourly_rate" component="div" className="error-color" />
                                                </div>
                                            </div> */}
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                              <div className="custom-control custom-checkbox htmlForm-group">
                                <Field
                                  name="travel_option"
                                  type="checkbox"
                                  id="travel_option"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="travel_option"
                                >
                                  Willing to Travel?
                                </label>
                              </div>
                            </div>
                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="htmlForm-group">
                                                    <label htmlFor="short_description">Short Description</label>
                                                    <Field name="short_description" id="short_description" placeholder="Short description" rows="4" as="textarea" className={'form-control' + (errors.short_description && touched.short_description ? ' is-invalid' : '')} />
                                                </div>
                                            </div> */}
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="license_image">
                                  Part 107 or Temporary Certificate image *
                                </label>
                                <input
                                  ref={licenseInputRef}
                                  name="license_image"
                                  id="license_image"
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
                                    (errors.license_image &&
                                      touched.license_image
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="license_image"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="description">
                                  Description *
                                </label>
                                <Field
                                  name="description"
                                  id="description"
                                  placeholder="Description"
                                  rows="8"
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
                            </div>
                          </div>

                          <h6>Primary Location:</h6>
                          {/* {(values && values.address ? 
                          <h6><strong>{values.address}</strong></h6>
                          : ""
                          )} */}
                          <div className="row gutters">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="form-group">
                                <label>Enter your City *</label>
                                <SearchLocationInput
                                  locationString={values.address}
                                  className="form-control"
                                  name="address"
                                  placeholder="Enter Your Primary Location"
                                  locationSelect={(loc) => {
                                    setFieldValue("addressLocation", loc);
                                  }}
                                />
                                <ErrorMessage
                                  name="addressLocation"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="form-group">
                                <label>Zip (optional)</label>
                                <Field
                                  name="zip_code"
                                  id="zip_code"
                                  placeholder="Enter zip code"
                                  type="text"
                                  className={
                                    "form-control"
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="htmlForm-group">
                            <label htmlFor="instagram_name">Instagram Name</label>
                            <Field
                              name="instagram_name"
                              placeholder="Instagram Name"
                              type="text"
                              id="instagram_name"
                              className={"form-control" + (errors.instagram_name && touched.instagram_name ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="instagram_name" component="div" className="error-color" />
                          </div>

                          <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <h6 className="mt-3 mb-2 text-primary">
                                Search Engine Snippets
                              </h6>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="metatitle">Meta Title</label>
                                <Field
                                  name="metatitle"
                                  value={values.title.substring(0, 60)}
                                  placeholder="Meta title"
                                  disabled
                                  style={{
                                    opacity: 1,
                                    backgroundColor: "#eaecf4",
                                  }}
                                  type="text"
                                  id="metatitle"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="metakeyword">
                                  Meta Keyword{" "}
                                </label>
                                <Field
                                  name="metakeyword"
                                  value={selectedCategories
                                    .map((cat) => cat.skill_name)
                                    .join(",")
                                    .substring(0, 160)}
                                  placeholder="Meta keyword"
                                  disabled
                                  style={{
                                    opacity: 1,
                                    backgroundColor: "#eaecf4",
                                  }}
                                  type="text"
                                  id="metakeyword"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="metadescription">
                                  Meta Description{" "}
                                </label>
                                <Field
                                  name="metadescription"
                                  value={values.description.substring(0, 160)}
                                  rows="4"
                                  as="textarea"
                                  placeholder="Meta description"
                                  disabled
                                  style={{
                                    opacity: 1,
                                    backgroundColor: "#eaecf4",
                                  }}
                                  type="text"
                                  id="metadescription"
                                  className="form-control"
                                />
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

export default BuildProfile;
