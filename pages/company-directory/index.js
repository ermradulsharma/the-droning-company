import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import TrendingNews from "../../components/Category/TrendingNews";
import GearReview from "../../components/Category/GearReview";
import Link from "next/link";
import Pagination from "../../components/UI/Pagination/Pagination";
import { SERVER_URL, MEDIA_BASE_URL } from "../../util/Constants";
import Loader from "react-loader-spinner";
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
    getCompanyServices();
  }, [location, locationCity, currentPage, skillId]);

  const getFeaturedProfile = async () => {
    setLoading(true)
    try {
      await fetch(`${SERVER_URL}/category/company-feature?service=${skillId}&page=${currentPage}`, {
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
  }

  const getCompanyServices = async () => {
    setLoading(true);
    try {
      await fetch(`${SERVER_URL}/services`, {
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
  };

  const onPageChangeHandler = (pageNum) => {
    setCurrentPage(pageNum);
  };
  const onSearchCompanyByLocation = async () => {
    let obj = document
      .getElementById("location-input")
      .getAttribute("data-obj");
    let locationString = document
      .getElementById("location-input")
      .getAttribute("value");
    setSearchLocation(obj);
    let city = locationString.split(",")[0];
    city !== undefined && history.push(`/company-directory/${city}`);
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

  const getSkills = (services) => {
    let skillArray = services.split(",");
    if (skillArray.length) {
      return skillArray
        .filter((value, index) => index < limitSkillNumber)
        .map((service, index) => (
          <li key={`profile-service-${index}`}>
            <span className="badge badge-warning cr-pointer">{service}</span>
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
                    Droning Companies
                  </div>
                  <div className="clearfix"></div>
                  <form className="SearchBar">
                    <div className="form-group">
                      <SearchLocationInput
                        className="form-control w-60"
                        placeholder="Search company by Location"
                        locationString={locationString ? locationString : ""}
                      //locationSelect = {locationSelectHandler}
                      />
                      <button
                        className="btn BtnSearch"
                        type="button"
                        onClick={() => onSearchCompanyByLocation()}
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
            {/* <form className="col-lg-10 offset-lg-2 form-inline FilterForm text-center">
              <label>Filter By Service</label>
              <select
                className="form-control"
                onChange={(e) => setSkillId(e.target.value)}
                defaultValue=""
              >
                <option value="">Select Service</option>
                {skillCategories.length ? (
                  skillCategories.map((service, index) => {
                    return (
                      <option key={`service-${index}`} value={service.id}>
                        {service.title}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No Service found</option>
                )}
              </select>
            </form> */}
            <h1 style={{ fontFamily: "Bebas Neue", marginBottom: 0, color: "#fff" }}>Featured Companies</h1>
          </div>
        </div>
      </div>

      <div className="FeatruedPilotArea">
        <div className="container">
          <div className="row">
            <div className="col-md-6 paddngt">
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
                            <div className="CompanyLogo">
                              <Link href={`/company/${profile.slug}`}>
                                <a className="SeeMore" href={`/company/${profile.slug}`}>
                                  <img className="img-fluid" src={`${MEDIA_BASE_URL}/${profile.logo}`} alt={profile.name} style={{ border: '1px solid #ccc', padding: 3 }} />
                                </a>
                              </Link>
                            </div>
                          </div>
                          <div className="col-8 col-sm-8">
                            <div className="PilotInfo">
                              <h1>{profile.title}</h1>
                              <br />
                              <div style={{ marginBottom: 15, color: '#000', fontFamily: "Bebas Neue" }}><i className="fas fa-map-marker-alt" style={{ color: "#f6c23e", fontSize: 18, marginRight: 5 }}></i> {" "} {profile.suite}{" - "} {profile.address}{", "} {profile.city}{", "} {profile.state}{", "} {profile.country}{" - "} {profile.zip_code}</div>

                              <ul className="PilotSkills">
                                {profile.service_1 && (profile.service_1 != 'null') ? (<li><span className="badge badge-warning">{profile.service_1}</span></li>) : ("")}
                                {profile.service_2 && (profile.service_2 != 'null') ? (<li><span className="badge badge-warning">{profile.service_2}</span></li>) : ("")}
                                {profile.service_3 && (profile.service_3 != 'null') ? (<li><span className="badge badge-warning">{profile.service_3}</span></li>) : ("")}
                              </ul>

                              {/* <ul className="PilotSkills">
                                {getSkills(profile.services)}
                                {profile.services.split(",").length > 5 ? (
                                  <li>
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        changeLimitLabel(
                                          limitSkillNumber,
                                          profile.services.length
                                        )
                                      }
                                    >
                                      {limitSkillLabel}
                                    </span>
                                  </li>
                                ) : null}
                              </ul> */}
                              {profile.description ? (
                                <div className="PilotText">
                                  {parse(`${profile.description}`)}{" "}
                                </div>
                              ) : null}
                              <Link href={`/company/${profile.slug}`}>
                                <a
                                  className="SeeMore"
                                  href={`/company/${profile.slug}`}
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
                        Not Found!
                      </div>

                    </div>
                  )}

                  {profiles.length ? (
                    <Aux>
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
                {/* <div className="MainHeading">
                  <h1>
                    Meet the best Pilots for<br></br> your needs and budget
                  </h1>
                </div>
                <div className="row BestPilotBox">
                  <div className="col-4 col-sm-4">
                    <img
                      className="img-fluid IconImg"
                      src={Icon1}
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
                      src={Icon2}
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
                      src={Icon3}
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
                </Link> */}
                <TrendingNews />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="clearfix"></div>

      {/* <GearReview /> */}

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