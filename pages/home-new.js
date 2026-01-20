import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from 'next/image';
import FeaturePilot from "../components/Home/FeaturePilot";
import FeaturePilotNew from "../components/Home/FeaturePilotNew";
import FeatureCompany from "../components/Home/FeatureCompany";
import PhotoGallery from "../components/Home/PhotoGallery";
import GearReview from "../components/Home/GearReview";
import NewSectionNew from "../components/Home/NewSectionNew";
import FourNewsBlock from "../components/Home/FourNewsBlock";
import ThreeNewsBlock from "../components/Home/ThreeNewsBlock";
import FeaturedVideoReel from "../components/Home/FeaturedVideoReel";
import SearchLocationInput from "../components/SearchLocationInput/SearchLocationInput";
import { useRouter } from "next/router";
import useCommonFunctionContext from "../hooks/useCommonFunctionContext";
import { SERVER_URL, APPLICATION_NAME } from "../util/Constants";
import Loader from "@/components/Common/Loader";
import SEO from "../components/Seo/Seo";
import AddBan from "../components/Addbanner/AddBan";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageAdsData } from "../redux/HomePageSlice";
import { generateRandomBannerIndex, randomRangeIndex } from "../util/utils";
import AddBannerComponent from "../components/AddBannerComponent/AddBannerComponent";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [freeTrainingBlocks, setFreeTrainingBlocks] = useState([]);
  const [loadingFreeTraining, setLoadingFreeTraining] = useState(true);
  const [threeBlocks, setThreeBlocks] = useState([]);
  const [loadingThreeBlocks, setLoadingThreeBlocks] = useState(true);

  const [threeBlocksTwo, setThreeBlocksTwo] = useState([]);
  const [loadingThreeBlocksTwo, setLoadingThreeBlocksTwo] = useState(true);

  const [threeBlocksThree, setThreeBlocksThree] = useState([]);
  const [loadingThreeBlocksThree, setLoadingThreeBlocksThree] = useState(true);

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
  const [metaDescription, setMetaDescription] = useState(
    "THE WORLD #1 RESOURCE FOR DRONE COMMUNITY"
  );

  const onSearchPilotByLocation = async () => {
    let obj = document
      .getElementById("location-input")
      .getAttribute("data-obj");
    let locationString = document
      .getElementById("location-input")
      .getAttribute("value");
    setLocationString(locationString);
    setSearchLocation(obj);
    let city = locationString.split(",")[0];
    router.push(`/pilot-list/${city}`);
  };

  useEffect(() => {
    getFreeTrainingBlocks();
    getThreeBlocks();
    getThreeBlocksTwo();
    getThreeBlocksThree();
    dispatch(getHomePageAdsData());
  }, []);

  const getFreeTrainingBlocks = async () => {
    try {
      fetch(`${SERVER_URL}/setting?ids=1,2`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setLoadingFreeTraining(false);
          if (response.statusCode === 200) {
            setFreeTrainingBlocks(response.data);
          }
        });
    } catch (error) {
      setLoadingFreeTraining(false);
    }
  };

  const getThreeBlocks = async () => {
    try {
      fetch(`${SERVER_URL}/setting?ids=6`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setLoadingThreeBlocks(false);
          if (response.statusCode === 200) {
            setThreeBlocks(response.data?.reverse());
          }
        });
    } catch (error) {
      setLoadingThreeBlocks(false);
    }
  };

  const getThreeBlocksTwo = async () => {
    try {
      fetch(`${SERVER_URL}/setting?ids=4,7,8`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setLoadingThreeBlocksTwo(false);
          if (response.statusCode === 200) {
            setThreeBlocksTwo(response.data);
          }
        });
    } catch (error) {
      setLoadingThreeBlocksTwo(false);
    }
  };

  const getThreeBlocksThree = async () => {
    try {
      fetch(`${SERVER_URL}/setting?ids=9,10,11`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setLoadingThreeBlocksThree(false);
          if (response.statusCode === 200) {
            setThreeBlocksThree(response.data);
          }
        });
    } catch (error) {
      setLoadingThreeBlocksThree(false);
    }
  };

  const [ABOVE_GALLERY_Index, setABOVE_GALLERY_Index] = useState(0);
  const [UNDER_BANNER, setUNDER_BANNER] = useState(0);
  const [ABOVE_GEAR_REVIEW_Index, setABOVE_GEAR_REVIEW_Index] = useState(0);
  const [UNDER_GEAR_REVIEW_Index, setUNDER_GEAR_REVIEW_Index] = useState(0);

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
      setUNDER_BANNER(underbanner_index);
      setABOVE_GALLERY_Index(abovegalleryitem_index);
      setABOVE_GEAR_REVIEW_Index(abovegearReview_index);
      setUNDER_GEAR_REVIEW_Index(undergearreview_index);

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
      <div className="Banner d-sm-block BannerFront">
        <div className={`BannerInner`}>
          <div className="container">
            <div className="row">
              <div className="offset-sm-2 col-sm-8">
                <div className="BannerText">
                  <div className="BannerTitle">
                    The Worlds # 1 Resource for the Drone Community
                  </div>
                  <div className="clearfix"></div>
                  <form className="SearchBar HirePilotForm text-center ">
                    <div className="row">
                      <div className="offset-sm-2 col-sm-8 form-group">
                        <label className="BiggerSize">Hire a Pilot</label>
                        <div className="form-inline">
                          <SearchLocationInput
                            className="form-control w-60"
                            placeholder="Enter location to search"
                          //locationSelect = {locationSelectHandler}
                          />
                          <button
                            className="btn BtnSearch"
                            type="button"
                            style={{ borderRadius: '0 20px 20px 0', paddingRight: 20 }}
                            onClick={() => onSearchPilotByLocation()}
                          >
                            Check
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="offset-md-2 col-md-8 offset-lg-4 col-lg-4">
                        <label>Create a pilot Profile</label>
                        <Link href="/registration" legacyBehavior>
                          <a className="btn BtnSearch w-100">Join the team</a>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner End */}
      <AddBannerComponent
        data={getHomePageAdsData_data}
        status={getHomePageAdsData_status}
        position={UNDER_BANNER}
        index={homeBannerTopIndex}
      />

      {<NewSectionNew />}
      <AddBannerComponent
        data={getHomePageAdsData_data}
        status={getHomePageAdsData_status}
        position={ABOVE_GALLERY_Index}
        index={homeBannerBottomIndex}
      />


      <div className="BandArea text-left paddngtb four_featured_boxes">
        <div className="container">
          <div className="row row-item">
            <div className="col-sm-3">
              {loadingThreeBlocks ? (
                <div className="text-center justify-content-between" style={{ textAlign: "center" }}>
                  <Loader type="ThreeDots" color="#ffcc0e" height={100} width={100} visible={loadingThreeBlocks} />
                </div>
              ) : threeBlocks?.length ? (
                <>
                  {threeBlocks?.map((block, index) => (
                    (block.block_id == 6) ? (
                      <div key={`3-block-setting-${block.block_id}`} className="col-item" style={{ backgroundImage: "url(" + block.block_image + ")" }}>
                        <div className="BandBox">
                          <div className="BandBoxhead">
                            <h2>{block.block_title}</h2>
                            {block.block_subTitle1 ? (<h3>{block.block_subTitle1}</h3>) : null}
                          </div>
                          <div className={`HomeBlockImg`}>
                            <Image className="img-fluid" src={block.block_image} alt={block.block_title} width={300} height={200} />
                          </div>
                          <p>{block.block_description}</p>
                          <Link href={block?.block_button_link} passHref>
                            <a className="btn BtnLearn">LEARN MORE</a>
                          </Link>
                        </div>
                      </div>
                    ) : null
                  ))}
                </>
              ) : null
              }
            </div>
            <div className="col-sm-3">
              {<FeaturePilotNew />}
            </div>
            <div className="col-sm-3">
              {<FeaturedVideoReel />}
            </div>
            <div className="col-sm-3">
              {<FeatureCompany />}
            </div>
          </div>

          <AddBannerComponent
            data={getHomePageAdsData_data}
            status={getHomePageAdsData_status}
            position={UNDER_BANNER}
            index={homeBannerTopIndex}
          />

        </div>
      </div>

      {<FourNewsBlock category={'Featured News'} limit={4} />}
      <AddBannerComponent
        data={getHomePageAdsData_data}
        status={getHomePageAdsData_status}
        position={ABOVE_GALLERY_Index}
        index={homeBannerBottomIndex}
      />




      <div className={`BandArea text-left paddngtb three_featured_boxes first`}>
        <div className="container">

          {loadingThreeBlocksTwo ? (
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
                  visible={loadingThreeBlocksTwo}
                />
              </div>
            </div>
          ) : threeBlocksTwo?.length ? (
            <div className="row row-item">
              {threeBlocksTwo?.map((block, index) => (
                <div
                  key={`3-block-setting-${block.block_id}`}
                  className="col-sm-4 col-item"
                >
                  <div className="BandBox">
                    <div className="BandBoxhead">
                      <h2>{block.block_title}</h2>
                      {block.block_subTitle1 ? (
                        <h3>{block.block_subTitle1}</h3>
                      ) : null}
                    </div>
                    <div className={`HomeBlockImg`}>
                      <Image
                        className="img-fluid"
                        src={block.block_image}
                        alt={block.block_title}
                        width={300}
                        height={200}
                      />
                    </div>
                    <p>{block.block_description}</p>

                    <Link href={block?.block_button_link} passHref>
                      <a className="btn BtnLearn">LEARN MORE</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <AddBannerComponent
            data={getHomePageAdsData_data}
            status={getHomePageAdsData_status}
            position={UNDER_BANNER}
            index={homeBannerTopIndex}
          />

          {loadingThreeBlocksThree ? (
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
                  visible={loadingThreeBlocksThree}
                />
              </div>
            </div>
          ) : threeBlocksTwo?.length ? (
            <div className="row row-item">
              {threeBlocksThree?.map((block, index) => (
                <div
                  key={`3-block-setting-${block.block_id}`}
                  className="col-sm-4 col-item"
                >
                  <div className="BandBox">
                    <div className="BandBoxhead">
                      <h2>{block.block_title}</h2>
                      {block.block_subTitle1 ? (
                        <h3>{block.block_subTitle1}</h3>
                      ) : null}
                    </div>
                    <div className={`HomeBlockImg`}>
                      <Image
                        className="img-fluid"
                        src={block.block_image}
                        alt={block.block_title}
                        width={300}
                        height={200}
                      />
                    </div>
                    <p>{block.block_description}</p>

                    <Link href={block?.block_button_link} passHref>
                      <a className="btn BtnLearn">LEARN MORE</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <AddBannerComponent
            data={getHomePageAdsData_data}
            status={getHomePageAdsData_status}
            position={UNDER_BANNER}
            index={homeBannerTopIndex}
          />
        </div>
      </div>


      {<ThreeNewsBlock category={'Military'} limit={3} />}
      <AddBannerComponent
        data={getHomePageAdsData_data}
        status={getHomePageAdsData_status}
        position={ABOVE_GALLERY_Index}
        index={homeBannerBottomIndex}
      />

      {<FourNewsBlock category={'Drone Education'} limit={4} />}

      {<ThreeNewsBlock category={'Skills Training, Drone Racing Video'} limit={3} />}


      {/* {<PhotoGallery />}
      <AddBannerComponent
        data={getHomePageAdsData_data}
        status={getHomePageAdsData_status}
        position={ABOVE_GEAR_REVIEW_Index}
        index={abovegearReview}
      />

      {<GearReview />}

      <AddBannerComponent
        data={getHomePageAdsData_data}
        status={getHomePageAdsData_status}
        position={UNDER_GEAR_REVIEW_Index}
        index={underGearReview}
      />

      {loadingFreeTraining ? (
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
              visible={loadingFreeTraining}
            />
          </div>
        </div>
      ) : freeTrainingBlocks.length ? (
        <div className="FreeTraning paddngtb text-center">
          <div className="container">
            <div className="MainHeading">
              <h1>Droning Stuff</h1>
            </div>
            <div className="row">
              <div className="offset-sm-2 col-sm-8">
                <div className="row">
                  {freeTrainingBlocks.map((block, index) => (
                    <div key={`training-block-${index}`} className="col-sm-6">
                      <div className="FreeTraningBox">
                        <img
                          className="img-fluid"
                          src={block.block_image}
                          alt={block.block_title}
                        />
                        <div className="TraningTitle">{block.block_title}</div>
                        <p>{block.block_description}</p>
                        <div className="clear">&nbsp;</div>
                        <div className="clear">&nbsp;</div>
                        <div className="clear">&nbsp;</div>
                        <Link href={block?.block_button_link} passHref>
                          <a className="btn BtnLearn">LEARN MORE</a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}




      {/* <div className="DroneVideoArea text-left d-block d-sm-none">
        <iframe
          height="600"
          src="https://www.youtube.com/embed/yZncGFg85pw"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="DroneVideoContent">
                <h1>Newest X500 Drone</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur asha adipiscing elit,
                  sed do eiusmod tempordhululu incididunt ut labore et dolore
                  magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      {/* <div className="FeatruedPilotArea">
        <div className="container">
          <div className="row">
            {<FeaturePilot />}

            <div className="col-md-6 paddnglr">
              <div className="BestPilot">
                <div className="MainHeading">
                  <h1>
                    Meet the best Pilots for <br />
                    your needs and budget
                  </h1>
                </div>
                <div className="row text-center">
                  <div className="col-sm-4">
                    <div className="row BestPilotBox">
                      <div className="col-12 col-sm-12">
                        <img
                          className="img-fluid IconImg"
                          src={`/images/ic1.png`}
                          alt="sign up/create an account"
                        />
                      </div>
                      <div className="col-12 col-sm-12">
                        <div className="BestSteps">
                          <h5>Sign up/create an account</h5>
                          <p>Join our community and take flight! </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="row BestPilotBox">
                      <div className="col-12 col-sm-12">
                        <img
                          className="img-fluid IconImg"
                          src={`/images/ic2.png`}
                          alt="Search for a drone pilot"
                        />
                      </div>
                      <div className="col-12 col-sm-12">
                        <div className="BestSteps">
                          <h5>Search for a drone pilot</h5>
                          <p>Your perfect drone pilot awaits. </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="row BestPilotBox">
                      <div className="col-12 col-sm-12">
                        <img
                          className="img-fluid IconImg"
                          src={`/images/ic3.png`}
                          alt="Get your job done"
                        />
                      </div>
                      <div className="col-12 col-sm-12">
                        <div className="BestSteps">
                          <h5>Create a Job Listing</h5>
                          <p>Start your search for a certified Drone Pilot </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link className="btn BtnGetStarted" href="/registration">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* { loadingThreeBlocks ? (
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
              visible={loadingThreeBlocks}
            />
          </div>
        </div>
      ) : threeBlocks?.length ? (
        <div className={`HireArea BandArea text-left paddngtb`}>
          <div className="container">
            <div className="row row-item">
              {threeBlocks?.map((block, index) => (
                <div
                  key={`3-block-setting-${block.block_id}`}
                  className="col-sm-4 col-item"
                >
                  <div className="BandBox">
                    <div className="BandBoxhead">
                      <h1>{block.block_title}</h1>
                      {block.block_subTitle1 ? (
                        <h3>{block.block_subTitle1}</h3>
                      ) : null}
                    </div>
                    <div className={`HomeBlockImg`}>
                      <img
                        className="img-fluid"
                        src={block.block_image}
                        alt={block.block_title}
                      />
                    </div>
                    <p>{block.block_description}</p>

                    <Link href={block?.block_button_link} passHref>
                      <a className="btn BtnLearn">LEARN MORE</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null} */}

    </Fragment>
  );
};

export default Home;
