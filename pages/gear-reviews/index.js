import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import SEO from "../../components/Seo/Seo";
import { useDispatch, useSelector } from "react-redux";
import { getGearReviewsData } from "../../redux/HomePageSlice";
import AddBan from "../../components/Addbanner/AddBan";
import Loader from "@/components/Common/Loader";
import { generateRandomBannerIndex } from "../../util/utils";
import AddBannerComponent from "../../components/AddBannerComponent/AddBannerComponent";
import useMetaTags from "../../hooks/useMetaTags";
import { metaInfo } from "../../util/metaData";
import Head from "next/head";
const GearReviews = (props) => {
  const [gear, setGear] = useState(props.gear);
  const currentUrl = props.currentUrl;
  // const [metaTitle, setMetaTitle] = useState("");
  // const [metaKeyword, setMetaKeyword] = useState("");
  // const [metaDescription, setMetaDescription] = useState("");

  const [metaTitle, metaKeyword, metaDescription] = useMetaTags(
    props?.metaTitle,
    props?.metaKeyword,
    props?.metaDescription
  );

  const dispatch = useDispatch();
  // const [topbannerIndex, setTopbannerIndex] = useState(0);
  // const [bottombannerIndex, setBottombannerIndex] = useState(0);
  const [aboveFotterOne, setAboveFotterOne] = useState(0);
  const [aboveFoterOnePosition, setAboveFoterOnePosition] = useState(0);
  const [aboveFotterTwo, setAboveFotterTwo] = useState(0);
  const [aboveFoterTwoPosition, setAboveFoterTwoPosition] = useState(0);
  const [underBannerOne, setUnderBannerOne] = useState(0);
  const [underBannerOnePosition, setUnderBannerOnePosition] = useState(0);
  const [underBannerTwo, setUnderBannerTwo] = useState(0);
  const [underBannerTwoPosition, setUnderBannerTwoPosition] = useState(0);

  const {
    getGearReviewsData_status,
    getGearReviewsData_data,
    getJobPageAdsData_error,
  } = useSelector((state) => state?.home ?? {});

  useEffect(() => {
    if (getGearReviewsData_data) {
      let underbannerOne_index = getGearReviewsData_data?.findIndex(
        (item) => item?.section_name_slug === "under-banner-1"
      );
      let underbannerTwo_index = getGearReviewsData_data?.findIndex(
        (item) => item?.section_name_slug === "under-banner-2"
      );
      let abovefooterone_index = getGearReviewsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-footer-1"
      );
      let abovefootertwo_index = getGearReviewsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-footer-2"
      );

      setUnderBannerOnePosition(underbannerOne_index);
      setUnderBannerTwoPosition(underbannerTwo_index);
      setAboveFoterOnePosition(abovefooterone_index);
      setAboveFoterTwoPosition(abovefootertwo_index);

      setUnderBannerOne(
        generateRandomBannerIndex(
          "gearPageUnderBanner1Index",
          getGearReviewsData_data[underbannerOne_index]?.banner?.length || 0
        )
      );
      setUnderBannerTwo(
        generateRandomBannerIndex(
          "gearPageUnderBanner2Index",
          getGearReviewsData_data[underbannerTwo_index]?.banner?.length || 0
        )
      );
      setAboveFotterOne(
        generateRandomBannerIndex(
          "gearPageAboveFooter1Index",
          getGearReviewsData_data[abovefooterone_index]?.banner?.length || 0
        )
      );
      setAboveFotterTwo(
        generateRandomBannerIndex(
          "gearPageAboveFooter2Index",
          getGearReviewsData_data[abovefootertwo_index]?.banner?.length || 0
        )
      );
    }
  }, [getGearReviewsData_data]);

  useEffect(() => {
    fetch(`${SERVER_URL}/gear-reviews-all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.statusCode === 200) {
          setGear(response.data);
        }
      });
    dispatch(getGearReviewsData());
  }, []);

  return (
    <>
     
      <Aux>
        <SEO
          title={`${APPLICATION_NAME}`}
          description={metaDescription}
          siteTitle={"Gear Reviews"}
          keywords={metaKeyword}
          href={currentUrl}
        />
        <div className="Banner d-none d-sm-block">
          <div className="BannerInner Gear-Reviews">
            <div className="container">
              <div className="row">
                <div className="offset-sm-2 col-sm-8">
                  <div className="BannerText">
                    <div className="BannerTitle">Gear Reviews</div>
                    <p>
                      While they might seem like toys, a high-quality quadcopter
                      is a serious investment, and an easy way to add production
                      value to a film project, or get a unique view on the world
                      for your travel vlog. We&apos;ve flown plenty, and these
                      are the best drones in our tests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="CheckOutYouTubeBlack paddngb text-center">
          <div className="MainHeading">
            <h1>Gear Reviews</h1>
          </div>

          <AddBannerComponent
            data={getGearReviewsData_data}
            status={getGearReviewsData_status}
            position={underBannerOnePosition}
            index={underBannerOne}
          />

          <AddBannerComponent
            data={getGearReviewsData_data}
            status={getGearReviewsData_status}
            position={underBannerTwoPosition}
            index={underBannerTwo}
          />

          <div className="container">
            <div className="row YouTubeBox">
              {gear.map((video, index) => {
                {
                  var url = `https://www.youtube.com/embed/${video.video_key}`;
                }
                return (
                  <div className="col-sm-4" key={video.video_key + index}>
                    <iframe
                      style={{ border: "0" }}
                      height="315"
                      src={url}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="VideoTitle">{video.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <AddBannerComponent
            data={getGearReviewsData_data}
            status={getGearReviewsData_status}
            position={aboveFoterOnePosition}
            index={aboveFotterOne}
          />

          <AddBannerComponent
            data={getGearReviewsData_data}
            status={getGearReviewsData_status}
            position={aboveFoterTwoPosition}
            index={aboveFotterTwo}
          />
        </div>
      </Aux>
    </>
  );
};

export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + "" + context.resolvedUrl;

  return await fetch(`${SERVER_URL}/gear-reviews-all`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.statusCode === 200) {
        return {
          props: {
            gear: response.data,
            currentUrl: currentURL,
            ...metaInfo.gear_review,
          },
        };
      } else {
        return {
          props: {
            gear: [],
            currentUrl: currentURL,
            ...metaInfo.gear_review,
          },
        };
      }
    });
}
export default GearReviews;
