import React, { useState, useEffect, useRef } from "react";
import { SERVER_URL, MEDIA_BASE_URL } from "../../../util/Constants";
import axios from "axios";
import Loader from "react-loader-spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { DisplayAddsInDashboardPages } from "../../../util/utils";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const PhotoGallery = () => {
  const fileInputRef = useRef();

  const { accessToken, userId } = useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [imageGallery, setImageGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const confirm = useConfirm();

  const dispatch = useDispatch();

  useEffect(() => {
    getAllImages();
    dispatch(getDashboardAds("pilot-photo-gallery"));
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
        "above-photo-gallery-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "gallery_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "gallery_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-photo-gallery-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "gallery_above_title_banner2_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "gallery_bottom_page2_banner_index"
      );
      
    }
  }, [getDashboardAds_data]);

  const getAllImages = async (showLoading) => {
    if (showLoading) {
      setIsLoading(true);
    }
    try {
      await fetch(`${SERVER_URL}/company-dashboard/gallery/show/${userId}`, {
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
          setIsLoading(false);
          setImageGallery(response.data);
        });
    } catch (error) {
      setFullPageLoading(false);
      setIsLoading(false);
    }
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = async (files) => {
    if (imageGallery.length > 9 || files.length > 10) {
      showToastError("You can not add more than 10 photos");
      return false;
    }
    let isAllFilesValid = true;
    for (let i = 0; i < files.length; i++) {
      let fileSizeInMB = files[i].size / (1024 * 1024);
      if (fileSizeInMB > 2) {
        showToastError(`file size must not exceed 2MB`);
        return;
      }
      if (!validateFile(files[i])) {
        showToastError(`file type not permitted`);
        isAllFilesValid = false;
        break;
      }
    }
    let listRequest = [];
    if (isAllFilesValid) {
      setFullPageLoading(true);
      for (let i = 0; i < files.length; i++) {
        let fields = {};
        const base64 = await convertBase64(files[i]);
        fields.image = base64;
        let data = {};
        data.gallery = [fields];
        listRequest.push(
          axios.post(`${SERVER_URL}/company-dashboard/gallery/${userId}`, data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
        );
      }
      uploadMultipleFiles(listRequest);
    }
  };
  const uploadMultipleFiles = (requests) => {
    showToast("Uploading image is in progress");
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          hideToast();
          showToastSuccess("Image uploaded successfully");
          getAllImages(true);
          setFullPageLoading(false);
          //props.fileUploadSuccess(true);
        })
      )
      .catch((error) => {
        // if there's an error, log it
        hideToast();
        console.log(error);
        /* if (error.response) {
                const errorCode = error.response.status;
                const errorMessage = error.response.statusText;
                showToastError(`${errorCode}: ${errorMessage}`);
                props.fileUploadSuccess(false);
            } */
      });
  };
  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    return validTypes.includes(file.type) && file.size > 0;
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

  const handleDeleteImage = (id) => {
    confirm({
      description: "You want to delete this image",
      confirmationButtonProps: {},
    })
      .then(async () => {
        setFullPageLoading(true);
        showToast("Deleting Image is in progress..");
        await axios
          .post(`${SERVER_URL}/company-dashboard/gallery/remove/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setFullPageLoading(false);
            hideToast();
            showToastSuccess("Image has been deleted Successfully");
            getAllImages();
          })
          .catch((error) => {
            setFullPageLoading(false);
            console.log(error);
          });
      })
      .catch(() => {
        console.log("not deleted");
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
          <i className="far fa-arrow-alt-circle-right"></i> Photo Gallery
        </h1>
      </div>
      <div className="row PilotPhotoGallery">
        <div className="col-12 text-left mb-3">
          <div className="card shadow px-4 py-4">
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="mb-4 text-primary">
                      Add photo(s) (max upto 10)
                    </h6>
                    <div className="PilotVideoGalleryArea">
                      <div className="dropzone" id="dropzone">
                        <div
                          className="ULd-flex ULjustify-content-center ULalign-items-center drop-container"
                          style={{ height: "100%" }}
                          onDragOver={dragOver}
                          onDragEnter={dragEnter}
                          onDragLeave={dragLeave}
                          onDrop={fileDrop}
                          onClick={fileInputClicked}
                        >
                          <div className="ulPd5rem">
                            <strong>Drop files here or click to upload</strong>
                          </div>
                          <input
                            ref={fileInputRef}
                            className="file-input"
                            accept=".png, .jpg, .jpeg"
                            type="file"
                            multiple
                            onChange={filesSelected}
                          />
                        </div>
                      </div>
                    </div>
                    <small>Only allowed extension: jpg, jpeg, png, webp</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 text-left mb-3">
          <div className="card shadow px-4 py-4">
            <h6 className="mb-3 text-primary">Photo Gallery Record List</h6>
            <div className="row">
              {imageGallery.length ? (
                imageGallery.map((image, index) => (
                  <div
                    key={`image-gallery-${index}`}
                    className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <div className="shadow mb-3">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Image
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
                              className="dropdown-item"
                              onClick={() =>
                                handleDeleteImage(image.gallery_id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-body GalleryImage">
                        <img
                          className="img-fluid"
                          src={`${MEDIA_BASE_URL}/${image.image}`}
                          width="100%"
                          alt="gallery"
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No images added yet.</div>
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

export default PhotoGallery;
