import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import FeaturePilotNew from "../components/Home/FeaturePilotNew";
import FeaturePilotVideo from "../components/Home/FeaturePilotVideo";
import FeatureCompany from "../components/Home/FeatureCompany";
import NewSectionNew from "../components/Home/NewSectionNew";
import SettingBlock from "../components/Home/SettingBlock";
import ArticleByCategoryBlock from "../components/Home/ArticleByCategoryBlock";
import VideoReelOfWeek from "../components/Home/VideoReelOfWeek";
import RecentEventsBlock from "../components/Event/RecentEventsBlock";
import FeaturedVideoReel from "../components/Home/FeaturedVideoReel";
import SearchLocationInput from "../components/SearchLocationInput/SearchLocationInput";
import { useRouter } from "next/router";
import useCommonFunctionContext from "../hooks/useCommonFunctionContext";
import { SERVER_URL, APPLICATION_NAME } from "../util/Constants";
import Loader from "react-loader-spinner";
import SEO from "../components/Seo/Seo";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageAdsData } from "../redux/HomePageSlice";
import { generateRandomBannerIndex, randomRangeIndex } from "../util/utils";
import AddBannerComponent from "../components/AddBannerComponent/AddBannerComponent";
import Aux from '../hoc/Auxiliary/Auxiliary';
import useAuthContext from '../hooks/useAuthContext';

import Calendar from "../components/Event/calendar.tsx";
import Image from 'next/image';

/*import AddBan from "../components/Addbanner/AddBan";
import FeaturePilot from "../components/Home/FeaturePilot";
import PhotoGallery from "../components/Home/PhotoGallery";
import GearReview from "../components/Home/GearReview";
import FourNewsBlock from "../components/Home/FourNewsBlock";
import ThreeNewsBlock from "../components/Home/ThreeNewsBlock";*/

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [freeTrainingBlocks, setFreeTrainingBlocks] = useState([]);
  const [loadingFreeTraining, setLoadingFreeTraining] = useState(true);
  const [threeBlocks, setThreeBlocks] = useState([]);
  const [loadingThreeBlocks, setLoadingThreeBlocks] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);

  const { authTokens, accessToken, userType } = useAuthContext();

  const [searchKeyword, setSearchKeyword] = useState("");
  const onSearchCompany = () => {
    router.push(`/company-directory/${searchKeyword}`);
  };

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
  const [homeBannerCommunityNewsIndex, sethomeBannerCommunityNewsIndex] = useState(0);

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
                        <Link href="/registration">
                          <a className="btn BtnSearch w-100">Join the team</a>
                        </Link>
                      </div>
                    </div>
                  </form>

                  <div className="clearfix"></div>

                  {/* <form action="" method="get" _lpchecked="1" className="SearchBar HirePilotForm text-center">
                    <div className="form-inline">
                      <input
                        type="text"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        value={searchKeyword}
                        className="form-control bg-light border-0 small"
                        placeholder="Search Company By Name..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        style={{ minWidth: '301px' }}
                      />
                      <button className="btn BtnSearch" type="button" onClick={() => onSearchCompany()} style={{ borderRadius: '0 20px 20px 0', paddingRight: 20 }}><i className="fas fa-search fa-sm"></i></button>
                    </div>
                  </form> */}


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
            <div className="col-sm-4 mb-3">
              {<FeaturePilotVideo />}
              {/* {<FeaturedVideoReel />} */}
              {/* <VideoReelOfWeek category={'Video Reel of the Week'} slug={'video-reel-of-the-week'} title={'Video Reel of the Week'} limit={1} /> */}
            </div>
            <div className="col-sm-4 mb-3">
              {<FeaturePilotNew />}
            </div>
            <div className="col-sm-4 mb-3">
              {<FeatureCompany />}
            </div>
          </div>

          <div className="row row-item">
            <div className="col-sm-4 mb-3">
              <SettingBlock ids={'6'} limit={1} />
            </div>
            <div className="col-sm-4 mb-3">
              <SettingBlock ids={'12'} limit={1} />
            </div>
            <div className="col-sm-4 mb-3">
              <SettingBlock ids={'13'} limit={1} />
            </div>
          </div>

          <div className="yellow-separator mt-30"></div>
          <>
            <AddBannerComponent
              data={getHomePageAdsData_data}
              status={getHomePageAdsData_status}
              position={UNDER_BANNER}
              index={homeBannerTopIndex}
            />
          </>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <div className="card no-border-radius">
                <div className="card-header">Company Directory</div>
                <div className="card-body company">
                  <a href={`/company-directory`} style={{ textAlign: "center" }}>
                    {/* <img className="img-fluid" src={'images/Company-Directory-Icon.png'} alt="Company Directory" /> */}
                    <Image
                      src={'/images/Company-Directory-Icon.png'}
                      alt="Company Directory"
                      className="img-fluid"
                      onLoad={() => setLoadingImage(false)}
                      width={200}
                      height={200}
                      priority={true}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 mb-3">
              <div className="card no-border-radius">
                <div className="card-header">Pilots</div>
                <div className="card-body pilots">
                  <a href={`/pilot-list`} style={{ textAlign: "center" }}>
                    {/* <img className="img-fluid" src={'images/drone-pilot-icon.png'} alt="Pilots" /> */}
                    <Image
                      src={'/images/drone-pilot-icon.png'}
                      alt="Pilots"
                      className="img-fluid"
                      onLoad={() => setLoadingImage(false)}
                      width={200}
                      height={200}
                      priority={true}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="social_box_lg">
            <fieldset>
              <legend>YouTube</legend>
              <h2><a href={'https://www.youtube.com/@droningcompany9844/videos'} target="_blank">Follow Us on YouTube!</a></h2>
            </fieldset>
          </div>

          <>
            <AddBannerComponent
              data={getHomePageAdsData_data}
              status={getHomePageAdsData_status}
              position={ABOVE_GALLERY_Index}
              index={homeBannerBottomIndex}
            />
          </>

          <div className="row">
            <div className="social_box_lg newsletter col-md-8">
              <fieldset>
                <legend>Newsletter</legend>
                <h2>Get Our Newsletter!</h2>
                <h5>Don&apos;t miss out on essential news, industry updates, hot videos and photos, gear reviews, and more!</h5>
                <iframe src="https://gem.godaddy.com/signups/d12a43bb226645dc8d2b0f328832d678/iframe" scrolling="no" frameborder="0" height="186" style={{ maxWidth: '400px', width: '100%' }}></iframe>
                {/* <iframe src="https://ThankYou.formstack.com/forms/tdc_signup" title="The droning company website sign up - 12/22" style={{ border: "none" }} width="100%" height="250"></iframe> */}
              </fieldset>
            </div>
            <div className="col-md-4 align-self-center FOUNDERSCOLUMN">
              <SettingBlock ids={'4'} limit={1} />
            </div>
          </div>

          <div className="social_box_lg">
            <fieldset>
              <legend>Store</legend>
              <a href="/store">
                <h2>Drones <span className="text-sep">---</span> Accessories <span className="text-sep">---</span> And More</h2>
                {/* <img className="img-fluid" src={'images/Drones-Accessories-And-More.jpg'} alt="Drones Accessories And More" /> */}
                <Image
                  src={'/images/Drones-Accessories-And-More.jpg'}
                  alt="Drones Accessories And More"
                  className="img-fluid"
                  onLoad={() => setLoadingImage(false)}
                  width={1102}
                  height={284}
                  priority={true}
                />
              </a>
            </fieldset>
          </div>

          <div className="row">
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Consumer Drones'} slug={'consumer-drones'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Prosumer Drones'} slug={'prosumer-drones'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Enterprise Drones'} slug={'enterprise-drones'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'FPV Drones'} slug={'fpv-drones'} limit={1} />
            </div>
          </div>
          <>
            <AddBannerComponent
              data={getHomePageAdsData_data}
              status={getHomePageAdsData_status}
              position={ABOVE_GALLERY_Index}
              index={homeBannerBottomIndex}
            />
          </>
          <div className="yellow-separator"></div>

          <div className="row">
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'3D Mapping'} slug={'3d-mapping'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Thermal'} slug={'thermal'} title={'Thermal Imaging'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'LIDAR'} slug={'lidar'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Software'} slug={'software'} title={'Drone Software'} limit={1} />
            </div>
          </div>

          <div className="communityNewsSection">
            <div className="row">
              <div className="col-md-9">
                <h3 style={{ backgroundColor: '#fecd0e', textAlign: 'center', padding: 5, borderRadius: 4, color: '#000', fontWeight: '600' }}>Community Events</h3>
                <Calendar />
                <div className="row mt-3">
                  <div className="col-md-9">
                    <RecentEventsBlock limit={10} skip={0} />
                    <div className="yellow-separator mt-30"></div>

                    <div className="submitEventBlock">
                      <h2>Submit an Event</h2>
                      <p>If you or someone you know wants to have a local droning event, list it here!</p>
                      <div className="row">
                        <div className="col-md-6"><a className="btn Btnblock w-100" href="/event-submission">Read More</a></div>
                        <div className="col-md-6">
                          {authTokens && accessToken ?
                            <a className="btn Btnblock w-100" href="/event/submit-event">Post Your Event</a>
                            :
                            <a className="btn Btnblock w-100" href="/login">Post Your Event</a>
                          }
                        </div>
                      </div>
                    </div>
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
              <div className="col-md-3 sideBlogs">
                <ArticleByCategoryBlock category={'Interviews'} slug={'interviews'} limit={1} />
                <ArticleByCategoryBlock category={'Pilots Stories'} slug={'pilots-stories'} limit={1} />
                <ArticleByCategoryBlock category={'Drone Education'} slug={'drone-education'} limit={1} />
                <ArticleByCategoryBlock category={'Drone Jobs'} slug={'drone-jobs'} limit={1} />
                <ArticleByCategoryBlock category={'Expos'} slug={'expos'} title={'Drone Expos'} limit={1} />
              </div>
            </div>
          </div>

          <AddBannerComponent
            data={getHomePageAdsData_data}
            status={getHomePageAdsData_status}
            position={ABOVE_GALLERY_Index}
            index={homeBannerBottomIndex}
          />
          <div className="row">
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Power Washing'} slug={'power-washing'} title={'Power Washing Drones'} limit={1} image={'/images/categories/Powerwashing.jpg'} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Drone Delivery'} slug={'drone-delivery'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Agriculture'} slug={'agriculture'} title={'Agriculture Drones'} limit={1} image={'/images/categories/Agriculture.jpg'} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Light Shows'} slug={'light-shows'} title={'Drone Light Shows'} limit={1} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Insurance'} slug={'insurance'} title={'Drone Insurance'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Accessories'} slug={'accessories'} title={'Drone Accessories'} limit={1} /> {/*image={'/images/categories/Accessories.jpg'} */}
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Retailers'} slug={'retailers'} title={'Drone Retailers'} limit={1} />
            </div>
            <div className="col-md-3">
              <ArticleByCategoryBlock category={'Repair'} slug={'repair'} title={'Drone Repair'} limit={1} />
            </div>
          </div>

          <>
            <AddBannerComponent
              data={getHomePageAdsData_data}
              status={getHomePageAdsData_status}
              position={ABOVE_GALLERY_Index}
              index={homeBannerBottomIndex}
            />
          </>
          <div className="NewsSection3Col">
            <div className="row">
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Tactical and Law Enforcement'} title={'Tactical & Law Enforcement'} slug={'tactical-and-law-enforcement'} limit={1} column={3} /> {/*image={'/images/categories/Tactical-&-Law-Enforcement.jpg'} */}
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Search and Rescue'} title={'Search & Rescue'} slug={'search-and-rescue'} limit={1} column={3} />
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Military'} slug={'military'} title={'Military Drones'} limit={1} column={3} /> {/*image={'/images/categories/Military-Drones.jpg'} */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Drone Threats'} slug={'drone-threats'} title={'Defeating Drone Threats'} limit={1} column={3} /> {/*image={'/images/categories/Defeating-Drone-Threats.jpg'} */}
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'FAA Updates'} slug={'faa-updates'} limit={1} column={3} /> {/*image={'/images/categories/FAA-Logo.jpg'} */}
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Gear Reviews'} slug={'gear-reviews'} limit={1} column={3} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Forestry and Firefighting'} title={'Forestry & Firefighting'} slug={'forestry-and-firefighting'} limit={1} column={3} />
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'General News'} slug={'general-news'} limit={1} column={3} />
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Evolving Tech'} slug={'evolving-tech'} limit={1} column={3} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Flying Cars'} slug={'flying-cars'} limit={1} column={3} /> {/*image={'/images/categories/Flying-Cars.jpg'} */}
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'The Droning Awards'} slug={'the-droning-awards'} limit={1} column={3} image={'/images/The-Droning-Awards.jpg'} />
              </div>
              <div className="col-md-4">
                <ArticleByCategoryBlock category={'Miscellaneous'} slug={'miscellaneous'} limit={1} column={3} />
              </div>
            </div>
          </div>

        </div>
      </div>

    </Fragment >
  );
};

export default Home;
