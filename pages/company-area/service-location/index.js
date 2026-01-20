import React, { useState, useEffect, useCallback } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SERVER_URL } from "../../../util/Constants";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import Loader from "@/components/Common/Loader";
import SearchLocationInput, {
  loadScript,
} from "../../../components/SearchLocationInput/SearchLocationInput";
import { useConfirm } from "material-ui-confirm";
import { GOOGLE_API_KEY } from "../../../util/Constants";

import Script from "next/script";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import { DisplayAddsInDashboardPages } from "../../../util/utils";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const ServiceLocation = () => {
  const { accessToken, userId } = useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [serviceLocations, setServiceLocations] = useState([]);
  const [tableLoading, settableLoading] = useState(false);
  const confirm = useConfirm();
  const dispatch = useDispatch();

  useEffect(() => {
    getServiceLocationsDetail();
    dispatch(getDashboardAds("pilot-service-locations"));
  }, [getServiceLocationsDetail, dispatch]);

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
        "above-service-location-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "service_loaction_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "service_loaction_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-location-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "service_loaction_above_title2_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "service_loaction_bottom_page2_banner_index"
      );
    }
  }, [getDashboardAds_data]);

  const getServiceLocationsDetail = useCallback(async () => {
    setFullPageLoading(true);
    try {
      await fetch(`${SERVER_URL}/pilot-dashboard/service-area/show/${userId}`, {
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
          setServiceLocations(response.data);
          //   console.log(response);
        });
    } catch (error) {
      setFullPageLoading(false);
    }
  }, [userId, accessToken]);

  const getServiceLocationsDetailAfterAdd = useCallback(async () => {
    settableLoading(true);
    try {
      await fetch(`${SERVER_URL}/pilot-dashboard/service-area/show/${userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setServiceLocations(response.data);
          settableLoading(false);
          //   console.log(response);
        });
    } catch (error) {
      settableLoading(false);
    }
  }, [userId, accessToken]);

  const handleDeleteServiceLocation = (id, city) => {
    confirm({
      description: "You want to delete location- " + city,
      confirmationButtonProps: {},
    })
      .then(async () => {
        // setFullPageLoading(true);
        showToast("Deleting location is in progress..");
        await axios
          .post(`${SERVER_URL}/pilot-dashboard/service-area/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setFullPageLoading(false);
            showToastSuccess("Location has been deleted Successfully");
            getServiceLocationsDetailAfterAdd();
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

  //   useEffect(() => {
  //     loadScript(
  //       `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`
  //     );
  //   }, []);

  return (
    <>
      {fullPageLoading ? (
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
              <i className="far fa-arrow-alt-circle-right"></i> Service Location
            </h1>
          </div>

          <div className="row PilotServiceLocation">
            <div className="col-12 text-left mb-3">
              <div className="card shadow px-4 py-4">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        addressLocation: "",
                        zip_code: "",
                      }}
                      validationSchema={Yup.object().shape({
                        addressLocation: Yup.string().required(
                          "Location is required"
                        ),
                        /* zip_code: Yup.string()
                                            .required('Zip code is required'), */
                      })}
                      onSubmit={async (fields, { resetForm }) => {
                        showToast("Updating profile...");

                        delete fields.addressLocation;
                        let obj = {};

                        let dataObjHasValue = document
                          .getElementById("location-input")
                          .getAttribute("data-obj");

                        if (dataObjHasValue) {
                          obj = dataObjHasValue;
                        }

                        const location = JSON.parse(obj);
                        fields.city = location.city;
                        fields.state = location.state;
                        fields.country = location.country;

                        let data = {};
                        data.service_area = [fields];

                        await axios
                          .post(
                            `${SERVER_URL}/pilot-dashboard/service-area/${userId}`,
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
                            resetForm();
                            hideToast();
                            //setServiceLocations([...serviceLocations, ...data.service_area])
                            showToastSuccess(response.data.message);

                            getServiceLocationsDetailAfterAdd();
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
                          <div className="card h-100">
                            <div className="card-body">
                              <div className="row gutters">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                  <div className="form-group">
                                    <label>Enter your City</label>
                                    <SearchLocationInput
                                      //setInputLocation = {values.location}
                                      className="form-control"
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
                                      placeholder="Enter zip code"
                                      type="text"
                                      className={
                                        "form-control" +
                                        (errors.zip_code && touched.zip_code
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    {/* <ErrorMessage name="zip_code" component="div" className="error-color" /> */}
                                  </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                  <button
                                    type="submit"
                                    id="submit"
                                    name="submit"
                                    className="btn action-button float-left"
                                    disabled={isSubmitting}
                                  >
                                    Add Location
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                      <div className="card-header">
                        <h6 className="font-weight-bold text-primary float-left">
                          Service Locations Record List:
                        </h6>
                        {/* <form className="d-none d-sm-inline-block form-inline ml-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-darks border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form> */}
                      </div>

                      {tableLoading ? (
                        <div className="card-body">
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
                                visible={tableLoading}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="card-body">
                          {serviceLocations.length ? (
                            <div className="table-responsive">
                              <table
                                className="table table-bordered"
                                id="dataTable"
                                width="100%"
                                cellSpacing="0"
                              >
                                <thead>
                                  <tr>
                                    <th>Location</th>
                                    <th>Zip</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {serviceLocations.map((location, index) => (
                                    <tr key={location.city}>
                                      <td>{`${location.city}, ${location.state}, ${location.country}`}</td>
                                      <td>
                                        {location.zip_code
                                          ? location.zip_code
                                          : "-"}
                                      </td>
                                      <td className="ActionServiceLocation">
                                        <button
                                          className="btn btn-danger btn-circle btn-sm"
                                          onClick={() =>
                                            handleDeleteServiceLocation(
                                              location.service_id,
                                              location.city
                                            )
                                          }
                                        >
                                          {" "}
                                          <i className="fas fa-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div>No service location added yet.</div>
                          )}
                        </div>
                      )}
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
      )}
    </>
  );
};

export default ServiceLocation;
