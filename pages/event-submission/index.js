import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import Loader from "@/components/Common/Loader";
import SEO from "../../components/Seo/Seo";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomBannerIndex } from "../../util/utils";
import AddBan from "../../components/Addbanner/AddBan";
import { getFaqData } from "../../redux/HomePageSlice";
import AddBannerComponent from "../../components/AddBannerComponent/AddBannerComponent";
const EventSubmission = (props) => {
  const { currentUrlFn } = useCommonFunctionContext();
  const [faq, setFaqs] = useState(props.faqs);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const currentUrl = props.currentUrl;

  const dispatch = useDispatch();

  const { getFaqData_status, getFaqData_data, getFaqData_error } = useSelector(
    (state) => state?.home ?? {}
  );

  const [topbannerIndex, setTopbannerIndex] = useState(0);
  const [bottombannerIndex, setBottombannerIndex] = useState(0);
  const [above_footer_bannerIndex, setAbove_footer_bannerIndex] = useState(0);
  const [UNDER_BANNER, setUNDER_BANNER] = useState(0);


  useEffect(() => {
    if (getFaqData_data) {
      let underbanner_index = getFaqData_data?.findIndex(
        (item) => item?.section_name_slug === "under-banner-1"
      );

      setUNDER_BANNER(underbanner_index);
      setLoadingFaqs(false);

      setTopbannerIndex(
        generateRandomBannerIndex(
          "faqPageTopBannerIndex",
          getFaqData_data[underbanner_index]?.banner?.length || 0
        )
      );
    }
  }, [getFaqData_data]);

  return (
    <Aux>
      <SEO
        title={`${APPLICATION_NAME} | Event Submission`}
        description={""}
        siteTitle={""}
        keywords={""}
        href={currentUrl}
      />
      <div className="Banner d-none d-sm-block">
        <div className="BannerInner BackgroundPilot">
          <div className="container">
            <div className="row">
              <div className="offset-sm-2 col-sm-8">
                <div className="BannerText">
                  <div className="BannerTitle">Event Submission</div>
                  {/* <p>Caption here</p>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddBannerComponent
        data={getFaqData_data}
        status={getFaqData_status}
        position={UNDER_BANNER}
        index={topbannerIndex}
      />
      <div className="PrivacyPage">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">

              <div className="jumbotron">
                <h2 className="display-4 FontBebas">Who we are:</h2>
                <p className="lead">The Droning Company brings together a tight-knit community of people who are interested in all-things drones. If you are interested in promoting your drone-related event, please read further for details on how to submit.</p>
                <hr className="my-4"></hr>
                <h4 className="FontBebas">Types of events that we are looking for:</h4>
                <ul className="list-group list-group-flush my-4">
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">1</span> Tradeshows</li>
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">2</span> Product Launches</li>
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">3</span> Virtual Events</li>
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">4</span> Grand openings</li>
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">5</span> Charity events</li>
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">6</span> Educational events</li>
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">7</span> Networking events</li>
                  <li className="list-group-item"><span className="badge badge-primary badge-pill">8</span> Workshops</li>
                </ul>

                <p className="lead">Your event will be placed in this calendar on our site for 30 days, included in our newsletter, and promoted via our social media channels for a one-time fee of $25.</p>
                <a className="btn btn-primary btn-lg" href="/event/submit-event">Post Your Event</a>
              </div>

            </div>
          </div>
        </div>
      </div>
      <AddBannerComponent
        data={getFaqData_data}
        status={getFaqData_status}
        position={above_footer_bannerIndex}
        index={bottombannerIndex}
      />
    </Aux>
  );
};

export default EventSubmission;
