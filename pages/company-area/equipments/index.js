import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SERVER_URL } from "../../../util/Constants";
import useAuthContext from "../../../hooks/useAuthContext";
import Loader from "@/components/Common/Loader";
import axios from "axios";
import useToastContext from "../../../hooks/useToastContext";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import { DisplayAddsInDashboardPages } from "../../../util/utils";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const Equipment = () => {
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  const { accessToken, userId } = useAuthContext();
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [equipmentImage, setEquipmentImage] = useState(null);
  const fileInputRef = useRef();
  const confirm = useConfirm();
  const [isEdit, setIsEdit] = useState(false);
  const [isImageNew, setIsImageNew] = useState(false);
  const [equipmentData, setEquipmentData] = useState({
    title: "",
    manufacturer: "",
    image: "",
    equipment_id: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getAllEquipments();
    dispatch(getDashboardAds("pilot-my-equipment"));
  }, [getAllEquipments, dispatch]);

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
        "above-my-equipment-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "euipment_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "euipment_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-my-equipment-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "euipment_above_title2_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "euipment_bottom_page2_banner_index"
      );

    }
  }, [getDashboardAds_data]);

  const getAllEquipments = useCallback(async () => {
    try {
      setFullPageLoading(true);
      await fetch(`${SERVER_URL}/pilot-dashboard/equipment/show/${userId}`, {
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
          console.log(response);
          setEquipments(response.data);
        });
    } catch (error) {
      setFullPageLoading(false);
    }
  }, [userId, accessToken]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e, setFieldValue) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files, setFieldValue);
    }
  };

  const filesSelected = (setFieldValue) => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files, setFieldValue);
    }
  };
  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = async (files, setFieldValue) => {
    let isAllFilesValid = true;
    for (let i = 0; i < files.length; i++) {
      if (!validateFile(files[i])) {
        console.log(files[i]);
        showToastError(`file type not permitted`);
        isAllFilesValid = false;
        break;
      }
    }

    if (isAllFilesValid) {
      for (let i = 0; i < files.length; i++) {
        const base64 = await convertBase64(files[i]);
        setFieldValue("image", base64);
        setEquipmentImage(base64);
        if (isEdit) {
          setIsImageNew(true);
        }
      }
      //uploadMultipleFiles(listRequest);
    }
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

  const handleDeleteEquipment = (id, title) => {
    confirm({
      description: "You want to delete equipment - " + title,
      confirmationButtonProps: {},
    })
      .then(async () => {
        showToast("Deleting equipment...");
        setFullPageLoading(true);
        await axios
          .post(`${SERVER_URL}/pilot-dashboard/equipment/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setEquipmentData({
              title: "",
              manufacturer: "",
              image: "",
              equipment_id: "",
            });
            setIsEdit(false);
            setFullPageLoading(false);
            setEquipmentImage(null);
            hideToast();
            showToastSuccess("Equipment has been deleted Successfully");
            getAllEquipments();
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

  const handleEditEquipment = (data) => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    setIsEdit(true);
    setEquipmentData(data);
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
          <i className="far fa-arrow-alt-circle-right"></i> My Equipment
        </h1>
      </div>

      <div className="row PilotDashboardProfile">
        <div className="col-12 text-left mb-5">
          <div className="card shadow px-4 py-4">
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mb-5">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="EquipmentAddForm">
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 className="mb-4 text-primary">
                            Add Equipment (max upto 5)
                          </h6>
                        </div>
                        <Formik
                          enableReinitialize={true}
                          initialValues={{
                            title: equipmentData.title
                              ? equipmentData.title
                              : "",
                            manufacturer: equipmentData.manufacturer
                              ? equipmentData.manufacturer
                              : "",
                            image: equipmentData.image
                              ? equipmentData.image
                              : "",
                          }}
                          validationSchema={Yup.object().shape({
                            title: Yup.string().required(
                              "Equipment title is required"
                            ),
                            manufacturer: Yup.string().required(
                              "Equipment manufacturer is required"
                            ),
                            image: Yup.string().required(
                              "Equipment image is required"
                            ),
                          })}
                          onSubmit={async (fields, { resetForm }) => {
                            let url = `${SERVER_URL}/pilot-dashboard/equipment/create/${userId}`;
                            if (isEdit) {
                              showToast("Updating equipment is in progress..");
                              url = `${SERVER_URL}/pilot-dashboard/equipment/update/${userId}`;
                              if (isImageNew) {
                                fields.is_new_image = true;
                              } else {
                                fields.is_new_image = false;
                              }
                              fields.equipment_id = equipmentData.equipment_id;
                            } else {
                              if (equipments.length > 4) {
                                showToastError(
                                  "You can not add more than 5 equipments"
                                );
                                return;
                              }
                              showToast("Adding equipment is in progress..");
                            }

                            axios
                              .post(url, fields, {
                                headers: {
                                  Authorization: "Bearer " + accessToken,
                                  "Content-Type": "application/json",
                                  "Access-Control-Allow-Origin": "*",
                                },
                              })
                              .then((response) => {
                                console.log(response.data);
                                resetForm();
                                hideToast();
                                setEquipmentImage(null);
                                getAllEquipments();
                                if (isEdit) {
                                  showToastSuccess(
                                    "Equipment updated successfully"
                                  );
                                  setEquipmentData({
                                    title: "",
                                    manufacturer: "",
                                    image: "",
                                    equipment_id: "",
                                  });
                                } else {
                                  showToastSuccess(
                                    "Equipment added successfully"
                                  );
                                }
                                setIsEdit(false);
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
                            <Form className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="row">
                                <div className="col-sm-6">
                                  <div
                                    className="PilotVideoGalleryArea"
                                    style={{ position: "relative" }}
                                  >
                                    <div className="dropzone" id="dropzone">
                                      <div
                                        className="ULd-flex ULjustify-content-center ULalign-items-center drop-container"
                                        style={{ height: "100%" }}
                                        onDragOver={dragOver}
                                        onDragEnter={dragEnter}
                                        onDragLeave={dragLeave}
                                        onDrop={(e) =>
                                          fileDrop(e, setFieldValue)
                                        }
                                        onClick={fileInputClicked}
                                      >
                                        {equipmentImage ||
                                          equipmentData.image ? (
                                          <Image
                                            src={
                                              equipmentImage
                                                ? equipmentImage
                                                : equipmentData.image
                                                  ? equipmentData.image
                                                  : equipmentImage
                                            }
                                            height={140}
                                            width={200}
                                            alt="preview"
                                            style={{ borderRadius: "10px", objectFit: 'contain' }}
                                          />
                                        ) : (
                                          <div className="ulPd5rem">
                                            <strong>
                                              Drop files here or click to upload
                                            </strong>
                                          </div>
                                        )}

                                        <input
                                          ref={fileInputRef}
                                          className="file-input"
                                          accept=".png, .jpg, .jpeg"
                                          type="file"
                                          onChange={() =>
                                            filesSelected(setFieldValue)
                                          }
                                        />
                                      </div>
                                    </div>
                                    {/* <div className="cover-button" onClick={fileInputClicked}><i className="far fa-image"></i>Add Equipment Image</div> */}
                                  </div>
                                  <ErrorMessage
                                    name="image"
                                    component="div"
                                    className="error-color"
                                  />
                                  <small>
                                    Only allowed extension: jpg, jpeg, png, webp
                                  </small>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                  <div className="form-group">
                                    <label htmlFor="EquipmentTitle">
                                      Equipment Title
                                    </label>
                                    <Field
                                      name="title"
                                      placeholder="Enter equipment title"
                                      type="text"
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
                                  <div className="form-group">
                                    <label htmlFor="Manufacturer">
                                      Manufacturer
                                    </label>
                                    <Field
                                      name="manufacturer"
                                      placeholder="Enter equipment manufacturer"
                                      type="text"
                                      className={
                                        "form-control" +
                                        (errors.manufacturer &&
                                          touched.manufacturer
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="manufacturer"
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor="EquipmentTitle">Equipment Title</label>
                                                <input type="text" className="form-control" id="EquipmentTitle" placeholder="Equipment Title" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor="Manufacturer">Manufacturer</label>
                                                <input type="text" className="form-control" id="Manufacturer" placeholder="Manufacturer" />
                                            </div>
                                        </div> */}
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    id="submit"
                                    name="submit"
                                    className="btn action-button"
                                  >
                                    {isEdit ? "Update" : "Submit"}
                                  </button>
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
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-4 text-primary">
                          Equipments Record List
                        </h6>
                      </div>
                    </div>
                    <div className="row gutters">
                      {equipments.length ? (
                        equipments.map((equipment, index) => {
                          return (
                            <div
                              key={`equipment-${index}`}
                              className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 form-group"
                            >
                              <div className="shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                  <h6 className="m-0 font-weight-bold text-primary">
                                    {equipment.title}
                                  </h6>
                                  <div className="dropdown no-arrow">
                                    <button
                                      className="btn btn-link p-0 dropdown-toggle"
                                      type="button"
                                      id="dropdownMenuLink"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                      aria-labelledby="dropdownMenuLink"
                                    >
                                      <div className="dropdown-header">
                                        Action
                                      </div>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleDeleteEquipment(
                                            equipment.equipment_id,
                                            equipment.title
                                          )
                                        }
                                      >
                                        Delete
                                      </button>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleEditEquipment(equipment)
                                        }
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="EquipmentImg">
                                    <div
                                      className="form-group ULd-flex ULjustify-content-center ULalign-items-center"
                                      style={{ minHeight: "200px" }}
                                    >
                                      <Image
                                        className="img-fluid"
                                        style={{ maxHeight: "200px", objectFit: 'contain' }}
                                        src={equipment.image}
                                        alt={equipment.title}
                                        width={200}
                                        height={200}
                                      />
                                    </div>
                                    <ul className="EquipmentDetails">
                                      <li>
                                        Manufacturer:{" "}
                                        <b>{equipment.manufacturer}</b>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-sm-12">
                          No equipments added yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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

export default Equipment;
