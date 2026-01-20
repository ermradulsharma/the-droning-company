import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import GetStarted from "../../components/CmsPage/GetStarted";
import OurTeams from "../../components/CmsPage/OurTeams";
import { APPLICATION_NAME } from "../../util/Constants";
import SEO from "../../components/Seo/Seo";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
import { generateRandomBannerIndex } from "../../util/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAboutAdsData } from "../../redux/HomePageSlice";
import AddBan from "../../components/Addbanner/AddBan";
import Loader from "@/components/Common/Loader";
const AboutUs = (props) => {
  const { currentUrlFn } = useCommonFunctionContext();
  const currentUrl = currentUrlFn();
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const dispatch = useDispatch();
  const [topbannerIndex, setTopbannerIndex] = useState(0);
  const [bottombannerIndex, setBottombannerIndex] = useState(0);
  const [above_footer_bannerIndex, setAbove_footer_bannerIndex] = useState(0);
  const [UNDER_BANNER, setUNDER_BANNER] = useState(0);
  const [above_team_index, setAbove_team_index] = useState(0);
  const [aabove_team_position, setAbove_team_position] = useState(0);
  const [above_meet_index, setAbove_meet_index] = useState(0);
  const [above_meet_position, setAbove_meet_position] = useState(0);

  const {
    getAboutAdsData_status,
    getAboutAdsData_data,
    getAboutAdsData_error,
  } = useSelector((state) => state?.home ?? {});
  useEffect(() => {
    if (getAboutAdsData_data) {
      let underbanner_index = getAboutAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "under-banner"
      );
      let abovefooter_index = getAboutAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-footer"
      );

      let aboveteam_index = getAboutAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-our-team"
      );
      let abovemeet_index = getAboutAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-meet-the-best-section"
      );

      setUNDER_BANNER(underbanner_index);
      setAbove_footer_bannerIndex(abovefooter_index);
      setAbove_team_position(aboveteam_index);
      setAbove_meet_position(abovemeet_index);

      setTopbannerIndex(
        generateRandomBannerIndex(
          "aboutPageTopBannerIndex",
          getAboutAdsData_data[underbanner_index]?.banner?.length || 0
        )
      );
      setBottombannerIndex(
        generateRandomBannerIndex(
          "aboutPageBottomBannerIndex",
          getAboutAdsData_data[abovefooter_index]?.banner?.length || 0
        )
      );

      setAbove_team_index(
        generateRandomBannerIndex(
          "aboutPageAboveTeamIndex",
          getAboutAdsData_data[aboveteam_index]?.banner?.length || 0
        )
      );
      setAbove_meet_index(
        generateRandomBannerIndex(
          "aboutPageAboveMeetIndex",
          getAboutAdsData_data[abovemeet_index]?.banner?.length || 0
        )
      );
    }
  }, [getAboutAdsData_data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    dispatch(getAboutAdsData());
  }, [dispatch]);

  return (
    <Fragment>
      <SEO
        title={`${APPLICATION_NAME}`}
        description={metaDescription}
        siteTitle={"About Us"}
        keywords={metaKeyword}
        href={props.currentUrl}
      />
      <div className="Banner d-sm-block">
        <div className="BannerInner BannerInn BannerInnerAbout">
          <div className="container">
            <div className="row">
              <div className="offset-sm-2 col-sm-8">
                <div className="BannerText">
                  <div className="BannerTitle">About The Droning Company</div>
                  <p>
                    <strong>The Droning Company</strong> is your one-stop shop
                    to find experienced, licensed, and insured drone pilots
                    throughout the United States. Our site lets you view the
                    pilots&apos; work portfolios, see what specialized equipment
                    they have, and find the kind of jobs they excel in. You can
                    also post job announcements where pilots can contact you in
                    the “Post a Job” section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {getAboutAdsData_status === "loading" || getAboutAdsData_data === null ? (
        <div className="row">
          <div
            className="col-sm-12 text-center justify-content-between"
            style={{ textAlign: "center" }}
          >
            <Loader
              type="ThreeDots"
              color="#ffcc0e"
              height={100}
              width={100}
              visible={
                getAboutAdsData_status === "loading" ||
                getAboutAdsData_data === null
              }
            />
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          {getAboutAdsData_data && (
            <AddBan
              href={
                getAboutAdsData_data[UNDER_BANNER]?.banner[topbannerIndex]?.link
              }
              src={
                getAboutAdsData_data[UNDER_BANNER]?.banner[topbannerIndex]
                  ?.banner_image_full_path
              }
            />
          )}
        </div>
      )}
      <div className="AboutUs paddngtb" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="row justify-content-center d-flex">
            <div className="col-lg-6 col-md-12 m-b30">
              <div className="AboutDroneOne">
                <div className="AboutDroneOneMedia">
                  <Image
                    className="img-fluid slide-top"
                    src="/images/about-img.png"
                    alt="About Us"
                    width={500}
                    height={300}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 m-b30">
              <div className="AboutSectionOneRight">
                <div className="MainHeading text-left">
                  <p>About Us</p>
                  <h1>Specializing in Drone Services</h1>
                  <p>
                    <strong>The Droning Company</strong> is an online job agency for drone pilots which incorporates a high-end magazine dedicated to all aspects of the drone industry, keeping you abreast of all the latest and trending news , along with articles, columns, tech innovations, pilot tips, product reviews, and the latest FAA updates.
                  </p>
                  <p>
                    <strong>The Droning Company</strong> plans to be the number-one nationwide resource for drone pilots to obtain work. Every week, we will feature someone as our “Pilot of the Week”, and we will also display your work in our “Video Reel of the Week”.
                  </p>
                </div>

                <ul className="site-list-style-one icon-style"></ul>
              </div>
            </div>
          </div>
          <div className="justify-content-center">
            <div className="MainHeading text-left">
              <p>We do not take any commissions on the jobs pilots receive through <strong>The Droning Company</strong>, but rather charge a ten-dollar monthly administration fee for hosting your profile.</p>
              <p>Please check out this article if you considering becoming a drone pilot: <Link href="/blog/how-to-become-a-drone-pilot-now">How to Become a Drone Pilot Now</Link> and if you already have you Part 107 and are interested in finding out what we can do for you or are planning to sign up with us and would like to know how to create an effective profile on our page to get you more work please click here: <Link href="/blog/how-to-find-drone-jobs">How To Find Drone Jobs</Link></p>
              <p>If you are a company and would like us to consider featuring an article on your company, please drop our Editor in Chief Mike Molenda a line at:{" "} <Link href="mailto:mradulsharma786@gmail.com">mradulsharma786@gmail.com</Link></p>
              <p>If you are a manufacturer and would like our resident drone expert Chris Fravel to conduct a written and video review on your product, please contact him at:{" "}
                <Link href="mailto:mradulsharma786@gmail.com">mradulsharma786@gmail.com</Link></p>
              <p>If you have any questions—or if you need advice—please feel free to contact us by e-mail at:{" "} <Link href="mailto:mradulsharma786@gmail.com">mradulsharma786@gmail.com</Link></p>
            </div>
          </div>
        </div>
      </div>

      {getAboutAdsData_status === "loading" || getAboutAdsData_data === null ? (
        <div className="row">
          <div
            className="col-sm-12 text-center justify-content-between"
            style={{ textAlign: "center" }}
          >
            <Loader
              type="ThreeDots"
              color="#ffcc0e"
              height={100}
              width={100}
              visible={
                getAboutAdsData_status === "loading" ||
                getAboutAdsData_data === null
              }
            />
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          {getAboutAdsData_data && (
            <AddBan
              href={
                getAboutAdsData_data[above_meet_position]?.banner[
                  above_meet_index
                ]?.link
              }
              src={
                getAboutAdsData_data[above_meet_position]?.banner[
                  above_meet_index
                ]?.banner_image_full_path
              }
            />
          )}
        </div>
      )}



      <section className="section-team">
        {getAboutAdsData_status === "loading" ||
          getAboutAdsData_data === null ? (
          <div className="row">
            <div
              className="col-sm-12 text-center justify-content-between"
              style={{ textAlign: "center" }}
            >
              <Loader
                type="ThreeDots"
                color="#ffcc0e"
                height={100}
                width={100}
                visible={
                  getAboutAdsData_status === "loading" ||
                  getAboutAdsData_data === null
                }
              />
            </div>
          </div>
        ) : (
          <div className="container mt-5">
            {getAboutAdsData_data && (
              <AddBan
                href={
                  getAboutAdsData_data[aabove_team_position]?.banner[
                    above_team_index
                  ]?.link
                }
                src={
                  getAboutAdsData_data[aabove_team_position]?.banner[
                    above_team_index
                  ]?.banner_image_full_path
                }
              />
            )}
          </div>
        )}
        <OurTeams />
        {getAboutAdsData_status === "loading" ||
          getAboutAdsData_data === null ? (
          <div className="row">
            <div
              className="col-sm-12 text-center justify-content-between"
              style={{ textAlign: "center" }}
            >
              <Loader
                type="ThreeDots"
                color="#ffcc0e"
                height={100}
                width={100}
                visible={
                  getAboutAdsData_status === "loading" ||
                  getAboutAdsData_data === null
                }
              />
            </div>
          </div>
        ) : (
          <div className="container mt-5">
            {getAboutAdsData_data && (
              <AddBan
                href={
                  getAboutAdsData_data[above_footer_bannerIndex]?.banner[
                    bottombannerIndex
                  ]?.link
                }
                src={
                  getAboutAdsData_data[above_footer_bannerIndex]?.banner[
                    bottombannerIndex
                  ]?.banner_image_full_path
                }
              />
            )}
          </div>
        )}
      </section>

      <div className="AboutQuality">
        <div className="BestPilot">
          <div className="container">
            <GetStarted />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + "" + context.resolvedUrl;
  return {
    props: {
      currentUrl: currentURL,
    },
  };
}
export default AboutUs;
