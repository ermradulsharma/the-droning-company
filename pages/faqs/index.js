import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import Loader from "react-loader-spinner";
import SEO from "../../components/Seo/Seo";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomBannerIndex } from "../../util/utils";
import AddBan from "../../components/Addbanner/AddBan";
import { getFaqData } from "../../redux/HomePageSlice";
import AddBannerComponent from "../../components/AddBannerComponent/AddBannerComponent";
const Faqs = (props) => {
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

  const [underBannerTwoPosition, setUnderBannerTwoPosition] = useState(0);
  const [underBannerTwoIndex, setUnderBannerTwoIndex] = useState(0);
  const [underFooterTwoPosition, setUnderFooterTwoPosition] = useState(0);
  const [underFooterTwoIndex, setUnderFooterTwoIndex] = useState(0);

  useEffect(() => {
    if (getFaqData_data) {
      let underbanner_index = getFaqData_data?.findIndex(
        (item) => item?.section_name_slug === "under-banner-1"
      );
      let abovefooter_index = getFaqData_data?.findIndex(
        (item) => item?.section_name_slug === "above-footer-1"
      );

      let underbannertwo_index = getFaqData_data?.findIndex(
        (item) => item?.section_name_slug === "under-banner-2"
      );

      let underfootertwo_index = getFaqData_data?.findIndex(
        (item) => item?.section_name_slug === "above-footer-2"
      );

      setUNDER_BANNER(underbanner_index);
      setAbove_footer_bannerIndex(abovefooter_index);
      setUnderBannerTwoPosition(underbannertwo_index);
      setUnderFooterTwoPosition(underfootertwo_index);

      setTopbannerIndex(
        generateRandomBannerIndex(
          "faqPageTopBannerIndex",
          getFaqData_data[underbanner_index]?.banner?.length || 0
        )
      );
      setBottombannerIndex(
        generateRandomBannerIndex(
          "faqPageBottomBannerIndex",
          getFaqData_data[abovefooter_index]?.banner?.length || 0
        )
      );
      setUnderBannerTwoIndex(
        generateRandomBannerIndex(
          "faqPageUnderBannerTwoIndex",
          getFaqData_data[underbannertwo_index]?.banner?.length || 0
        )
      );
      setUnderFooterTwoIndex(
        generateRandomBannerIndex(
          "faqPageUnderFooterTwoIndex",
          getFaqData_data[underfootertwo_index]?.banner?.length || 0
        )
      );
    }
  }, [getFaqData_data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    try {
      fetch(`${SERVER_URL}/faqs`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setLoadingFaqs(false);

          if (response.statusCode === 200) {
            setFaqs(response.data);
          }
        });
    } catch (error) {
      setLoadingFaqs(false);
    }
    dispatch(getFaqData());
  }, []);

  return (
    <Aux>
      <SEO
        title={`${APPLICATION_NAME} | Faqs`}
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
                  <div className="BannerTitle">Frequently Asked Questions</div>
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
      <div className="PrivacyPage paddngtb">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div
                className="panel-group"
                id="accordionGroupOpen"
                role="tablist"
                aria-multiselectable="true"
              >
                {loadingFaqs ? (
                  <div
                    className="col-sm-12 text-center justify-content-between"
                    style={{ textAlign: "center" }}
                  >
                    <Loader
                      type="ThreeDots"
                      color="#ffcc0e"
                      height={100}
                      width={100}
                      visible={loadingFaqs}
                    />
                  </div>
                ) : (
                  <div
                    className="panel-group"
                    id="accordionGroupOpen"
                    role="tablist"
                    aria-multiselectable="true"
                  >
                    {faq.map((fquest, index) => {
                      return (
                        <div key={index} className="panel panel-default">
                          <div
                            className="panel-heading"
                            role="tab"
                            id="headingOne"
                          >
                            <h4 className="panel-title">
                              <a
                                className="collapsed"
                                role="button"
                                data-toggle="collapse"
                                data-parent="#accordionGroupOpen"
                                href={`#collapseOpenOne-${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse-${index}`}
                              >
                                {fquest.question}
                              </a>
                            </h4>
                          </div>
                          <div
                            id={`collapseOpenOne-${index}`}
                            className="panel-collapse collapse"
                            role="tabpanel"
                            aria-labelledby={`heading-${index}`}
                          >
                            <div className="panel-body">{fquest.answer}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + "" + context.resolvedUrl;
  return await fetch(`${SERVER_URL}/faqs/`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.statusCode === 200) {
        return {
          props: {
            faqs: response.data,
            currentUrl: currentURL,
          },
        };
      } else {
        return {
          props: {
            faqs: [],
            currentUrl: currentURL,
          },
        };
      }
    });
}
export default Faqs;
