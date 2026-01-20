import React, { useState, useEffect, useCallback } from "react";
import Loader from "@/components/Common/Loader";
import useAuthContext from "../../../hooks/useAuthContext";
import useToastContext from "../../../hooks/useToastContext";
import { SERVER_URL } from "../../../util/Constants";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardAds } from "../../../redux/HomePageSlice";
import { DisplayAddsInDashboardPages } from "../../../util/utils";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const MySubscription = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const { accessToken, userId, setAuthTokens } = useAuthContext();
  const { showToast, hideToast, showToastSuccess, showToastError } =
    useToastContext();
  const confirm = useConfirm();
  let history = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getSubscriptionDetail();
    dispatch(getDashboardAds("pilot-my-subscriptions"));
  }, [getSubscriptionDetail, dispatch]);

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
        "above-my-subscriptions-title",
        setAboveTitlePosition,
        setAboveTitleIndex,
        "subscription_above_title_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page",
        setBottomPagePosition,
        setBottomPageIndex,
        "subscription_bottom_page_banner_index"
      );

      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "above-subscription-title-2",
        setAboveTitle2Position,
        setAboveTitle2Index,
        "subscription_above_title2_banner_index"
      );
      DisplayAddsInDashboardPages(
        getDashboardAds_data,
        "bottom-of-the-page-2",
        setBottomPage2Position,
        setBottomPage2Index,
        "subscription_bottom_page2_banner_index"
      );
    }
  }, [getDashboardAds_data]);

  const getSubscriptionDetail = useCallback(async () => {
    try {
      await fetch(`${SERVER_URL}/subscription/show/${userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setLoading(false);
          if (response.statusCode === 200) {
            console.log(response.data);
            setSubscriptionData(response.data.subscriptions);
            setSubscriptionHistory(response.data.invoices);
          }
        });
    } catch (error) {
      setLoading(false);
    }
  }, [userId, accessToken]);

  const handleCancelSubscription = () => {
    confirm({
      description: "You want to cancel your subscription",
      confirmationButtonProps: {},
    })
      .then(async () => {
        showToast("Cancelling subscription...");
        setLoading(true);
        await axios
          .get(`${SERVER_URL}/subscription/cancel/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response);
            setLoading(false);
            hideToast();
            if (response.status === 200) {
              showToastSuccess("Subscription has been cancelled successfully");
              setAuthTokens();
              localStorage.removeItem("tokens");
              localStorage.removeItem("user_profile");
              history.push("/");
            }
          })
          .catch((error) => {
            hideToast();
            setLoading(false);
            if (error.response.status === 405) {
              showToastError(error.response.statusText);
            }

            console.log(error.response);
          });
      })
      .catch(() => {
        console.log("not deleted");
      });
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <div className="col-md-12" style={{ textAlign: "center" }}>
          <Loader
            type="ThreeDots"
            color="#ffcc0e"
            height={100}
            width={100}
            visible={loading}
          />
        </div>
      ) : (
        <Aux>
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
          <div className="DashHeading">
            <h1 className="h1 mb-0 text-black">
              <i className="far fa-arrow-alt-circle-right"></i>My Subscriptions
            </h1>
          </div>

          <div className="row">
            <div className="col-12 text-left mb-3">
              <div className="card shadow px-4 py-4">
                <div className="card-job-item">
                  <div className="card-info-left">
                    <div className="itemRows">
                      <ul className="JobEdit">
                        {/* <li><label>Subscription Id</label><strong># {subscriptionData.subscription_id}</strong></li> */}
                        <li>
                          <label>Subscription Status</label>
                          <strong>
                            {subscriptionData.subscription_status}
                          </strong>
                        </li>
                        <li>
                          <label>Plan Type</label>
                          <strong>{subscriptionData.plan_name}</strong>
                        </li>
                        <li>
                          <label>Plan Validity</label>
                          <strong>{subscriptionData.plan_validity}</strong>
                        </li>
                        <li>
                          <label>Renewl Amount</label>
                          <strong>{subscriptionData.renewal_amount}</strong>
                        </li>
                        <li>
                          <label>Payment Method</label>
                          <strong>{`${subscriptionData.payment_type} - ${subscriptionData.payment_last_four}`}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-info-right">
                    <button
                      type="button"
                      className="btn btn-warning btn-lg mb-3 text-black w-100"
                      onClick={() => handleCancelSubscription()}
                    >
                      Cancel Subscription
                    </button>
                    <Link href="/update-payment" legacyBehavior>
                      <a target="_blank" rel="noreferrer" className="btn btn-warning btn-lg mb-3 text-black w-100">Update Debit/Credit Card</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      {/* <th>Subscription Id</th> */}
                      <th>Plan Type</th>
                      <th>Plan Duration</th>
                      <th>Plan Amount</th>
                      <th>Subscribed On</th>
                      <th>Download Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionHistory.length ? (
                      subscriptionHistory.map((subscription, index) => {
                        return (
                          <tr key={`subs-${index}`}>
                            {/* <td>{subscription.subscription_id}</td> */}
                            <td>{subscription.plan_name}</td>
                            <td>{`${subscription.subscription_start} - ${subscription.subscription_end}`}</td>
                            <td>{subscription.sub_total}</td>
                            <td>{subscription.subscription_start}</td>
                            <td>
                              <a
                                href={`${subscription.invoice_pdf}`}
                                download
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                <i
                                  className="fa fa-download"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
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
        </Aux>
      )}
    </div>
  );
};

export default MySubscription;
