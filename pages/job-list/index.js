import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import TrendingNews from "../../components/Category/TrendingNews";
import GearReview from "../../components/Category/GearReview";
import Link from "next/link";
import Pagination from "../../components/UI/Pagination/Pagination";
import { SERVER_URL } from "../../util/Constants";
import Loader from "@/components/Common/Loader";
import parse from "html-react-parser";
import SearchLocationInput from "../../components/SearchLocationInput/SearchLocationInput";
import { useRouter } from "next/router";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
import { useDispatch, useSelector } from "react-redux";
import { getJobPageAdsData } from "../../redux/HomePageSlice";
import { generateRandomBannerIndex } from "../../util/utils";
import AddBan from "../../components/Addbanner/AddBan";
//import insuredIcon from "../../assets/user-pilot/droneinsuredicon.png";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount, setPerPageCount] = useState("");
  const [totalPostCount, setTotalPostCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobLocation, setJobLocation] = useState("");
  //const [skillCategories, setSkillCategories] = useState([]);
  const { location, setSearchLocation, setLocationString } =
    useCommonFunctionContext();
  const [limitNumber, setLimitNumber] = useState(5);
  const [limitLabel, setLimitLabel] = useState("Show more");
  let history = useRouter();

  const dispatch = useDispatch();

  const {
    getJobPageAdsData_status,
    getJobPageAdsData_data,
    getJobPageAdsData_error,
  } = useSelector((state) => state?.home ?? {});

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    getJobs();
    dispatch(getJobPageAdsData());
    //getPilotSkills();
  }, [currentPage, jobLocation]);

  const getJobs = async () => {
    setLoading(true);
    try {
      await fetch(
        `${SERVER_URL}/job/list?q=${jobLocation}&page=${currentPage}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.statusCode === 200) {
            setJobs(response.data);
            setPerPageCount(4);
            setTotalPostCount(response.job_count);
          } else if (response.statusCode === 404) {
            setJobs(response.data);
            setTotalPostCount("");
          }
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  /* const getPilotSkills = async() => {
        setLoading(true);
        try {
            await fetch(`${SERVER_URL}/skill-categories`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    if (response.statusCode === 200) {
                        setSkillCategories(response.data);
                    }                    
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
        }
    } */

  const onPageChangeHandler = (pageNum) => {
    setCurrentPage(pageNum);
  };
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
    history.push(`/pilot-list/${city}`);
  };

  const jobLocationSelectHandler = (location) => {
    console.log(location);
    if (!location) {
      setJobLocation("");
    }
    if (typeof location === "object") {
      setJobLocation(JSON.stringify(location));
    }
  };

  const changeLimitLabel = (limit, total) => {
    if (limit === 5) {
      setLimitLabel("Show less");
      setLimitNumber(total);
    } else {
      setLimitLabel("Show more");
      setLimitNumber(5);
    }
  };

  const listJobLocations = (location) => {
    return location.map((data, index) => {
      if (index < limitNumber)
        return (
          <li>
            {data.city}
            {data.state ? ", " + data.state : ""}
          </li>
        );
    });
  };

  const [topbannerIndex, setTopbannerIndex] = useState(0);
  const [bottombannerIndex, setBottombannerIndex] = useState(0);
  const [above_footer_bannerIndex, setAbove_footer_bannerIndex] = useState(0);
  const [above_gear_reviews_index, setabove_gear_reviews_index] = useState(0);
  const [UNDER_GEAR_REVIEW_Index, setUNDER_GEAR_REVIEW_Index] = useState(0);
  const [underGearReview, setUnderGearReview] = useState(false);

  useEffect(() => {
    if (getJobPageAdsData_data) {
      let undergearreview_index = getJobPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "under-gear-reviews"
      );
      let abovefooter_index = getJobPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-footer"
      );
      let abovegearreviews_index = getJobPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-gear-reviews"
      );
      setAbove_footer_bannerIndex(abovefooter_index);
      setabove_gear_reviews_index(abovegearreviews_index);
      setUNDER_GEAR_REVIEW_Index(undergearreview_index);

      setTopbannerIndex(
        generateRandomBannerIndex(
          "jobPageTopBannerIndex",
          getJobPageAdsData_data[abovegearreviews_index]?.banner?.length || 0
        )
      );
      setBottombannerIndex(
        generateRandomBannerIndex(
          "jobPageBottomBannerIndex",
          getJobPageAdsData_data[abovefooter_index]?.banner?.length || 0
        )
      );
      setUnderGearReview(
        generateRandomBannerIndex(
          "jobPage_UNDER_GEAR_REVIEW_Index",
          getJobPageAdsData_data[undergearreview_index]?.banner?.length || 0
        )
      );
    }
  }, [getJobPageAdsData_data]);

  return (
    <Aux>
      <div className="Banner d-sm-block">
        <div className="BannerInner BannerInn-category">
          <div className="container">
            {loading && (
              <div className="row">
                <div
                  className="offset-sm-3 col-sm-6"
                  style={{ textAlign: "center" }}
                >
                  <Loader
                    type="ThreeDots"
                    color="#ffcc0e"
                    height={100}
                    width={100}
                    visible={loading}
                  />
                </div>
              </div>
            )}
            <div className="row">
              <div className="offset-sm-3 col-sm-6">
                <div className="BannerText">
                  <div className="BannerTitle">
                    Professional Shots<br></br> by pro drone pilots
                  </div>
                  <div className="clearfix"></div>
                  <form className="SearchBar">
                    <div className="form-group">
                      <SearchLocationInput
                        className="form-control w-60"
                        placeholder="Search Pilots by Location"
                      />
                      <button
                        className="btn BtnSearch"
                        onClick={() => onSearchPilotByLocation()}
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="FilterArea">
        <div className="container">
          <div className="row">
            <form className="col-lg-10 offset-lg-2 form-inline FilterForm text-center">
              <label>Filter Job By Location</label>
              <SearchLocationInput
                className="form-control w-60"
                placeholder="Search jobs by Location"
                locationSelect={jobLocationSelectHandler}
              />
            </form>
          </div>
        </div>
      </div>

      <div className="FeatruedPilotArea">
        <div className="container">
          <div className="row">
            <div className="col-md-6 paddngt">
              <div className="MainHeading text-left">
                <h1>Find a Job</h1>
              </div>
              {jobs.length ? (
                jobs.map((job, index) => {
                  return (
                    <div className="row PilotBox" key={job.id}>
                      <div className="col-12 col-sm-12">
                        <div className="PilotInfo PilotJobInfo">
                          <h1>{job.job_title}</h1>
                          <br />
                          {/* <h1><Link to={`/job/${job.id}`} title={job.job_title} >{job.job_title}</Link></h1> */}
                          <ul>
                            {listJobLocations(job.location)}
                            {job.location.length > 5 ? (
                              <li style={{ backgroundColor: "#fff" }}>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    changeLimitLabel(
                                      limitNumber,
                                      job.location.length
                                    )
                                  }
                                >
                                  {limitLabel}
                                </span>
                              </li>
                            ) : null}
                          </ul>

                          {job.job_description ? (
                            <p className="PilotText">
                              {parse(`${job.job_description.substr(0, 80)}`)}{" "}
                            </p>
                          ) : null}
                          <br />
                          <Link
                            className="SeeMore"
                            href={`/job/${job.id}/${job.slug}`}
                          >
                            View Job &gt;
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <p>No jobs found</p>
                  {/* <div className="BannerTitle" style={{color:'#fecd0e'}}>Not finding the perfect match?</div>
                                    <Link className="btn btnRegister" to="/find-drone-pilot">Click here to request a drone pilot in your area<i className="fas fa-arrow-right"></i></Link> */}
                </div>
              )}

              {jobs.length ? (
                <Aux>
                  {/* <div style={{marginBottom:'10px'}}>
                                        <div className="BannerTitle" style={{color:'#fecd0e'}}>Not finding the perfect match?</div>
                                        <Link className="btn btnRegister" to="/find-drone-pilot">Click here to request a drone pilot in your area<i className="fas fa-arrow-right"></i></Link>
                                    </div> */}
                  <nav aria-label="Page navigation example">
                    <Pagination
                      total={totalPostCount}
                      pageLimit={4}
                      dataLimit={perPageCount}
                      pageChange={onPageChangeHandler}
                      cPage={currentPage}
                    />
                  </nav>
                </Aux>
              ) : null}
            </div>

            <div className="col-md-6 paddnglr">
              <div className="BestPilot">
                <div className="MainHeading">
                  <h1>
                    Meet the best Pilots for<br></br> your needs and budget
                  </h1>
                </div>
                <div className="row BestPilotBox">
                  <div className="col-4 col-sm-4">
                    <img
                      className="img-fluid IconImg"
                      src={`/images/ic1.png`}
                      alt="sign up/create an account"
                    />
                  </div>
                  <div className="col-8 col-sm-8">
                    <div className="BestSteps">
                      <h5>Sign up/create an account</h5>
                      <p>Join our community and take flight!</p>
                    </div>
                  </div>
                </div>
                <div className="row BestPilotBox">
                  <div className="col-4 col-sm-4">
                    <img
                      className="img-fluid IconImg"
                      src={`/images/ic2.png`}
                      alt="Search for a drone pilot"
                    />
                  </div>
                  <div className="col-8 col-sm-8">
                    <div className="BestSteps">
                      <h5>Search for a drone pilot</h5>
                      <p>Your perfect drone pilot awaits.</p>
                    </div>
                  </div>
                </div>
                <div className="row BestPilotBox">
                  <div className="col-4 col-sm-4">
                    <img
                      className="img-fluid IconImg"
                      src={`/images/ic3.png`}
                      alt="Get your job done"
                    />
                  </div>
                  <div className="col-8 col-sm-8">
                    <div className="BestSteps">
                      <h5>Create a Job Listing</h5>
                      <p>Start your search for a certified Drone Pilot</p>
                    </div>
                  </div>
                </div>
                <Link href="/registration">
                  <a className="btn BtnGetStarted">Get Started</a>
                </Link>
                <TrendingNews />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="clearfix"></div>
      {getJobPageAdsData_status === "loading" ||
        getJobPageAdsData_data === null ? (
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
                getJobPageAdsData_status === "loading" ||
                getJobPageAdsData_data === null
              }
            />
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          {getJobPageAdsData_data && (
            <AddBan
              href={
                getJobPageAdsData_data[above_gear_reviews_index]?.banner[
                  topbannerIndex
                ]?.link
              }
              src={
                getJobPageAdsData_data[above_gear_reviews_index]?.banner[
                  topbannerIndex
                ]?.banner_image_full_path
              }
            />
          )}
        </div>
      )}

      <GearReview>
        {getJobPageAdsData_status === "loading" ||
          getJobPageAdsData_data === null ? (
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
                  getJobPageAdsData_status === "loading" ||
                  getJobPageAdsData_data === null
                }
              />
            </div>
          </div>
        ) : (
          <div className="container mt-5">
            {getJobPageAdsData_data && (
              <AddBan
                href={
                  getJobPageAdsData_data[UNDER_GEAR_REVIEW_Index]?.banner[
                    underGearReview
                  ]?.link
                }
                src={
                  getJobPageAdsData_data[UNDER_GEAR_REVIEW_Index]?.banner[
                    underGearReview
                  ]?.banner_image_full_path
                }
              />
            )}
          </div>
        )}
      </GearReview>

      {getJobPageAdsData_status === "loading" ||
        getJobPageAdsData_data === null ? (
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
                getJobPageAdsData_status === "loading" ||
                getJobPageAdsData_data === null
              }
            />
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          {getJobPageAdsData_data && (
            <AddBan
              href={
                getJobPageAdsData_data[above_footer_bannerIndex]?.banner[
                  bottombannerIndex
                ]?.link
              }
              src={
                getJobPageAdsData_data[above_footer_bannerIndex]?.banner[
                  bottombannerIndex
                ]?.banner_image_full_path
              }
            />
          )}
        </div>
      )}

      <div className="SignUpBox paddngtb signupBackground">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <h1>
                Sign up for an account for free
                <br /> and get the help you need!
              </h1>
              <p>
                Take flight with the Droning Company and meet the perfect drone
                pilot to match your needs and budget. Sign up today to join our
                community.
              </p>
            </div>
            <div className="col-sm-5">
              <button
                className="btn GetStarted"
                onClick={() => history.push("/registration")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default JobList;
