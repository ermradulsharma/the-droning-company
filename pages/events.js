import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import RecentEventsBlock from "../components/Event/RecentEventsBlock";
import { useRouter } from "next/router";
import useCommonFunctionContext from "../hooks/useCommonFunctionContext";
import { SERVER_URL, APPLICATION_NAME } from "../util/Constants";
import Loader from "react-loader-spinner";
import SEO from "../components/Seo/Seo";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageAdsData } from "../redux/HomePageSlice";
import { generateRandomBannerIndex, randomRangeIndex } from "../util/utils";
import AddBannerComponent from "../components/AddBannerComponent/AddBannerComponent";

import Calendar from "../components/Event/calendar.tsx";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  let history = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const onSearchCompany = () => {
    history.push(`/company-directory/${searchKeyword}`);
  };

  const { setSearchLocation, setLocationString, currentUrlFn } =
    useCommonFunctionContext();
  const currentUrl = currentUrlFn();
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const {
    getHomePageAdsData_status,
    getHomePageAdsData_data,
    getHomePageAdsData_error,
  } = useSelector((state) => state?.home);
  const [homeBannerTopIndex, setHomeBannerTopIndex] = useState(0);
  const [homeBannerBottomIndex, setHomeBannerBottomIndex] = useState(0);
  const [abovegearReview, setAboveGearReview] = useState(0);
  const [underGearReview, setUnderGearReview] = useState(0);
  const [homeBannerCommunityNewsIndex, sethomeBannerCommunityNewsIndex] = useState(0);

  const [metaDescription, setMetaDescription] = useState(
    "THE WORLD #1 RESOURCE FOR DRONE COMMUNITY"
  );

  useEffect(() => {
    dispatch(getHomePageAdsData());
  }, []);

  const [ABOVE_GALLERY_Index, setABOVE_GALLERY_Index] = useState(0);
  const [UNDER_BANNER, setUNDER_BANNER] = useState(0);
  const [ABOVE_GEAR_REVIEW_Index, setABOVE_GEAR_REVIEW_Index] = useState(0);
  const [UNDER_GEAR_REVIEW_Index, setUNDER_GEAR_REVIEW_Index] = useState(0);

  const [UNDER_COMMUNITY_NEWS, setUNDER_COMMUNITY_NEWS] = useState(0);

  /* The above code is used to set the index of the banner to be displayed on the home page. */
  useEffect(() => {
    if (getHomePageAdsData_data !== null) {
      let underbanner_index = getHomePageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "underneath-the-main-banner"
      );
      let abovegalleryitem_index = getHomePageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-gallery-items"
      );
      let abovegearReview_index = getHomePageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-gear-reviews"
      );
      let undergearreview_index = getHomePageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "under-gear-reviews"
      );
      let under_community_news_index = getHomePageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "Under-Community-News"
      );
      setUNDER_BANNER(underbanner_index);
      setABOVE_GALLERY_Index(abovegalleryitem_index);
      setABOVE_GEAR_REVIEW_Index(abovegearReview_index);
      setUNDER_GEAR_REVIEW_Index(undergearreview_index);

      setUNDER_COMMUNITY_NEWS(under_community_news_index);

      setHomeBannerTopIndex(
        generateRandomBannerIndex(
          "homeBannerTopIndex",
          getHomePageAdsData_data[underbanner_index]?.banner?.length || 0
        )
      );
      setHomeBannerBottomIndex(
        generateRandomBannerIndex(
          "homeBannerBottomIndex",
          getHomePageAdsData_data[abovegalleryitem_index]?.banner?.length || 0
        )
      );

      setAboveGearReview(
        generateRandomBannerIndex(
          "homeAboveGearReviewIndex",
          getHomePageAdsData_data[abovegearReview_index]?.banner?.length || 0
        )
      );
      setUnderGearReview(
        generateRandomBannerIndex(
          "home_UNDER_GEAR_REVIEW_Index",
          getHomePageAdsData_data[undergearreview_index]?.banner?.length || 0
        )
      );

      sethomeBannerCommunityNewsIndex(
        generateRandomBannerIndex(
          "homeBannerCommunityNewsIndex",
          getHomePageAdsData_data[under_community_news_index]?.banner?.length || 0
        )
      );
    }
  }, [getHomePageAdsData_data]);

  return (
    <Fragment>
      <SEO
        title={`${APPLICATION_NAME}`}
        description={metaDescription}
        siteTitle={metaTitle}
        keywords={metaKeyword}
        href={currentUrl}
      />

      <div className="BandArea text-left paddngtb four_featured_boxes">
        <div className="container">
          <div className="communityNewsSection">
            <h3 style={{ backgroundColor: '#fecd0e', textAlign: 'center', padding: 5, borderRadius: 4, color: '#000', fontWeight: '600' }}>Community News</h3>
            <Calendar />
            <div className="row mt-3">
              <div className="col-md-9">
                <RecentEventsBlock />
              </div>
              <div className="col-md-3 bannerAd">
                <AddBannerComponent
                  data={getHomePageAdsData_data}
                  status={getHomePageAdsData_status}
                  position={UNDER_COMMUNITY_NEWS}
                  index={homeBannerCommunityNewsIndex}
                />
              </div>
            </div>

          </div>

          <AddBannerComponent
            data={getHomePageAdsData_data}
            status={getHomePageAdsData_status}
            position={ABOVE_GALLERY_Index}
            index={homeBannerBottomIndex}
          />

        </div>
      </div>

    </Fragment >
  );
};

export default Home;
