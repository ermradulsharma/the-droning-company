import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import TrendingNews from "../../components/Category/TrendingNews";
import GearReview from "../../components/Category/GearReview";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../../components/UI/Pagination/Pagination";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
import Loader from "@/components/Common/Loader";
import parse from "html-react-parser";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
import SearchLocationInput from "../../components/SearchLocationInput/SearchLocationInput";
import { useRouter } from "next/router";
const Icon2 = "/images/ic2.png";
const Icon3 = "/images/ic3.png";
const Icon1 = "/images/ic1.png";
const CategoryPilot = () => {
  let history = useRouter();
  const { location, locationString, setSearchLocation } =
    useCommonFunctionContext();
  const locationCity = history.query.locationCity;
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount, setPerPageCount] = useState("");
  const [totalPostCount, setTotalPostCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [skillId, setSkillId] = useState("");
  const [skillCategories, setSkillCategories] = useState([]);
  const [limitSkillNumber, setLimitSkillNumber] = useState(5);
  const [limitSkillLabel, setLimitSkillLabel] = useState("Show more");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    getFeaturedProfile();
    getPilotSkills();
  }, [getFeaturedProfile, getPilotSkills]);
  //console.log(locationCity)
  // const getFeaturedProfile = async () => {
  //   setLoading(true);
  //   try {
  //     console.log(location, locationCity);

  //     let url = `${SERVER_URL}/category/pilot-feature?&skill=${skillId}&page=${currentPage}`;

  //     if (location !== undefined || locationCity !== undefined) {
  //       url = `${SERVER_URL}/category/pilot-feature?q=${
  //         location || locationCity
  //       }&skill=${skillId}&page=${currentPage}`;
  //     }

  //     await fetch(
  //       `${SERVER_URL}/category/pilot-feature?q=${
  //         location || locationCity
  //       }&skill=${skillId}&page=${currentPage}`,
  //       {
  //         method: "GET",
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((response) => {
  //         setLoading(false);
  //         if (response.statusCode === 200) {
  //           setProfiles(response.data);
  //           setPerPageCount(4);
  //           setTotalPostCount(response.profile_count);
  //         } else if (response.statusCode === 404) {
  //           setProfiles(response.data);
  //           setTotalPostCount("");
  //         }
  //       });
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };


  const getFeaturedProfile = useCallback(async () => {
    setLoading(true)
    try {
      await fetch(`${SERVER_URL}/category/pilot-feature?skill=${skillId}&page=${currentPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.statusCode === 200) {
            setProfiles(response.data);
            setPerPageCount(4);
            setTotalPostCount(response.profile_count);
          } else if (response.statusCode === 404) {
            setProfiles(response.data);
            setTotalPostCount('');
          }
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, [skillId, currentPage]);

  const getPilotSkills = useCallback(async () => {
    setLoading(true);
    try {
      await fetch(`${SERVER_URL}/skill-categories`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === 200) {
            setSkillCategories(response.data);
          }
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, []);

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
    setSearchLocation(obj);
    let city = locationString.split(",")[0];
    city !== undefined && history.push(`/pilot-list/${city}`);
  };

  const changeLimitLabel = (limit, total) => {
    if (limit === 5) {
      setLimitSkillLabel("Show less");
      setLimitSkillNumber(total);
    } else {
      setLimitSkillLabel("Show more");
      setLimitSkillNumber(5);
    }
  };

  const getSkills = (skills) => {
    let skillArray = skills.split(",");
    if (skillArray.length) {
      return skillArray
        .filter((value, index) => index < limitSkillNumber)
        .map((skill, index) => (
          <li key={`profile-skill-${index}`}>
            <span className="badge badge-warning cr-pointer">{skill}</span>
          </li>
        ));
    }
  };
  return (
    <Aux>
      <div className="Banner d-none d-sm-block">
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
                        locationString={locationString ? locationString : ""}
                      //locationSelect = {locationSelectHandler}
                      />
                      <button
                        className="btn BtnSearch"
                        type="button"
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
              <label>Filter By Specialization</label>
              <select
                className="form-control"
                onChange={(e) => setSkillId(e.target.value)}
                defaultValue=""
              >
                <option value="">Select Specialization</option>
                {skillCategories.length ? (
                  skillCategories.map((skill, index) => {
                    return (
                      <option key={`skill-${index}`} value={skill.id}>
                        {skill.skill_name}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No Specialization found</option>
                )}
              </select>
            </form>
          </div>
        </div>
      </div>

      <div className="FeatruedPilotArea">
        <div className="container">
          <div className="row">
            <div className="col-md-6 paddngt">
              <div className="MainHeading text-left">
                <h1>Featured Pilots</h1>
              </div>

              {loading ? (
                <>
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
                </>
              ) : (
                <>
                  {profiles.length ? (
                    profiles.map((profile, index) => {
                      return (
                        <div className="row PilotBox" key={`profile-${index}`}>
                          <div className="col-4 col-sm-4">
                            <div className="PilotImg">
                              <Link legacyBehavior href={`/pilot/${profile.slug}`}>
                                <a href={`/pilot/${profile.slug}`}><Image className="img-fluid" src={`${MEDIA_BASE_URL}/${getCleanImageUrl(profile.image)}`} alt="pilot" width={300} height={300} /></a>
                              </Link>
                            </div>
                          </div>
                          <div className="col-8 col-sm-8">
                            <div className="PilotInfo">
                              <h1>{profile.name}</h1>
                              <br />
                              <p>{profile.title}</p>
                              <ul className="PilotSkills">
                                {/* {
                                                            profile.skills.split(',').filter((skill, index) => index < 5).map((exploaded_skill, index) => {
                                                                return <li><span className="badge badge-warning cr-pointer">{exploaded_skill}</span></li>
                                                            })
                                                        } */}
                                {getSkills(profile.skills)}
                                {profile.skills.split(",").length > 5 ? (
                                  <li>
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        changeLimitLabel(
                                          limitSkillNumber,
                                          profile.skills.length
                                        )
                                      }
                                    >
                                      {limitSkillLabel}
                                    </span>
                                  </li>
                                ) : null}
                              </ul>
                              {profile.description ? (
                                <div className="PilotText">
                                  {parse(`${profile.description}`)}{" "}
                                </div>
                              ) : null}
                              <Link legacyBehavior href={`/pilot/${profile.slug}`}>
                                <a
                                  className="SeeMore"
                                  href={`/pilot/${profile.slug}`}
                                >
                                  View Profile &gt;
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <div className="BannerTitle" style={{ color: "#fecd0e" }}>
                        Not finding the perfect match?
                      </div>
                      <Link legacyBehavior href="/find-drone-pilot">
                        <a className="btn btnRegister">
                          Click here to request a drone pilot in your area
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  )}

                  {profiles.length ? (
                    <Aux>
                      <div style={{ marginBottom: "10px" }}>
                        <div
                          className="BannerTitle"
                          style={{ color: "#fecd0e" }}
                        >
                          Not finding the perfect match?
                        </div>
                        <Link legacyBehavior href="/find-drone-pilot">
                          <a
                            className="btn btnRegister"
                          >
                            Click here to request a drone pilot in your area
                            <i className="fas fa-arrow-right"></i>
                          </a>
                        </Link>
                      </div>
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
                </>
              )}
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
                    <Image
                      className="img-fluid IconImg"
                      src={Icon1}
                      alt="sign up/create an account"
                      width={100}
                      height={100}
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
                    <Image
                      className="img-fluid IconImg"
                      src={Icon2}
                      alt="Search for a drone pilot"
                      width={100}
                      height={100}
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
                    <Image
                      className="img-fluid IconImg"
                      src={Icon3}
                      alt="Get your job done"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="col-8 col-sm-8">
                    <div className="BestSteps">
                      <h5>Create a Job Listing</h5>
                      <p>Start your search for a certified Drone Pilot</p>
                    </div>
                  </div>
                </div>
                <Link legacyBehavior href="/registration">
                  <a className="btn BtnGetStarted">Get Started</a>
                </Link>
                <TrendingNews />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="clearfix"></div>

      <GearReview />

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

export default CategoryPilot;
