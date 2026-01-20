/* eslint-disable @next/next/no-img-element */
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
import {
  checkTokenExist,
  DisplayAddsInDashboardPages,
} from "../../../util/utils";
import axiosInstance from "../../../api/AxiosInstance";
import { toast } from "react-toastify";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";
import { useDispatch, useSelector } from "react-redux";

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

  const firstProfileImageRef = useRef();
  const secondProfileImageRef = useRef();
  const thirdProfileImageRef = useRef();
  const fourthProfileImageRef = useRef();
  const fifthProfileImageRef = useRef();
  const sixthProfileImageRef = useRef();

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

  const [firstProfileImage, setFirstProfileImage] = useState("");
  const [secondProfileImage, setSecondProfileImage] = useState("");
  const [thirdProfileImage, setThirdProfileImage] = useState("");
  const [fourthProfileImage, setFourthProfileImage] = useState("");
  const [fifthProfileImage, setFifthProfileImage] = useState("");
  const [sixthProfileImage, setSixthProfileImage] = useState("");

  const [removeFirstProfileImage, setRemoveFirstProfileImage] = useState(false);
  const [removeSecondProfileImage, setRemoveSecondProfileImage] = useState(false);
  const [removeThirdProfileImage, setRemoveThirdProfileImage] = useState(false);
  const [removeFourthProfileImage, setRemoveFourthProfileImage] = useState(false);
  const [removeFifthProfileImage, setRemoveFifthProfileImage] = useState(false);
  const [removeSixthProfileImage, setRemoveSixthProfileImage] = useState(false);

  const [profileData, setProfileData] = useState({
    title: "",
    travel_option: "",
    hourly_rate: "",
    short_description: "",
    description: "",
    metatitle: "",
    metakeyword: "",
    metadescription: "",
    services: [],
    license_image: "",
    home_location: '',
    address: '',
    city: '',
    suite: '',
    state: '',
    country: '',
    zip_code: '',
    email: '',
    phone: '',
    website: '',
    working_hours: '',
    contact_person: '',
    profile_img_1: '',
    profile_img_2: '',
    profile_img_3: '',
    profile_img_4: '',
    profile_img_5: '',
    profile_img_6: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    service_1: '',
    service_2: '',
    service_3: '',
    pic_desc_1: '',
    pic_desc_2: '',
    pic_desc_3: '',
    pic_desc_4: '',
    pic_desc_5: '',
    pic_desc_6: '',
    press_release_1: '',
    press_release_2: '',
    press_release_3: '',
    dc_articles: '',
  });
  const [location, setloaction] = useState('')


  const getPilotBasicProfileDetail = useCallback(async () => {
    try {
      setFullPageLoading(true);
      await fetch(
        `${SERVER_URL}/company-dashboard/basic-profile/show/${userId}`,
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
          //console.log(response);
          setFullPageLoading(false);
          if (response.statusCode === 200) {
            setProfileData(response.data);
            setPilotProfileImage(response.data.logo);
            setUserProfileImage(response.data.logo);
            setPilotLicenseImage(response.data.featured_image);
            setFirstProfileImage(response.data.profile_img_1);
            setSecondProfileImage(response.data.profile_img_2);
            setThirdProfileImage(response.data.profile_img_3);
            setFourthProfileImage(response.data.profile_img_4);
            setFifthProfileImage(response.data.profile_img_5);
            setSixthProfileImage(response.data.profile_img_6);
            setSelectedCategories(response.data.services);
            setloaction(response?.home_location);
            setCanEdit(true);
          } else {
            setPilotProfileImage("");
            setUserProfileImage("");
            setFirstProfileImage("");
            setSecondProfileImage("");
            setThirdProfileImage("");
            setFourthProfileImage("");
            setFifthProfileImage("");
            setSixthProfileImage("");
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
      await fetch(`${SERVER_URL}/services`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          //console.log(response);
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
    handleFiles(files, "feature_image", setFieldValue);
    //}
  };

  const profilePictureSelected = () => {
    if (profileInputRef.current.files.length) {
      handleFiles(profileInputRef.current.files, "profile");
    }
  };

  const firstProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "profile_img_1", setFieldValue);
  };
  const secondProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "profile_img_2", setFieldValue);
  };
  const thirdProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "profile_img_3", setFieldValue);
  };
  const fourthProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "profile_img_4", setFieldValue);
  };
  const fifthProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "profile_img_5", setFieldValue);
  };
  const sixthProfileImageSelected = (files, setFieldValue) => {
    handleFiles(files, "profile_img_6", setFieldValue);
  };

  const fileInputClicked = () => {
    profileInputRef.current.click();
  };

  const handleFiles = async (files, type, setFieldValue) => {
    const base64 = await convertBase64(files[0]);
    if (type === "profile") {
      setPilotProfileImage(base64);
      setImageNew(true);
    } else if (type === "profile_img_1") {
      setFieldValue("profile_img_1", base64);
      setFirstProfileImage(base64);
    } else if (type === "profile_img_2") {
      setFieldValue("profile_img_2", base64);
      setSecondProfileImage(base64);
    } else if (type === "profile_img_3") {
      setFieldValue("profile_img_3", base64);
      setThirdProfileImage(base64);
    } else if (type === "profile_img_4") {
      setFieldValue("profile_img_4", base64);
      setFourthProfileImage(base64);
    } else if (type === "profile_img_5") {
      setFieldValue("profile_img_5", base64);
      setFifthProfileImage(base64);
    } else if (type === "profile_img_6") {
      setFieldValue("profile_img_6", base64);
      setSixthProfileImage(base64);
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
          image_type: 2,
        });
        if (res?.data?.statusCode === 200) {
          setRemoveProfilePic(false);
          getPilotBasicProfileDetail();
          toast.success("Logo image removed successfully");
        } else {
          setRemoveProfilePic(false);
          toast.error("Something went wrong");
        }
      } else if (type === "profile_img_1") {
        res = await axiosInstance.post("profile/remove-picture", { user_id: userId, image_type: 41 });
        if (res?.data?.statusCode === 200) {
          getPilotBasicProfileDetail();
          setFirstProfileImage("");
          toast.success("First Profile image removed successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else if (type === "profile_img_2") {
        res = await axiosInstance.post("profile/remove-picture", { user_id: userId, image_type: 42 });
        if (res?.data?.statusCode === 200) {
          getPilotBasicProfileDetail();
          setSecondProfileImage("");
          toast.success("First Profile image removed successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else if (type === "profile_img_3") {
        res = await axiosInstance.post("profile/remove-picture", { user_id: userId, image_type: 43 });
        if (res?.data?.statusCode === 200) {
          getPilotBasicProfileDetail();
          setThirdProfileImage("");
          toast.success("Third Profile image removed successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else if (type === "profile_img_4") {
        res = await axiosInstance.post("profile/remove-picture", { user_id: userId, image_type: 44 });
        if (res?.data?.statusCode === 200) {
          getPilotBasicProfileDetail();
          setFourthProfileImage("");
          toast.success("Fourth Profile image removed successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else if (type === "profile_img_5") {
        res = await axiosInstance.post("profile/remove-picture", { user_id: userId, image_type: 45 });
        if (res?.data?.statusCode === 200) {
          getPilotBasicProfileDetail();
          setFifthProfileImage("");
          toast.success("Fifth Profile image removed successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else if (type === "profile_img_6") {
        res = await axiosInstance.post("profile/remove-picture", { user_id: userId, image_type: 46 });
        if (res?.data?.statusCode === 200) {
          getPilotBasicProfileDetail();
          setSixthProfileImage("");
          toast.success("Sixth Profile image removed successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        setRemoveLicensePic(true);
        res = await axiosInstance.post("profile/remove-picture", {
          user_id: userId,
          image_type: 3,
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
    dispatch(getDashboardAds("company-build-profile"));
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
      />{" "}
      <AddBannerComponent
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
                          className="img-profile"
                          src={
                            pilotProfileImg
                              ? pilotProfileImg
                              : profileImage
                                ? profileImage
                                : PROFILE_IMAGE
                          }
                          height={150}
                          width={150}
                          style={{ objectFit: "contain" }}
                          alt="Company Logo"
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
                              : "Remove Company Logo"}
                          </p>
                        )}

                      <h5 className="pilot-name">{name}</h5>
                      <h6 className="pilot-email">{email}</h6>
                    </div>
                    {pilotLicenseImg ? (
                      <div className="about-pilot">
                        <h5>Featured Image</h5>

                        {profileData?.license_image !== "" && (
                          <p
                            onClick={() => handleRemoveProfileImage("license")}
                            className="cursorPointer text-danger"
                            disabled={removelicensePic}
                          >
                            {removelicensePic
                              ? "Removing..."
                              : "Remove Featured Image"}
                          </p>
                        )}

                        <Image
                          src={pilotLicenseImg}
                          height={150}
                          width={200}
                          style={{ objectFit: "cover" }}
                          alt="Featured Image"
                        />
                      </div>
                    ) : null}

                    {profileData.description ? (
                      <div className="about-pilot">
                        <h5>About</h5>

                        <p style={{ whiteSpace: 'break-spaces' }}
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
                    travel_option: profileData.travel_option
                      ? profileData.travel_option
                      : false,
                    //hourly_rate: profileData.hourly_rate,
                    short_description: profileData.short_description,
                    description: profileData.hasOwnProperty("description") ? profileData.description : "",
                    metatitle: profileData.title,
                    metakeyword: profileData.metakeyword,
                    metadescription: profileData.metadescription,
                    jobCategory: profileData.services,
                    license_image: profileData.featured_image,
                    home_location: profileData?.home_location,
                    featured_image: profileData.featured_image,
                    address: profileData.address,
                    suite: profileData.suite,
                    city: profileData.city,
                    state: profileData.state,
                    country: profileData.country,
                    zip_code: profileData.zip_code,
                    email: profileData.email,
                    phone: profileData.phone,
                    website: profileData.website,
                    working_hours: profileData.working_hours,
                    contact_person: profileData.contact_person,
                    service_1: profileData.service_1,
                    service_2: profileData.service_2,
                    service_3: profileData.service_3,
                    facebook: profileData.facebook,
                    twitter: profileData.twitter,
                    linkedin: profileData.linkedin,
                    youtube: profileData.youtube,
                    instagram: profileData.instagram,
                    profile_img_1: profileData.profile_img_1,
                    profile_img_2: profileData.profile_img_2,
                    profile_img_3: profileData.profile_img_3,
                    profile_img_4: profileData.profile_img_4,
                    profile_img_5: profileData.profile_img_5,
                    profile_img_6: profileData.profile_img_6,
                    pic_desc_1: profileData.pic_desc_1,
                    pic_desc_2: profileData.pic_desc_2,
                    pic_desc_3: profileData.pic_desc_3,
                    pic_desc_4: profileData.pic_desc_4,
                    pic_desc_5: profileData.pic_desc_5,
                    pic_desc_6: profileData.pic_desc_6,
                    press_release_1: profileData.press_release_1,
                    press_release_2: profileData.press_release_2,
                    press_release_3: profileData.press_release_3,
                    dc_articles: profileData.dc_articles,
                  }}
                  validationSchema={Yup.object().shape({
                    title: Yup.string().required("Company Name is required"),
                    description: Yup.string().required("Description is required"),
                    //jobCategory: Yup.string().required("services field is required"),
                    license_image: Yup.string().required("Please upload your license photo"),
                    address: Yup.string().required("address is required"),
                    address: Yup.string().required("address is required"),
                    //suite:Yup.string().required("suite # is required"),
                    city: Yup.string().required("city is required"),
                    state: Yup.string().required("state is required"),
                    country: Yup.string().required("country is required"),
                    zip_code: Yup.string().required("zip code is required"),
                    email: Yup.string().required("email is required"),
                    phone: Yup.string().required("phone is required"),
                  })}
                  onSubmit={async (fields) => {
                    showToast("Updating your profile...");
                    //console.log(JSON.stringify(fields));
                    const formData = new FormData();
                    if (!canEditNow) {
                      formData.append("user_id", userId);
                    }
                    formData.append("title", fields.title);
                    formData.append("services", JSON.stringify(selectedCategories));
                    //formData.append("travel_option", fields.travel_option ? "Yes" : "No");
                    //formData.append('hourly_rate', fields.hourly_rate);
                    formData.append('short_description', fields.short_description);
                    formData.append("description", fields.description);
                    formData.append("address", fields.address);
                    formData.append("suite", fields.suite);
                    formData.append("city", fields.city);
                    formData.append("state", fields.state);
                    formData.append("country", fields.country);
                    formData.append("zip_code", fields.zip_code);
                    formData.append("contact_person", fields.contact_person);
                    formData.append("website", fields.website);
                    formData.append("email", fields.email);
                    formData.append("phone", fields.phone);
                    formData.append("working_hours", fields.working_hours);
                    formData.append("service_1", fields.service_1);
                    formData.append("service_2", fields.service_2);
                    formData.append("service_3", fields.service_3);
                    formData.append("facebook", fields.facebook);
                    formData.append("twitter", fields.twitter);
                    formData.append("linkedin", fields.linkedin);
                    formData.append("youtube", fields.youtube);
                    formData.append("instagram", fields.instagram);
                    formData.append("metatitle", fields.metatitle);
                    formData.append("metakeyword", fields.metakeyword);
                    formData.append("metadescription", fields.metadescription);
                    formData.append("license_image", fields.license_image);
                    formData.append("profile_img_1", fields.profile_img_1);
                    formData.append("profile_img_2", fields.profile_img_2);
                    formData.append("profile_img_3", fields.profile_img_3);
                    formData.append("profile_img_4", fields.profile_img_4);
                    formData.append("profile_img_5", fields.profile_img_5);
                    formData.append("profile_img_6", fields.profile_img_6);
                    formData.append("pic_desc_1", fields.pic_desc_1);
                    formData.append("pic_desc_2", fields.pic_desc_2);
                    formData.append("pic_desc_3", fields.pic_desc_3);
                    formData.append("pic_desc_4", fields.pic_desc_4);
                    formData.append("pic_desc_5", fields.pic_desc_5);
                    formData.append("pic_desc_6", fields.pic_desc_6);
                    formData.append("press_release_1", JSON.stringify(fields.press_release_1));
                    formData.append("press_release_2", JSON.stringify(fields.press_release_2));
                    formData.append("press_release_3", JSON.stringify(fields.press_release_3));
                    formData.append("dc_articles", JSON.stringify(fields.dc_articles));
                    if (isImageNew) {
                      formData.append("profile_image", pilotProfileImg);
                    }
                    let url = "";
                    if (canEditNow) {
                      formData.append("is_new_profile_image", isImageNew);
                      url = `${SERVER_URL}/company-dashboard/basic-profile/update/${userId}`;
                    } else {
                      url = `${SERVER_URL}/company-dashboard/basic-profile/create`;
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
                        //console.log(response.data);
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
                                Profile Details
                              </h6>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="title">Company Name *</label>
                                <Field
                                  name="title"
                                  placeholder="Enter Company Name"
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
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="address">Company Address *</label>
                                <Field
                                  name="address"
                                  placeholder="Enter Company Address"
                                  type="text"
                                  id="address"
                                  className={
                                    "form-control" +
                                    (errors.address && touched.address
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="address"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="suite">suite # *</label>
                                <Field name="suite" placeholder="Enter suite #" type="text" id="suite" className={"form-control" + (errors.suite && touched.suite ? " is-invalid" : "")} />
                                <ErrorMessage name="suite" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="city">City *</label>
                                <Field
                                  name="city"
                                  placeholder="Enter city"
                                  type="text"
                                  id="city"
                                  className={
                                    "form-control" +
                                    (errors.city && touched.city
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="state">State *</label>
                                <Field
                                  name="state"
                                  placeholder="Enter state"
                                  type="text"
                                  id="state"
                                  className={
                                    "form-control" +
                                    (errors.state && touched.state
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="state"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="country">Country *</label>
                                <Field
                                  name="country"
                                  placeholder="Enter country"
                                  type="text"
                                  id="country"
                                  className={
                                    "form-control" +
                                    (errors.country && touched.country
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="country"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="zip_code">Zip Code *</label>
                                <Field
                                  name="zip_code"
                                  placeholder="Enter zip code"
                                  type="text"
                                  id="zip_code"
                                  className={
                                    "form-control" +
                                    (errors.zip_code && touched.zip_code
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="zip_code"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="contact_person">Contact Person *</label>
                                <Field
                                  name="contact_person"
                                  placeholder="Enter Contact Person Name"
                                  type="text"
                                  id="contact_person"
                                  className={
                                    "form-control" +
                                    (errors.contact_person && touched.contact_person
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="contact_person"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="website">Website *</label>
                                <Field
                                  name="website"
                                  placeholder="Enter website"
                                  type="text"
                                  id="website"
                                  className={
                                    "form-control" +
                                    (errors.website && touched.website
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="website"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="email">Email *</label>
                                <Field
                                  name="email"
                                  placeholder="Enter email"
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

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="phone">Phone *</label>
                                <Field
                                  name="phone"
                                  placeholder="Enter phone"
                                  type="text"
                                  id="phone"
                                  className={
                                    "form-control" +
                                    (errors.phone && touched.phone
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="phone"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="description">Working Hours *</label>
                                <Field
                                  name="working_hours"
                                  id="working_hours"
                                  placeholder="Working Hours"
                                  rows="4"
                                  as="textarea"
                                  className={
                                    "form-control" +
                                    (errors.working_hours && touched.working_hours
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="working_hours"
                                  component="div"
                                  className="error-color"
                                />
                              </div>
                            </div>


                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label>Services</label>
                                <Multiselect
                                  showCheckbox={true}
                                  selectedValues={
                                    selectedCategories.length ===
                                    skillCategories.length
                                      ? [
                                          { title: "All", id: "*" },
                                          ...skillCategories,
                                        ]
                                      : selectedCategories
                                  }
                                  options={[
                                    { title: "All", id: "*" },
                                    ...skillCategories,
                                  ]} //{skillCategories}
                                  displayValue="title"
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
                                  placeholder="Select Services"
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
                            </div> */}

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="license_image">Featured Image *</label>
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


                            <div className="col-md-12"><h4>Social Media</h4><hr></hr></div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="facebook"><i className="fab fa-facebook-f"></i> Facebook</label>
                                <Field name="facebook" placeholder="Facebook URL" type="text" id="facebook" className={"form-control" + (errors.facebook && touched.facebook ? " is-invalid" : "")} />
                                <ErrorMessage name="facebook" component="div" className="error-color" />
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="twitter"><i className="fab fa-twitter"></i> Twitter</label>
                                <Field name="twitter" placeholder="Twitter URL" type="text" id="twitter" className={"form-control" + (errors.twitter && touched.twitter ? " is-invalid" : "")} />
                                <ErrorMessage name="twitter" component="div" className="error-color" />
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="linkedin"><i className="fab fa-linkedin"></i> LinkedIn</label>
                                <Field name="linkedin" placeholder="LinkedIn URL" type="text" id="linkedin" className={"form-control" + (errors.linkedin && touched.linkedin ? " is-invalid" : "")} />
                                <ErrorMessage name="linkedin" component="div" className="error-color" />
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="youtube"><i className="fab fa-youtube"></i> Youtube</label>
                                <Field name="youtube" placeholder="Youtube URL" type="text" id="youtube" className={"form-control" + (errors.youtube && touched.youtube ? " is-invalid" : "")} />
                                <ErrorMessage name="youtube" component="div" className="error-color" />
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="instagram"><i className="fab fa-instagram"></i> Instagram</label>
                                <Field name="instagram" placeholder="Instagram URL" type="text" id="instagram" className={"form-control" + (errors.instagram && touched.instagram ? " is-invalid" : "")} />
                                <ErrorMessage name="instagram" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-md-12"><h4>Services</h4><hr></hr></div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="service_1">Service 1</label>
                                <Field name="service_1" placeholder="Service 1" type="text" id="service_1" className={"form-control" + (errors.service_1 && touched.service_1 ? " is-invalid" : "")} />
                                <ErrorMessage name="service_1" component="div" className="error-color" />
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="service_2">Service 2</label>
                                <Field name="service_2" placeholder="Service 1" type="text" id="service_2" className={"form-control" + (errors.service_2 && touched.service_2 ? " is-invalid" : "")} />
                                <ErrorMessage name="service_2" component="div" className="error-color" />
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="service_3">Service 3</label>
                                <Field name="service_3" placeholder="Service 1" type="text" id="service_3" className={"form-control" + (errors.service_3 && touched.service_3 ? " is-invalid" : "")} />
                                <ErrorMessage name="service_3" component="div" className="error-color" />
                              </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="short_description">Short Description</label>
                                <Field name="short_description" id="short_description" placeholder="Short description" rows="4" as="textarea" className={'form-control' + (errors.short_description && touched.short_description ? ' is-invalid' : '')} />
                              </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="htmlForm-group">
                                <label htmlFor="description">Description *</label>
                                <Field
                                  name="description"
                                  id="description"
                                  placeholder="Description"
                                  rows="20"
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

                          <h4>In the Press</h4>
                          <hr></hr>
                          <div className="row gutters">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                <h4>Press Release 1</h4>
                                <hr></hr>
                                <div className="htmlForm-group">
                                  <label htmlFor="press_release_1_subject">Subject</label>
                                  <Field name="press_release_1.subject" id="press_release_1_subject" placeholder="Subject" type="text" className={'form-control'} />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="press_release_1_date">Date</label>
                                  <Field name="press_release_1.date" id="press_release_1_date" placeholder="Date" type="date" className={'form-control'} />
                                </div>
                                <div className="htmlForm-group">
                                  <Field name="press_release_1.content" id="press_release_1_content" placeholder="Add your press release URL or content here" rows="10" as="textarea" className={'form-control'} />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                <h4>Press Release 2</h4>
                                <hr></hr>
                                <div className="htmlForm-group">
                                  <label htmlFor="press_release_2_subject">Subject</label>
                                  <Field name="press_release_2.subject" id="press_release_2_subject" placeholder="Subject" type="text" className={'form-control'} />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="press_release_2_date">Date</label>
                                  <Field name="press_release_2.date" id="press_release_2_date" placeholder="Date" type="date" className={'form-control'} />
                                </div>
                                <div className="htmlForm-group">
                                  <Field name="press_release_2.content" id="press_release_2_content" placeholder="Add your press release URL or content here" rows="10" as="textarea" className={'form-control'} />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                <h4>Press Release 3</h4>
                                <hr></hr>
                                <div className="htmlForm-group">
                                  <label htmlFor="press_release_3_subject">Subject</label>
                                  <Field name="press_release_3.subject" id="press_release_3_subject" placeholder="Subject" type="text" className={'form-control'} />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="press_release_3_date">Date</label>
                                  <Field name="press_release_3.date" id="press_release_3_date" placeholder="Date" type="date" className={'form-control'} />
                                </div>
                                <div className="htmlForm-group">
                                  <Field name="press_release_3.content" id="press_release_3_content" placeholder="Add your press release URL or content here" rows="10" as="textarea" className={'form-control'} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <h4>Droning Company Articles</h4>
                          <hr></hr>
                          <div className="row gutters">
                            <div className="col-md-6">
                              <div className="profile_pic_box">
                                <h4>Droning Company Article 1</h4>
                                <hr></hr>
                                <div className="htmlForm-group">
                                  <label htmlFor="dc_articles_0_article">Article URL</label>
                                  <Field name="dc_articles.0.article" id="dc_articles_0_article" placeholder="Add your Droning Company Article URL here" rows="2" as="textarea" className={'form-control'} />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="profile_pic_box">
                                <h4>Droning Company Article 2</h4>
                                <hr></hr>
                                <div className="htmlForm-group">
                                  <label htmlFor="dc_articles_1_article">Article URL</label>
                                  <Field name="dc_articles.1.article" id="dc_articles_1_article" placeholder="Add your Droning Company Article URL here" rows="2" as="textarea" className={'form-control'} />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="profile_pic_box">
                                <h4>Droning Company Article 3</h4>
                                <hr></hr>
                                <div className="htmlForm-group">
                                  <label htmlFor="dc_articles_2_article">Article URL</label>
                                  <Field name="dc_articles.2.article" id="dc_articles_2_article" placeholder="Add your Droning Company Article URL here" rows="2" as="textarea" className={'form-control'} />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="profile_pic_box">
                                <h4>Droning Company Article 4</h4>
                                <hr></hr>
                                <div className="htmlForm-group">
                                  <label htmlFor="dc_articles_3_article">Article URL</label>
                                  <Field name="dc_articles.3.article" id="dc_articles_3_article" placeholder="Add your Droning Company Article URL here" rows="2" as="textarea" className={'form-control'} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row gutters">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {firstProfileImage ? (
                                  <div className="about-pilot">
                                    <Image
                                      src={firstProfileImage}
                                      height={200}
                                      width={300}
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="First Profile Image"
                                    />
                                    {profileData?.profile_img_1 !== "" && (
                                      <p
                                        onClick={() => handleRemoveProfileImage("profile_img_1")}
                                        className="cursorPointer text-danger"
                                        disabled={removeFirstProfileImage}
                                      >
                                        {removeFirstProfileImage ? "Removing..." : "Remove First Profile Image"}
                                      </p>
                                    )}
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="profile_img_1">Profile Image 1</label>
                                  <input
                                    ref={firstProfileImageRef}
                                    name="profile_img_1"
                                    id="profile_img_1"
                                    placeholder="Upload license photo"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => firstProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.profile_img_1 && touched.profile_img_1 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="profile_img_1" component="div" className="error-color" />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="pic_desc_1">Description</label>
                                  <Field name="pic_desc_1" id="pic_desc_1" placeholder="Profile Image 1 Description" rows="6" as="textarea" className={'form-control' + (errors.pic_desc_1 && touched.pic_desc_1 ? ' is-invalid' : '')} />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {secondProfileImage ? (
                                  <div className="about-pilot">
                                    <Image
                                      src={secondProfileImage}
                                      height={200}
                                      width={300}
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Second Profile Image"
                                    />
                                    {profileData?.profile_img_2 !== "" && (
                                      <p
                                        onClick={() => handleRemoveProfileImage("profile_img_2")}
                                        className="cursorPointer text-danger"
                                        disabled={removeSecondProfileImage}
                                      >
                                        {removeSecondProfileImage ? "Removing..." : "Remove Second Profile Image"}
                                      </p>
                                    )}
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="profile_img_2">Profile Image 2</label>
                                  <input
                                    ref={secondProfileImageRef}
                                    name="profile_img_2"
                                    id="profile_img_2"
                                    placeholder="Upload Second Profile Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => secondProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.profile_img_2 && touched.profile_img_2 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="profile_img_2" component="div" className="error-color" />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="pic_desc_2">Description</label>
                                  <Field name="pic_desc_2" id="pic_desc_2" placeholder="Profile Image 2 Description" rows="6" as="textarea" className={'form-control' + (errors.pic_desc_2 && touched.pic_desc_2 ? ' is-invalid' : '')} />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {thirdProfileImage ? (
                                  <div className="about-pilot">
                                    <Image
                                      src={thirdProfileImage}
                                      height={200}
                                      width={300}
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Third Profile Image"
                                    />
                                    {profileData?.profile_img_3 !== "" && (
                                      <p
                                        onClick={() => handleRemoveProfileImage("profile_img_3")}
                                        className="cursorPointer text-danger"
                                        disabled={removeThirdProfileImage}
                                      >
                                        {removeThirdProfileImage ? "Removing..." : "Remove Third Profile Image"}
                                      </p>
                                    )}
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="profile_img_3">Profile Image 3</label>
                                  <input
                                    ref={thirdProfileImageRef}
                                    name="profile_img_3"
                                    id="profile_img_3"
                                    placeholder="Upload Third Profile Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => thirdProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.profile_img_3 && touched.profile_img_3 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="profile_img_3" component="div" className="error-color" />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="pic_desc_3">Description</label>
                                  <Field name="pic_desc_3" id="pic_desc_3" placeholder="Profile Image 3 Description" rows="6" as="textarea" className={'form-control' + (errors.pic_desc_3 && touched.pic_desc_3 ? ' is-invalid' : '')} />
                                </div>
                              </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {fourthProfileImage ? (
                                  <div className="about-pilot">
                                    <Image
                                      src={fourthProfileImage}
                                      height={200}
                                      width={300}
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Fourth Profile Image"
                                    />
                                    <p
                                      onClick={() => handleRemoveProfileImage("profile_img_4")}
                                      className="cursorPointer text-danger"
                                      disabled={removeFourthProfileImage}
                                    >
                                      {removeFourthProfileImage ? "Removing..." : "Remove Fourth Profile Image"}
                                    </p>
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="profile_img_4">Profile Image 4</label>
                                  <input
                                    ref={fourthProfileImageRef}
                                    name="profile_img_4"
                                    id="profile_img_4"
                                    placeholder="Upload Fourth Profile Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => fourthProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.profile_img_4 && touched.profile_img_4 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="profile_img_4" component="div" className="error-color" />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="pic_desc_4">Description</label>
                                  <Field name="pic_desc_4" id="pic_desc_4" placeholder="Profile Image 4 Description" rows="6" as="textarea" className={'form-control' + (errors.pic_desc_4 && touched.pic_desc_4 ? ' is-invalid' : '')} />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {fifthProfileImage ? (
                                  <div className="about-pilot">
                                    <Image
                                      src={fifthProfileImage}
                                      height={200}
                                      width={300}
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Fifth Profile Image"
                                    />
                                    {profileData?.profile_img_5 !== "" && (
                                      <p
                                        onClick={() => handleRemoveProfileImage("profile_img_5")}
                                        className="cursorPointer text-danger"
                                        disabled={removeFifthProfileImage}
                                      >
                                        {removeFifthProfileImage ? "Removing..." : "Remove Fifth Profile Image"}
                                      </p>
                                    )}
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="profile_img_5">Profile Image 5</label>
                                  <input
                                    ref={fifthProfileImageRef}
                                    name="profile_img_5"
                                    id="profile_img_5"
                                    placeholder="Upload Fifth Profile Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => fifthProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.profile_img_5 && touched.profile_img_5 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="profile_img_5" component="div" className="error-color" />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="pic_desc_5">Description</label>
                                  <Field name="pic_desc_5" id="pic_desc_5" placeholder="Profile Image 5 Description" rows="6" as="textarea" className={'form-control' + (errors.pic_desc_5 && touched.pic_desc_5 ? ' is-invalid' : '')} />
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                              <div className="profile_pic_box">
                                {sixthProfileImage ? (
                                  <div className="about-pilot">
                                    <Image
                                      src={sixthProfileImage}
                                      height={200}
                                      width={300}
                                      style={{ objectFit: "cover", width: "100%" }}
                                      alt="Sixth Profile Image"
                                    />
                                    {profileData?.profile_img_6 !== "" && (
                                      <p
                                        onClick={() => handleRemoveProfileImage("profile_img_6")}
                                        className="cursorPointer text-danger"
                                        disabled={removeSixthProfileImage}
                                      >
                                        {removeSixthProfileImage ? "Removing..." : "Remove Sixth Profile Image"}
                                      </p>
                                    )}
                                  </div>
                                ) : null}
                                <div className="htmlForm-group">
                                  <label htmlFor="profile_img_6">Profile Image 6</label>
                                  <input
                                    ref={sixthProfileImageRef}
                                    name="profile_img_6"
                                    id="profile_img_6"
                                    placeholder="Upload Sixth Profile Image"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(event) => sixthProfileImageSelected(event.currentTarget.files, setFieldValue)}
                                    className={"form-control" + (errors.profile_img_6 && touched.profile_img_6 ? " is-invalid" : "")}
                                  />
                                  <ErrorMessage name="profile_img_6" component="div" className="error-color" />
                                </div>
                                <div className="htmlForm-group">
                                  <label htmlFor="pic_desc_6">Description</label>
                                  <Field name="pic_desc_6" id="pic_desc_6" placeholder="Profile Image 6 Description" rows="6" as="textarea" className={'form-control' + (errors.pic_desc_6 && touched.pic_desc_6 ? ' is-invalid' : '')} />
                                </div>
                              </div>
                            </div>

                          </div>
                          {/* <div className="row gutters">
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
                                    .map((cat) => cat.title)
                                    .join(",")
                                    .substring(0, 160)}
                                  placeholder="Meta keyword"
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
                          </div> */}
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
