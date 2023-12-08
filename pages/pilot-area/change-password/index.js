import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SERVER_URL } from "../../../util/Constants";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import { useDispatch, useSelector } from "react-redux";
import { DisplayAddsInDashboardPages } from "../../../util/utils";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const ChangePassword = () => {
  const { accessToken, userId } = useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();

    

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardAds("pilot-change-password"));
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
        "above-settings-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "change_password_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "change_password_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-change-password-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "change_password_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "change_password_bottom_page_banner_index"
      );

    }
  }, [getDashboardAds_data]);

  return (
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

      <div className="d-sm-flex align-items-center justify-content-between mb-4 DashHeading">
        <h2 className="h2 mb-0 text-black">
          <i className="far fa-arrow-alt-circle-right"></i> Settings
        </h2>
        <Link href="/user/create-job">
          <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-plus fa-sm text-white-50"></i> Create a Job
          </a>
        </Link>
      </div>
      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          confirm_new_password: "",
        }}
        validationSchema={Yup.object().shape({
          old_password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          new_password: Yup.string()
            .min(6, "New Password must be at least 6 characters")
            .required("New Password is required"),
          confirm_new_password: Yup.string()
            .oneOf([Yup.ref("new_password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={async (fields) => {
          delete fields.confirm_new_password;
          fields.user_id = userId;
          await axios
            .post(`${SERVER_URL}/user/change-password`, fields, {
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
              showToastError(error.response.data.message);
            });
        }}
      >
        {({ errors, status, touched, isSubmitting }) => (
          <Form className="card ProfileForm ProfileFormPassword mb-5">
            <div className="row">
              <div className="col-sm-10 offset-sm-1">
                <div className="row">
                  <div className="col-sm-12 form-group">
                    <label>Old Password</label>
                    <Field
                      name="old_password"
                      placeholder="Old password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.old_password && touched.old_password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="old_password"
                      component="div"
                      className="error-color"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <label>New Password</label>
                    <Field
                      name="new_password"
                      placeholder="New password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.new_password && touched.new_password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="error-color"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <label>Confirm New Password</label>
                    <Field
                      name="confirm_new_password"
                      placeholder="New password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.confirm_new_password &&
                        touched.confirm_new_password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirm_new_password"
                      component="div"
                      className="error-color"
                    />
                  </div>
                </div>
                <center className="paddngt">
                  <button
                    className="action-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </center>
              </div>
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

export default ChangePassword;
