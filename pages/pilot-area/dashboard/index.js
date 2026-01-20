import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useAuthContext from "../../../hooks/useAuthContext";
import { SERVER_URL } from "../../../util/Constants";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import axios from "axios";
import Loader from "@/components/Common/Loader";
import Link from "next/link";
import {
  checkTokenExist,
  DisplayAddsInDashboardPages,
  generateRandomBannerIndex,
} from "../../../util/utils";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";
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
    await axios(`${SERVER_URL}/pilot-dashboard/index/${userId}`, {
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
          <Link href={`/pilot/${dashboardData.basic_profile.slug}`} legacyBehavior>
            <a
              rel="noreferrer"
              name="view-profile"
              className="m-0 btn action-button float-right"
              target="_blank"
            >
              View Profile
            </a>
          </Link>
        ) : null}
      </div>

      {isProfileBuild ? (
        <Aux>
          <div className="row">
            <div className="col-md-12">
              <div className="row PilotBox paddngtb40">
                <div className="col-sm-2">
                  <div className="PilotImg">
                    <Image
                      className="img-fluid"
                      src={dashboardData.basic_profile.profile_image}
                      alt={dashboardData.basic_profile.title}
                      width={200}
                      height={200}
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
                <div className="col-sm-7">
                  <div className="PilotInfo">
                    <h1>{name}</h1>
                    <p>
                      Member Since{" "}
                      {new Date(
                        dashboardData.basic_profile.created_at
                      ).getFullYear()}
                    </p>
                    <ul className="PilotDetails">
                      <li>{dashboardData.basic_profile.title}</li>
                    </ul>
                    {dashboardData.basic_profile.skills.length ? (
                      <ul className="PilotSkills">
                        {dashboardData.basic_profile.skills
                          .filter((value, index) => index < limitSkillNumber)
                          .map((skill, index) => (
                            <li key={`skill-${index}`}>
                              <span className="badge badge-warning">
                                {skill.skill_name}
                              </span>
                            </li>
                          ))}
                        {dashboardData.basic_profile.skills.length > 10 ? (
                          <li>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                changeLimitLabel(
                                  limitSkillNumber,
                                  dashboardData.basic_profile.skills.length
                                )
                              }
                            >
                              {limitSkillLabel}
                            </span>
                          </li>
                        ) : null}
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-sm-3 align-self-center">
                  <div className="PilotBoxContactDetails">
                    {/* {
                                                dashboardData.basic_profile.is_insured
                                                ?
                                                <Image className="img-fluid PilotVerified" src="/user-pilot/images/verifiedicon.png" alt="verified" width={20} height={20} />
                                                :
                                                null
                                            } */}

                    <p>
                      <a href={`tel:${dashboardData.basic_profile.mobile}`}>
                        <i className="fas fa-phone"></i>&nbsp;
                        {dashboardData.basic_profile.mobile}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${email}`}>
                        <i className="fas fa-envelope"></i> {email}
                      </a>
                    </p>
                  </div>
                  {dashboardData.basic_profile.license_image ? (
                    <Aux>
                      <Image
                        className="img-fluid PilotCard"
                        src={dashboardData.basic_profile.license_image}
                        alt="PilotCard"
                        width={200}
                        height={150}
                      />
                      <label>
                        This is only visible to the Droning Company admin
                      </label>
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
                            <Link href="/pilot-area/videos" legacyBehavior>
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
                          <Link href="/pilot-area/videos" legacyBehavior>
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
                                    src={photo.image}
                                    alt="01imgarticle"
                                    width={300}
                                    height={200}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="text-center">
                            <Link href="/pilot-area/gallery" legacyBehavior>
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
                          <Link href="/pilot-area/gallery" legacyBehavior>
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
              <div className="row mt-2 row-item">
                <div className="col-md-6 col-item">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Services Location
                      </h6>
                    </div>
                    <div className="card-body PilotServiceTable">
                      {dashboardData.service_location.length ? (
                        <Aux>
                          <div className="table-responsive">
                            <table
                              className="table table-bordered"
                              id="dataTable"
                              width="100%"
                              cellSpacing="0"
                            >
                              <thead>
                                <tr>
                                  <th>City</th>
                                  <th>State</th>
                                  <th>Country</th>
                                  <th>Zip Code</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dashboardData.service_location.map(
                                  (location, index) => (
                                    <tr key={`service-location-${index}`}>
                                      <td>{location.city}</td>
                                      <td>{location.state}</td>
                                      <td>{location.country}</td>
                                      <td>
                                        {location.zip_code
                                          ? location.zip_code
                                          : "-"}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="text-center">
                            <Link href="/pilot-area/service-location" legacyBehavior>
                              <a
                                id="add-location"
                                name="add-location"
                                className="btn action-button"
                              >
                                Check All
                              </a>
                            </Link>
                          </div>
                        </Aux>
                      ) : (
                        <div className="row">
                          <Link href="/pilot-area/service-location" legacyBehavior>
                            <a
                              id="add-location"
                              name="add-location"
                              className="btn action-button"
                            >
                              Add Location
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
                        Equipments Gallery
                      </h6>
                    </div>
                    <div className="card-body DashEquipmentsGallery">
                      {dashboardData.equipment.length ? (
                        <Aux>
                          <div className="row">
                            {dashboardData.equipment.map((equipment, index) => (
                              <div
                                key={`equipment-${index}`}
                                className={`${dashboardData.equipment.length < 2
                                  ? "col-md-12"
                                  : "col-md-6"
                                  } form-group`}
                              >
                                <Image
                                  className="img-fluid DashEqualImg"
                                  style={{ height: "auto" }}
                                  src={equipment.image}
                                  alt={equipment.title}
                                  width={300}
                                  height={200}
                                />
                                <ul className="EquipmentDetails">
                                  <li>
                                    Manufacturer:{" "}
                                    <b>{equipment.manufacturer}</b>
                                  </li>
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="text-center">
                            <Link href="/pilot-area/equipments" legacyBehavior>
                              <a
                                id="add-equipments"
                                name="add-equipments"
                                className="btn action-button"
                              >
                                Check All
                              </a>
                            </Link>
                          </div>
                        </Aux>
                      ) : (
                        <div className="row">
                          <Link href="/pilot-area/equipments" legacyBehavior>
                            <a
                              id="add-equipments"
                              name="add-equipments"
                              className="btn action-button"
                            >
                              Add Equipments
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
          <Link href="/pilot-area/build-profile" legacyBehavior>
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
