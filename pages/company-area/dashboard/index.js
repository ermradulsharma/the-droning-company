import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useAuthContext from "../../../hooks/useAuthContext";
import { SERVER_URL, MEDIA_BASE_URL } from "../../../util/Constants";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import axios from "axios";
import Loader from "@/components/Common/Loader";
import Link from "next/link";
import {
  checkTokenExist,
  DisplayAddsInDashboardPages,
  generateRandomBannerIndex,
  getCleanImageUrl,
} from "../../../util/utils";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import useToastContext from "../../../hooks/useToastContext";
// export const getServerSideProps = async function ({ req, res }) {
//     console.log(checkTokenExist())
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

const DashboardMain = () => {
  const {
    accessToken,
    userId,
    name,
    title,
    email,
    setVerifyEmail,
    setUserProfileImage,
    profileImage,
  } = useAuthContext();
  const [dashboardData, setDashboardData] = useState({
    basic_profile: {},
    equipment: [],
    gallery: [],
    reel_video: [],
    service_location: [],
  });
  const [isProfileBuild, setProfileBuild] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [limitSkillNumber, setLimitSkillNumber] = useState(10);
  const [limitSkillLabel, setLimitSkillLabel] = useState("Show more");
  const dispatch = useDispatch();
  let history = useRouter();
  const changeLimitLabel = (limit, total) => {
    if (limit === 10) {
      setLimitSkillLabel("Show less");
      setLimitSkillNumber(total);
    } else {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      setLimitSkillLabel("Show more");
      setLimitSkillNumber(10);
    }
  };

  const getDasboardDetail = useCallback(async () => {
    await axios(`${SERVER_URL}/company-dashboard/index/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        setFullPageLoading(false);
        console.log(response.data.data);
        if (response.data.statusCode === 200) {
          setDashboardData(response.data.data);
          setProfileBuild(true);
        }
        if (response.data.email_verified_at) {
          setVerifyEmail(response.data.email_verified_at);
        }
      })
      .catch((error) => {
        console.log(error);
        setFullPageLoading(false);
        setProfileBuild(false);
      });
  }, [userId, accessToken, setVerifyEmail]);

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
    getDasboardDetail();
    dispatch(getDashboardAds("pilot-dashboard"));
  }, [getDasboardDetail, dispatch]);

  useEffect(() => {
    if (getDashboardAds_data) {
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-dashboard-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "dashboard_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "dashboard_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-dashboard-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "dashboard_above_title2_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "dashboard_bottom_page2_banner_index"
      );




      // let aboveTitle_index = getDashboardAds_data?.findIndex(
      //   (item) => item?.section_name_slug === "under-banner"
      // );

      // let belowPage_index = getDashboardAds_data?.findIndex(
      //   (item) => item?.section_name_slug === "above-banner"
      // );

      // //fixed position

      // setAboveTitlePosition(aboveTitle_index);
      // setBottomPagePosition(belowPage_index);

      // //index
      // setAboveTitleIndex(
      //   generateRandomBannerIndex(
      //     "dashboard_above_title_banner_index",
      //     getDashboardAds_data[aboveTitle_index]?.banner?.length
      //   )
      // );

      // setBottomPageIndex(
      //   generateRandomBannerIndex(
      //     "dashboard_bottom_page_banner_index",
      //     getDashboardAds_data[belowPage_index]?.banner?.length
      //   )
      // );
    }
  }, [getDashboardAds_data]);

  const confirm = useConfirm();
  const { showToast, hideToast, showToastSuccess, showToastError } = useToastContext();
  const handleDeleteProfile = (id) => {
    console.log(id);
    confirm({
      description: "You want to delete this Profile",
      confirmationButtonProps: {},
    })
      .then(async () => {
        setFullPageLoading(true);
        showToast("Deleting Profile is in progress..");
        await axios
          .post(`${SERVER_URL}/company-dashboard/profile/remove/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            hideToast();
            showToastSuccess("Profile has been deleted Successfully");
            history.push('/logout');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        console.log("Profile not deleted");
      });
  };

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
    <div className="container-fluid DashPilotMain">
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
      <div className="DashHeading mb-3">
        <h1 className="h1 pt-1 mb-3 text-black float-left">
          <i className="far fa-arrow-alt-circle-right"></i> Dashboard
        </h1>
        {isProfileBuild ? (
          <div className="company-profile-actions">
            <button
              style={{ background: "#f00000", color: "#ffffff" }}
              onClick={() => handleDeleteProfile(dashboardData.basic_profile.company_id)}
              rel="noreferrer"
              className="m-0 btn action-button danger float-right mx-1"
            >
              Delete Profile
            </button>

            <Link href={`/company/${dashboardData.basic_profile.slug}`} legacyBehavior>
              <a
                href={`/company/${dashboardData.basic_profile.slug}`}
                rel="noreferrer"
                name="view-profile"
                className="m-0 btn action-button float-right mx-1"
                target="_blank"
              >
                View Profile
              </a>
            </Link>
            <Link href={`/company-area/build-profile`} legacyBehavior>
              <a
                href={`/company-area/build-profile`}
                rel="noreferrer"
                name="edit-profile"
                className="m-0 btn action-button float-right mx-1"
              >
                Edit Profile
              </a>
            </Link>
            <Link href={`/company-area/change-password`} legacyBehavior>
              <a
                href={`/company-area/change-password`}
                rel="noreferrer"
                name="change-password"
                className="m-0 btn action-button float-right mx-1"
              >
                Change Password
              </a>
            </Link>
          </div>
        ) : null}
      </div>

      {isProfileBuild ? (
        <Aux>
          <div className="row">
            <div className="col-md-12">
              <div className="row mb-4">
                <div className="col-sm-3">
                  <div className="companyLogo">
                    <Image
                      className="img-fluid"
                      src={getCleanImageUrl(dashboardData.basic_profile.logo)}
                      alt={dashboardData.basic_profile.title}
                      width={200}
                      height={200}
                      style={{ objectFit: 'contain' }}
                    />
                    {dashboardData.basic_profile.is_certified === "Yes" ? (
                      <span className="BadageImg">
                        <Image
                          className="img-fluid"
                          src="/images/badage.png"
                          alt="badage"
                          width={40}
                          height={40}
                        />
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="PilotInfo">
                    <h1>{dashboardData.basic_profile.title}</h1>
                    <div>
                      Member Since{" "}
                      {new Date(
                        dashboardData.basic_profile.created_at
                      ).getFullYear()}
                    </div>
                    <ul className="PilotDetails">

                    </ul>

                    <ul className="PilotSkills">
                      {dashboardData.basic_profile && dashboardData.basic_profile.service_1 ? (<li><span className="badge badge-warning">{dashboardData.basic_profile.service_1}</span></li>) : ("")}
                      {dashboardData.basic_profile && dashboardData.basic_profile.service_2 ? (<li><span className="badge badge-warning">{dashboardData.basic_profile.service_2}</span></li>) : ("")}
                      {dashboardData.basic_profile && dashboardData.basic_profile.service_3 ? (<li><span className="badge badge-warning">{dashboardData.basic_profile.service_3}</span></li>) : ("")}
                    </ul>

                    {/* {dashboardData.basic_profile.services.length ? (
                      <ul className="PilotSkills">
                        {dashboardData.basic_profile.services
                          .filter((value, index) => index < limitSkillNumber)
                          .map((service, index) => (
                            <li key={`service-${index}`}>
                              <span className="badge badge-warning">
                                {service.title}
                              </span>
                            </li>
                          ))}
                        {dashboardData.basic_profile.services.length > 10 ? (
                          <li>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                changeLimitLabel(
                                  limitSkillNumber,
                                  dashboardData.basic_profile.services.length
                                )
                              }
                            >
                            {limitSkillLabel}
                            </span>
                          </li>
                        ) : null}
                      </ul>
                    ) : null} */}

                    <div className="CompanyBoxContactDetails">
                      <p>
                        <a href={`tel:${dashboardData.basic_profile.phone}`}>
                          <i className="fas fa-phone"></i>&nbsp;
                          {dashboardData.basic_profile.phone}
                        </a>
                      </p>
                      <p>
                        <a href={`mailto:${email}`}>
                          <i className="fas fa-envelope"></i> {email}
                        </a>
                      </p>
                    </div>

                    <ul className="SocialLinks company-social">
                      {dashboardData.basic_profile && dashboardData.basic_profile.facebook ? (
                        <li><a href={dashboardData.basic_profile.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      ) : ("")}
                      {dashboardData.basic_profile && dashboardData.basic_profile.twitter ? (
                        <li><a href={dashboardData.basic_profile.twitter} target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                      ) : ("")}
                      {dashboardData.basic_profile && dashboardData.basic_profile.linkedin ? (
                        <li><a href={dashboardData.basic_profile.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a></li>
                      ) : ("")}
                      {dashboardData.basic_profile && dashboardData.basic_profile.instagram ? (
                        <li><a href={dashboardData.basic_profile.instagram} target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                      ) : ("")}
                      {dashboardData.basic_profile && dashboardData.basic_profile.youtube ? (
                        <li><a href={dashboardData.basic_profile.youtube} target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                      ) : ("")}
                    </ul>

                  </div>
                </div>
                <div className="col-sm-4 align-self-center">
                  {dashboardData.basic_profile.featured_image ? (
                    <Aux>
                      <Image
                        className="img-fluid PilotCard"
                        src={getCleanImageUrl(dashboardData.basic_profile.featured_image)}
                        alt="featured_image"
                        width={400}
                        height={300}
                        style={{ width: "100%", height: "400px", maxHeight: "300px", objectFit: 'cover', border: "1px solid #000" }}
                      />
                    </Aux>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="row row-item">
                <div className="col-md-6 col-item">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Videos Gallery
                      </h6>
                    </div>
                    <div className="card-body DashVideoGallery">
                      {dashboardData.reel_video.length ? (
                        <Aux>
                          <div className="row">
                            {dashboardData.reel_video.map((video, index) => {
                              let videoUrl = "";
                              if (video.video_type === "Youtube") {
                                videoUrl = `https://www.youtube.com/embed/${video.video_key}`;
                              } else {
                                videoUrl = `https://player.vimeo.com/video/${video.video_key}`;
                              }
                              return (
                                <div
                                  key={`video-reel-${index}`}
                                  className={`${dashboardData.reel_video.length < 2
                                    ? "col-md-12"
                                    : "col-md-6"
                                    } form-group`}
                                >
                                  <iframe
                                    width="100%"
                                    height="200"
                                    src={
                                      videoUrl
                                    } /* style={{minWidth:'610px'}} */
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen="true"
                                    webkitallowfullscreen="true"
                                    mozallowfullscreen="true"
                                  ></iframe>
                                </div>
                              );
                            })}
                          </div>
                          <div className="text-center">
                            <Link href="/company-area/videos" legacyBehavior>
                              <a
                                id="add-video"
                                name="add-video"
                                className="btn action-button"
                              >
                                Check All
                              </a>
                            </Link>
                          </div>
                        </Aux>
                      ) : (
                        <div className="row">
                          <Link href="/company-area/videos" legacyBehavior>
                            <a
                              id="add-video"
                              name="add-video"
                              className="btn action-button"
                            >
                              Add Video
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-item">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Photo Gallery
                      </h6>
                    </div>
                    <div className="card-body DashPhotoGallery">
                      {dashboardData.gallery.length ? (
                        <Aux>
                          <div className="row">
                            {dashboardData.gallery.map((photo, index) => {
                              return (
                                <div
                                  key={`photo-gallery-${index}`}
                                  className={`${dashboardData.gallery.length < 2
                                    ? "col-md-12"
                                    : "col-md-6"
                                    } form-group`}
                                >
                                  <Image
                                    className="img-fluid DashEqualImg"
                                    src={`${MEDIA_BASE_URL}/${getCleanImageUrl(photo.image)}`}
                                    alt="01imgarticle"
                                    width={300}
                                    height={200}
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="text-center">
                            <Link href="/company-area/gallery" legacyBehavior>
                              <a
                                id="photo-gallery"
                                name="photo-gallery"
                                className="btn action-button"
                              >
                                Check All
                              </a>
                            </Link>
                          </div>
                        </Aux>
                      ) : (
                        <div className="row">
                          <Link href="/company-area/gallery" legacyBehavior>
                            <a
                              id="add-photo"
                              name="add-photo"
                              className="btn action-button"
                            >
                              Add Photo
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Aux>
      ) : (
        <div
          style={{ minHeight: "400px" }}
          className="flex-row align-items-center justify-content-between"
        >
          <Link href="/company-area/build-profile" legacyBehavior>
            <a className="btn action-button" style={{ width: "auto" }}>
              Build your profile
            </a>
          </Link>
        </div>
      )}

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

export default DashboardMain;
