import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "react-loader-spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import { SERVER_URL } from "../../../util/Constants";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import { DisplayAddsInDashboardPages } from "../../../util/utils";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const VideoGallery = () => {
  const { accessToken, userId } = useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [videoGallery, setVideoGallery] = useState([]);
  const [videoType, setVideoType] = useState("");
  const [position, setPosition] = useState("");
  const confirm = useConfirm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    getAllVideos();
    dispatch(getDashboardAds("pilot-video-gallery"));
  }, [userId]);

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
        "above-videos-gallery-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "video_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "video_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-video-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "video_above_title_banner2_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "video_bottom_page_banner2_index"
      );
    }
  }, [getDashboardAds_data]);

  const getAllVideos = async () => {
    setFullPageLoading(true);
    try {
      await fetch(`${SERVER_URL}/pilot-dashboard/reel-video/show/${userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setFullPageLoading(false);
          setVideoGallery(response.data);
        });
    } catch (error) {
      setFullPageLoading(false);
    }
  };

  const handleDeleteVideo = (id) => {
    confirm({
      description: "You want to delete this video",
      confirmationButtonProps: {},
    })
      .then(async () => {
        showToast("Deleting video...");
        await axios
          .post(`${SERVER_URL}/pilot-dashboard/reel-video/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            hideToast();
            showToastSuccess("Video has been deleted Successfully");
            getAllVideos();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        console.log("not deleted");
      });
  };

  const markAsMainVideo = async (id) => {
    setFullPageLoading(true);
    await axios
      .post(`${SERVER_URL}/pilot-dashboard/reel-video/mark-as-main/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        hideToast();
        showToastSuccess("Video marked to main has been done successfully");
        getAllVideos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // - Supported YouTube URL formats:
  //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
  //   - http://youtu.be/My2FRPA3Gf8
  //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
  // - Supported Vimeo URL formats:
  //   - http://vimeo.com/25451551
  //   - http://player.vimeo.com/video/25451551
  // - Also supports relative URLs:
  //   - //player.vimeo.com/video/25451551
  ///(https?\/\/)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  // const  parseYoutubeVideo = /(https:?\/\/)(www.)?(youtu(be\.com|\.be|be\.googleapis\.com))\/(watch|embed\/\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  // const  parseVimeoVideo = /(https:?\/\/)(player.)?(vimeo\.com))\/(video\/\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  const parseYoutubeVideo =
    /(https:?\/\/)(www.)?youtu(?:\.be|be\.com)\/(watch|embed\/\?v=|v\/)?([A-Za-z0-9_\-]+)/i;
  const parseVimeoVideo =
    /(https:?\/\/)(player.|www.)?vimeo.com\/(video\/|)([0-9a-z\-_]+)/i;
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
      />
       <AddBannerComponent
        data={getDashboardAds_data}
        status={getDashboardAds_status}
        position={above_title2_positon}
        index={above_title2_index}
      />
     
      <div className="DashHeading mb-3">
        <h1 className="h1 mb-3 text-black">
          <i className="far fa-arrow-alt-circle-right"></i> Videos Gallery
        </h1>
      </div>
      <div className="row PilotDashboardProfile">
        <div className="col-12 text-left mb-3">
          <div className="card shadow px-4 py-4">
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="mb-4 text-primary">
                      Add video(s) (max upto 10)
                    </h6>
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        video_type: "",
                        position: "",
                        video_url: "",
                      }}
                      validationSchema={Yup.object().shape({
                        video_type: Yup.string().required(
                          "Please select the video type"
                        ),
                        position: Yup.string().required(
                          "Please select the position"
                        ),
                        video_url: Yup.string()
                          .required("Video url is required")
                          .when("video_type", {
                            is: (val) => val === "Youtube",
                            then: Yup.string().matches(
                              parseYoutubeVideo,
                              "Not a valid youtube embed url"
                            ),
                            otherwise: Yup.string().matches(
                              parseVimeoVideo,
                              "Not a valid vimeo url"
                            ),
                          }),
                      })}
                      onSubmit={async (fields, { resetForm }) => {
                        if (videoGallery.length > 9) {
                          showToastError("You can not add more than 10 videos");
                          return false;
                        }
                        let data = {};
                        data.reel_video = [fields];
                        axios
                          .post(
                            `${SERVER_URL}/pilot-dashboard/reel-video/${userId}`,
                            data,
                            {
                              headers: {
                                Authorization: "Bearer " + accessToken,
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                              },
                            }
                          )
                          .then((response) => {
                            console.log(response.data);
                            resetForm();
                            hideToast();
                            //setVideoGallery([...videoGallery, ...data.service_area])
                            showToastSuccess("Video saved successfully");
                            getAllVideos();
                          })
                          .catch((error) => {
                            hideToast();
                            showToastError(error.response.data.message);
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
                        <Form>
                          <div className="PilotVideoGalleryArea">
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group VideoGalleryRadio">
                                  <label className="required">Video Type</label>

                                  <label>
                                    <Field
                                      type="radio"
                                      name="video_type"
                                      value="Youtube"
                                    />
                                    <span>You Tube</span>
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="video_type"
                                      value="Vimeo"
                                    />
                                    <span>Vimeo</span>
                                  </label>

                                  {/* <div className="custom-control custom-radio custom-control-inline">
                                                                    <Field type="radio" name="video_type" value="Youtube" className="custom-control-input" 
                                                                            checked={videoType === 'Youtube' ? true : false}
                                                                            onChange={setVideoType('Youtube')}
                                                                    />
                                                                    <label className="custom-control-label">You Tube</label>
                                                                </div>
                                                                <div className="custom-control custom-radio custom-control-inline">
                                                                    <Field type="radio" name="video_type" value="Vimeo" className="custom-control-input"
                                                                        checked={videoType === 'Vimeo' ? true : false}
                                                                        onChange={setVideoType('Vimeo')}
                                                                    />
                                                                    <label className="custom-control-label">Vimeo</label>
                                                                </div> */}
                                  <ErrorMessage
                                    name="video_type"
                                    component="div"
                                    className="error-color"
                                  />
                                  <div className="clearfix"></div>
                                  <label className="required">Position</label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="position"
                                      value="Main"
                                    />
                                    <span>Main</span>
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="position"
                                      value="Gallery"
                                    />
                                    <span>Gallery</span>
                                  </label>
                                  {/* <div className="custom-control custom-radio custom-control-inline">
                                                                    <Field type="radio" name="position" value="Main" className="custom-control-input"/>
                                                                    <label className="custom-control-label">Main</label>
                                                                </div>
                                                                <div className="custom-control custom-radio custom-control-inline">
                                                                    <Field type="radio" name="position" value="Gallery" className="custom-control-input"/>
                                                                    <label className="custom-control-label">Gallery</label>
                                                                </div> */}
                                  <ErrorMessage
                                    name="position"
                                    component="div"
                                    className="error-color"
                                  />
                                  <div className="clearfix"></div>
                                  <label htmlFor="video_url">
                                    Enter Video Url
                                  </label>
                                  <Field
                                    name="video_url"
                                    id="video_url"
                                    placeholder="Enter Video Url"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.video_url && touched.video_url
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="video_url"
                                    component="div"
                                    className="error-color"
                                  />
                                </div>
                              </div>
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    id="submit"
                                    name="submit"
                                    className="btn action-button float-left"
                                  >
                                    Add Video
                                  </button>
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
        </div>

        <div className="col-12 text-left mb-3">
          <div className="card shadow px-4 py-4">
            <h6 className="mb-3 text-primary">Videos Gallery Record List</h6>
            <div className="row">
              {videoGallery.length ? (
                videoGallery.map((video, index) => {
                  let videoUrl = "";
                  if (video.video_type === "Youtube") {
                    videoUrl = `https://www.youtube.com/embed/${video.video_key}`;
                  } else {
                    videoUrl = `https://player.vimeo.com/video/${video.video_key}`;
                  }
                  return (
                    <div
                      key={video.video_key}
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
                    >
                      <div className="shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            {video.video_type} ({video.position})
                          </h6>
                          <div className="dropdown no-arrow">
                            <a
                              className="dropdown-toggle"
                              href="#"
                              role="button"
                              id="dropdownMenuLink"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v fa-sm fa-fw text-primary"></i>
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <button
                                type="button"
                                className="dropdown-item"
                                onClick={() =>
                                  handleDeleteVideo(video.pilot_video_id)
                                }
                              >
                                Delete
                              </button>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  markAsMainVideo(video.pilot_video_id)
                                }
                              >
                                Mark as Main Video
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <iframe
                            width="100%"
                            height="200"
                            src={videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen="true"
                            webkitallowfullscreen="true"
                            mozallowfullscreen="true"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-sm-12">No videos added yet.</div>
              )}
            </div>
            {/* <nav className="text-center mt-5" aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center paddngt">
                                        <li className="page-item disabled"><a className="page-link" href="#" tabindex="-1">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                        </nav> */}
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

export default VideoGallery;
