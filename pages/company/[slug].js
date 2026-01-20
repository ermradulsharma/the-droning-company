import Aux from "../../hoc/Auxiliary/Auxiliary";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { SERVER_URL, MEDIA_BASE_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
import Loader from "@/components/Common/Loader";
import Portfolio from "../../components/Company/Portfolio";
import Reel from "../../components/Company/Reel";
import ServiceLocation from "../../components/Pilot/ServiceLocation";
import useAuthContext from "../../hooks/useAuthContext";
import SEO from "../../components/Seo/Seo";
import Head from "next/head";
import useMetaTags from "../../hooks/useMetaTags";
import CompanyProfileArticles from "../../components/Category/CompanyProfileArticles";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Pilot = (props) => {

  const history = useRouter();
  const slug = history.query.slug;
  const [pilotData, setPilotData] = useState(props.pilotData);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isSetContactButton, setContactButton] = useState(false);
  const [isViewContact, setViewContact] = useState(false);
  const { authTokens, accessToken } = useAuthContext();
  const [limitSkillNumber, setLimitSkillNumber] = useState(10);
  const [limitSkillLabel, setLimitSkillLabel] = useState("Show more");

  const currentUrl = props.currentUrl;
  const [metaTitle, metaKeyword, metaDescription] = useMetaTags(
    pilotData?.profile?.metatitle,
    pilotData?.profile?.metakeyword,
    pilotData?.profile?.metadescription
  );

  useEffect(() => {
    getProfile();
  }, [slug]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const getProfile = async () => {
    try {
      await fetch(`${SERVER_URL}/company-profile/${slug}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === 200) {
            setProfileLoading(false);
            setPilotData(response.data);
            // setMetaTitle(response.data.profile.metatitle);
            // setMetaKeyword(response.data.profile.metakeyword);
            // setMetaDescription(response.data.profile.metadescription);
          }
        });
    } catch (error) {
      console.log(error);
      setProfileLoading(false);
    }
  };

  const changeLimitLabel = (limit, total) => {
    if (limit === 10) {
      setLimitSkillLabel("Show less");
      setLimitSkillNumber(total);
    } else {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      setLimitSkillLabel("Show more");
      setLimitSkillNumber(10);
    }
  };

  //alert(fullPageLoading);
  const handleLoginToContactButton = () => {
    if (authTokens && accessToken) {
      setContactButton(true);
    } else {
      history.push("/login");
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

  function rep(text) {
    var Rexp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
    var emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/ig;
    return text.replace(Rexp, "<a href='$1' target='_blank'>$1</a>").replace(emailPattern, "<a href='mailto:$1'>$1</a>");
  }
  function removeHttp(url) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState();
  const handleClose = () => setShow(false);
  const handleShow = async (type) => {
    if (type === 1) {
      setShow(true);
      setModalContent(parse(rep(pilotData.profile.pic_desc_1)));
    } else if (type === 2) {
      setShow(true);
      setModalContent(parse(rep(pilotData.profile.pic_desc_2)));
    } else if (type === 3) {
      setShow(true);
      setModalContent(parse(rep(pilotData.profile.pic_desc_3)));
    } else if (type === 4) {
      setShow(true);
      setModalContent(parse(rep(pilotData.profile.pic_desc_4)));
    } else if (type === 5) {
      setShow(true);
      setModalContent(parse(rep(pilotData.profile.pic_desc_5)));
    } else if (type === 6) {
      setShow(true);
      setModalContent(parse(rep(pilotData.profile.pic_desc_6)));
    }
  }

  const hero_link = pilotData.profile.email ? ('//' + removeHttp(pilotData.profile.website)) : ("#");

  return profileLoading ? (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        siteTitle={"The Droning Company"}
        keywords={metaKeyword}
        href={currentUrl}
      />
      <div className="row">
        <div
          className="col-12 text-center justify-content-between"
          style={{ textAlign: "center" }}
        >
          <Loader
            type="ThreeDots"
            color="#ffcc0e"
            height={100}
            width={100}
            visible={profileLoading}
          />
        </div>
      </div>
    </>
  ) : (
    <Aux>
      <SEO
        title={metaTitle}
        description={metaDescription}
        siteTitle={"The Droning Company"}
        keywords={metaKeyword}
        href={currentUrl}
      />
      <nav aria-label="breadcrumb">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link href="/company-directory">Company Directory</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {pilotData.profile && pilotData.profile.title}
            </li>
          </ol>
        </div>
      </nav>

      <div className="PilotFullInfo">
        {
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row CompanyBox">
                  <div className="col-md-12 mb-4">
                    <div className="CompanyLogo">
                      <a target='_blank' rel="noreferrer" href={hero_link}>
                        <img
                          className="img-fluid"
                          src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.featured_image)}`}
                          alt={pilotData.profile && pilotData.profile.title}
                          style={{ width: "100%", height: "400px", objectFit: 'cover', border: "1px solid #000" }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="CompanyLogo">
                      <a target='_blank' rel="noreferrer" href={hero_link}>
                        <img
                          className="img-fluid"
                          src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.logo)}`}
                          alt={pilotData.profile && pilotData.profile.title}
                          style={{ border: '1px solid #ccc', padding: 3 }}
                        />
                      </a>
                      {pilotData.profile &&
                        pilotData.profile.is_certified === "Yes" ? (
                        <span className="BadageImg">
                          <img
                            className="img-fluid"
                            src={`/images/badage.png`}
                            alt="badage"
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="CompanyInfo">
                      <h1> {pilotData.profile && pilotData.profile.title}</h1>
                      <span>
                        Member Since{" "}
                        {pilotData.profile && pilotData.profile.member_since}
                      </span>

                      <div style={{ marginBottom: 15, color: '#000', fontFamily: "Bebas Neue" }}><i className="fas fa-map-marker-alt" style={{ color: "#f6c23e", fontSize: 18, marginRight: 5 }}></i> {" "} {pilotData.profile && pilotData.profile.suite} {(pilotData.profile && pilotData.profile.suite) ? ' - ' : ''} {pilotData.profile && pilotData.profile.address}{", "} {pilotData.profile && pilotData.profile.city}{", "} {pilotData.profile && pilotData.profile.state}{", "} {pilotData.profile && pilotData.profile.country}{" - "} {pilotData.profile && pilotData.profile.zip_code}</div>
                      <hr></hr>
                      {pilotData.profile ? (
                        <ul className="PilotSkills">
                          {pilotData.profile && pilotData.profile.service_1 && (pilotData.profile.service_1 != 'null') ? (<li><span className="badge badge-warning">{pilotData.profile.service_1}</span></li>) : ("")}
                          {pilotData.profile && pilotData.profile.service_2 && (pilotData.profile.service_2 != 'null') ? (<li><span className="badge badge-warning">{pilotData.profile.service_2}</span></li>) : ("")}
                          {pilotData.profile && pilotData.profile.service_3 && (pilotData.profile.service_3 != 'null') ? (<li><span className="badge badge-warning">{pilotData.profile.service_3}</span></li>) : ("")}
                        </ul>
                      ) : ("")}

                      {pilotData.profile ? (
                        <ul className="SocialLinks company-social">
                          {pilotData.profile && pilotData.profile.facebook ? (
                            <li><a href={pilotData.profile.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                          ) : ("")}
                          {pilotData.profile && pilotData.profile.twitter ? (
                            <li><a href={pilotData.profile.twitter} target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                          ) : ("")}
                          {pilotData.profile && pilotData.profile.linkedin ? (
                            <li><a href={pilotData.profile.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a></li>
                          ) : ("")}
                          {pilotData.profile && pilotData.profile.instagram ? (
                            <li><a href={pilotData.profile.instagram} target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                          ) : ("")}
                          {pilotData.profile && pilotData.profile.youtube ? (
                            <li><a href={pilotData.profile.youtube} target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                          ) : ("")}
                        </ul>
                      ) : ("")}

                      {/* {pilotData.profile && pilotData.profile.services ? (
                        <ul className="PilotSkills">
                          {getSkills(pilotData.profile.services)}
                          {pilotData.profile.services.split(",").length > 10 ? (
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  changeLimitLabel(
                                    limitSkillNumber,
                                    pilotData.profile.services.length
                                  )
                                }
                              >
                                {limitSkillLabel}
                              </span>
                            </li>
                          ) : null}
                        </ul>
                      ) : (
                        <p>No Services</p>
                      )} */}
                    </div>
                  </div>
                  <div className="col-sm-3 align-self-center">
                    {/* {
                        pilotData.profile && pilotData.profile.is_insured
                        ?
                        <img className="img-fluid PilotVerified" style={{marginBottom: '-140px', height:'200px', position:'relative'}} src={`/user-pilot/droneinsuredicon.png`} alt="verified" />
                        :
                        null
                    } */}
                    {pilotData.profile ? (
                      <div className="companyContactDetails">
                        <p style={{ marginBottom: 5 }}>
                          <i className="fas fa-user" title="Contact Person"></i> &nbsp; {" "}
                          {pilotData.profile.contact_person ? (
                            <>
                              {pilotData.profile.contact_person}
                            </>
                          ) : (
                            "Not available"
                          )}
                        </p>
                        <p style={{ marginBottom: 5 }}>
                          <i className="fas fa-phone" title="Contact Phone"></i> &nbsp; {" "}
                          {pilotData.profile.mobile ? (
                            <a href={`tel:${pilotData.profile.mobile}`}>
                              {" "}
                              {pilotData.profile.mobile}
                            </a>
                          ) : (
                            "Not available"
                          )}
                        </p>
                        <p style={{ marginBottom: 5 }}>
                          <i className="fas fa-envelope" title="Contact Email"></i> &nbsp; {" "}
                          {pilotData.profile.email ? (
                            <a href={`mailto:${pilotData.profile.email}`}>
                              {pilotData.profile.email}
                            </a>
                          ) : (
                            "Not available"
                          )}
                        </p>
                        <p style={{ marginBottom: 5 }}>
                          <i className="fas fa-globe" title="Website"></i> &nbsp; {" "}
                          {pilotData.profile.email ? (
                            <a target='_blank' rel="noreferrer" href={'//' + removeHttp(pilotData.profile.website)}>
                              {removeHttp(pilotData.profile.website)}
                            </a>
                          ) : (
                            "Not available"
                          )}
                        </p>
                      </div>
                    ) : (
                      "Not available"
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="AboutInfo">
              <div className="NormalHeading">Highlights:</div>
              <p style={{ whiteSpace: 'break-spaces' }}>
                {pilotData.profile && parse(rep(`${pilotData.profile.short_description}`))}
              </p>
            </div>

            <div className="row CompanyBox">
              {pilotData.profile && pilotData.profile.profile_img_1 ? (
                <div className="col-md-4 mb-4">
                  <div className="CompanyLogo">
                    <img className="img-fluid"
                      src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.profile_img_1)}`}
                      alt={pilotData.profile && pilotData.profile.title}
                      style={{ width: "100%", height: "250px", objectFit: 'cover', border: "1px solid #000" }}
                    />
                  </div>
                  {pilotData.profile && pilotData.profile.pic_desc_1 ? (
                    <div className="profile_pic_more_btn" onClick={() => handleShow(1)}>Read More</div>
                  ) : ("")}
                  <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Body style={{ whiteSpace: 'break-spaces' }}>{modalContent}</Modal.Body>
                  </Modal>
                </div>
              ) : ("")}

              {pilotData.profile && pilotData.profile.profile_img_2 ? (
                <div className="col-md-4 mb-4">
                  <div className="CompanyLogo">
                    <img className="img-fluid"
                      src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.profile_img_2)}`}
                      alt={pilotData.profile && pilotData.profile.title}
                      style={{ width: "100%", height: "250px", objectFit: 'cover', border: "1px solid #000" }}
                    />
                  </div>
                  {pilotData.profile && pilotData.profile.pic_desc_2 ? (
                    <div className="profile_pic_more_btn" onClick={() => handleShow(2)}>Read More</div>
                  ) : ("")}
                </div>
              ) : ("")}

              {pilotData.profile && pilotData.profile.profile_img_3 ? (
                <div className="col-md-4 mb-4">
                  <div className="CompanyLogo">
                    <img className="img-fluid"
                      src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.profile_img_3)}`}
                      alt={pilotData.profile && pilotData.profile.title}
                      style={{ width: "100%", height: "250px", objectFit: 'cover', border: "1px solid #000" }}
                    />
                  </div>
                  {pilotData.profile && pilotData.profile.pic_desc_3 ? (
                    <div className="profile_pic_more_btn" onClick={() => handleShow(3)}>Read More</div>
                  ) : ("")}
                </div>
              ) : ("")}

              {pilotData.profile && pilotData.profile.profile_img_4 ? (
                <div className="col-md-4 mb-4">
                  <div className="CompanyLogo">
                    <img className="img-fluid"
                      src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.profile_img_4)}`}
                      alt={pilotData.profile && pilotData.profile.title}
                      style={{ width: "100%", height: "250px", objectFit: 'cover', border: "1px solid #000" }}
                    />
                  </div>
                  {pilotData.profile && pilotData.profile.pic_desc_4 ? (
                    <div className="profile_pic_more_btn" onClick={() => handleShow(4)}>Read More</div>
                  ) : ("")}
                </div>
              ) : ("")}

              {pilotData.profile && pilotData.profile.profile_img_5 ? (
                <div className="col-md-4 mb-4">
                  <div className="CompanyLogo">
                    <img className="img-fluid"
                      src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.profile_img_5)}`}
                      alt={pilotData.profile && pilotData.profile.title}
                      style={{ width: "100%", height: "250px", objectFit: 'cover', border: "1px solid #000" }}
                    />
                  </div>
                  {pilotData.profile && pilotData.profile.pic_desc_5 ? (
                    <div className="profile_pic_more_btn" onClick={() => handleShow(5)}>Read More</div>
                  ) : ("")}
                </div>
              ) : ("")}

              {pilotData.profile && pilotData.profile.profile_img_6 ? (
                <div className="col-md-4 mb-4">
                  <div className="CompanyLogo">
                    <img className="img-fluid"
                      src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.profile_img_6)}`}
                      alt={pilotData.profile && pilotData.profile.title}
                      style={{ width: "100%", height: "250px", objectFit: 'cover', border: "1px solid #000" }}
                    />
                  </div>
                  {pilotData.profile && pilotData.profile.pic_desc_6 ? (
                    <div className="profile_pic_more_btn" onClick={() => handleShow(6)}>Read More</div>
                  ) : ("")}
                </div>
              ) : ("")}
            </div>

            <div className="AboutInfo">
              <div className="NormalHeading">About:</div>
              <p style={{ whiteSpace: 'break-spaces' }}>
                {pilotData.profile && parse(rep(`${pilotData.profile.description}`))}
              </p>
            </div>

            <div className="AboutInfo">
              <div className="NormalHeading">In the Press:</div>
              {pilotData.profile && pilotData.profile.press_release_1 ? (
                <div className="press-release mb-3">
                  <h4 style={{ color: '#000' }}>{pilotData.profile.press_release_1.subject}</h4>
                  <div><i title="Press Release Date" className="fas fa-calendar"></i> {pilotData.profile.press_release_1.date}</div>
                  <hr></hr>
                  <p style={{ whiteSpace: "break-spaces" }}>
                    {pilotData.profile && parse(rep(`${pilotData.profile.press_release_1.content}`))}
                  </p>
                </div>
              ) : ("")}
              {pilotData.profile && pilotData.profile.press_release_2 ? (
                <div className="press-release mb-3">
                  <h4 style={{ color: '#000' }}>{pilotData.profile.press_release_2.subject}</h4>
                  <div><i title="Press Release Date" className="fas fa-calendar"></i> {pilotData.profile.press_release_2.date}</div>
                  <hr></hr>
                  <p style={{ whiteSpace: "break-spaces" }}>
                    {pilotData.profile && parse(rep(`${pilotData.profile.press_release_2.content}`))}
                  </p>
                </div>
              ) : ("")}
              {pilotData.profile && pilotData.profile.press_release_3 ? (
                <div className="press-release mb-3">
                  <h4 style={{ color: '#000' }}>{pilotData.profile.press_release_3.subject}</h4>
                  <div><i title="Press Release Date" className="fas fa-calendar"></i> {pilotData.profile.press_release_3.date}</div>
                  <hr></hr>
                  <p style={{ whiteSpace: "break-spaces" }}>
                    {pilotData.profile && parse(rep(`${pilotData.profile.press_release_3.content}`))}
                  </p>
                </div>
              ) : ("")}
            </div>

            <div className="paddnglr">
              <div className="BestPilot">
                {/* <div className="MainHeading">
                  <h1>Droning Company Articles</h1>
                  <hr></hr>
              </div>
              {pilotData.profile && pilotData.profile.dc_articles ? (
                <div className="row">
                  {pilotData.profile.dc_articles.map((article, index) => (
                    
                    article && article.title ? (
                      <div className="col-md-6 mb-3">
                        <a className="dcArticle" href={"/blog/"+article.slug} target="_blank">
                          <em><img src={article.image}/></em>
                          <span>{article.title}</span>
                        </a>
                      </div>
                    ) : ( "" )
                  ))}
                </div>
              ) : ( <h4 style={{ textAlign:"center"}}>Articles Not Found!</h4> )} */}

                {pilotData.profile && pilotData.profile.dc_articles ? (
                  <CompanyProfileArticles title={"Droning Company Articles"} articles={pilotData.profile.dc_articles} />
                ) : (<h4 style={{ textAlign: "center" }}>Articles Not Found!</h4>)}
              </div>
            </div>

            <div className="AboutInfo">
              <div className="NormalHeading">Working Hours:</div>
              <p style={{ whiteSpace: 'break-spaces' }}>
                {pilotData.profile && parse(`${pilotData.profile.working_hours}`)}
              </p>
            </div>
          </div>
        }
      </div>
      {pilotData.profile && pilotData.profile.id != "" ? (<Reel profileId={pilotData.profile.id} />) : ("")}
      {pilotData.profile && pilotData.profile.id != "" ? (<Portfolio profileId={pilotData.profile.id} />) : ("")}
    </Aux >
  );
};
export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + "" + context.resolvedUrl;
  const slug = context.params.slug;

  try {
    return await fetch(`${SERVER_URL}/company-profile/${slug}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log('XXXXXXXX: ' + response?.data);
        return {
          props: {
            pilotData: response?.data,
            metaTitle: response?.data?.profile?.metatitle,
            metaKeyword: response?.data?.profile?.metakeyword,
            metaDescription: response?.data?.profile?.metadescription,
            currentUrl: currentURL,
          },
        };
      });
  } catch (error) {
    return {
      props: {
        pilotData: '',
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
        currentUrl: '',
      },
    };
  }


}
export default Pilot;
