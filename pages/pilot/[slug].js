import Aux from "../../hoc/Auxiliary/Auxiliary";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
import Loader from "@/components/Common/Loader";
import Portfolio from "../../components/Pilot/Portfolio";
import Reel from "../../components/Pilot/Reel";
import ServiceLocation from "../../components/Pilot/ServiceLocation";
import useAuthContext from "../../hooks/useAuthContext";
import SEO from "../../components/Seo/Seo";
import Head from "next/head";
import useMetaTags from "../../hooks/useMetaTags";
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
    props?.metaTitle,
    props?.metaKeyword,
    props?.metaDescription
  );

  const getProfile = useCallback(async () => {
    try {
      await fetch(`${SERVER_URL}/pilot-profile/${slug}`, {
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
  }, [slug]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

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

  return profileLoading ? (
    <>
      <SEO
        title={slug}
        description={metaDescription}
        siteTitle={metaTitle}
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
        title={slug}
        description={metaDescription}
        siteTitle={metaTitle}
        keywords={metaKeyword}
        href={currentUrl}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
                            {
                                "@context": "https://schema.org/",
                                "@type": "Person",
                                "name": "${pilotData.profile.name}",
                                "url": "${currentUrl}",
                                "image": "${pilotData.profile.image}",
                                "jobTitle": "${pilotData.profile.title}",
                                "worksFor": {
                                  "@type": "Organization",
                                  "name": "Pilot Company Name here"
                                }
                              }
                            `,
          }}
        />
      </Head>
      <nav aria-label="breadcrumb">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link href="/pilot-list">Hire a Pilot</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {pilotData.profile && pilotData.profile.name}
            </li>
          </ol>
        </div>
      </nav>

      <div className="PilotFullInfo">
        {
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row PilotBox">
                  <div className="col-sm-3">
                    <div className="PilotImg">
                      <Image
                        className="img-fluid"
                        src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilotData.profile && pilotData.profile.image)}`}
                        alt="pilot"
                        width={300}
                        height={300}
                      />
                      {pilotData.profile &&
                        pilotData.profile.is_certified === "Yes" ? (
                        <span className="BadageImg">
                          <Image
                            className="img-fluid"
                            src={`/images/badage.png`}
                            alt="badage"
                            width={50}
                            height={50}
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="PilotInfo">
                      <h1> {pilotData.profile && pilotData.profile.name}</h1>
                      <p>
                        Member Since{" "}
                        {pilotData.profile && pilotData.profile.member_since}
                      </p>
                      <ul className="PilotDetails">
                        <li> {pilotData.profile && pilotData.profile.title}</li>
                        {/* <li>Real Estate</li> */}
                      </ul>
                      {pilotData.profile && pilotData.profile.skills ? (
                        <ul className="PilotSkills">
                          {getSkills(pilotData.profile.skills)}
                          {pilotData.profile.skills.split(",").length > 10 ? (
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  changeLimitLabel(
                                    limitSkillNumber,
                                    pilotData.profile.skills.length
                                  )
                                }
                              >
                                {limitSkillLabel}
                              </span>
                            </li>
                          ) : null}
                        </ul>
                      ) : (
                        <p>No skills</p>
                      )}
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
                    {isSetContactButton || (authTokens && accessToken) ? (
                      isViewContact ? (
                        <div className="PilotBoxContactDetails">
                          <p>
                            <i className="fas fa-phone"></i>:{" "}
                            {pilotData.profile.mobile ? (
                              <a href={`tel:${pilotData.profile.mobile.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`}>
                                {" "}
                                {pilotData.profile.mobile.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                              </a>
                            ) : (
                              "Not available"
                            )}
                          </p>
                          <p>
                            <i className="fas fa-envelope"></i>:{" "}
                            {pilotData.profile.email ? (
                              <a href={`mailto:${pilotData.profile.email}`}>
                                {pilotData.profile.email}
                              </a>
                            ) : (
                              "Not available"
                            )}
                          </p>
                          {pilotData.profile.instagram_name ? (<p><i className="fab fa-instagram"></i>:{" "} {pilotData.profile.instagram_name}</p>) : ''}
                        </div>
                      ) : (
                        <button
                          className="btn btn-warning BtnLog"
                          type="button"
                          onClick={() => setViewContact(true)}
                        >
                          View Contact
                        </button>
                      )
                    ) : (
                      <button
                        className="btn btn-warning BtnLog"
                        type="button"
                        onClick={() => handleLoginToContactButton()}
                      >
                        Log In To Contact
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="AboutInfo">
              <div className="NormalHeading">About:</div>
              <p>
                {pilotData.profile && parse(`${pilotData.profile.description}`)}
              </p>
            </div>

            {pilotData.equipment ? (
              <Aux>
                <div className="EqpBox">
                  <div className="NormalHeading">Equipment:</div>
                  <div className="row">
                    {pilotData.equipment &&
                      pilotData.equipment.map((equip, index) => {
                        return (
                          <div className="col-sm-3" key={"equipment-" + index}>
                            <div className="EqpDetail">
                              <Image
                                className="img-fluid"
                                src={`${MEDIA_BASE_URL}/${getCleanImageUrl(equip.image)}`}
                                alt="eqp"
                                width={300}
                                height={200}
                              />
                              <h5>
                                {equip.title.charAt(0).toUpperCase() +
                                  equip.title.slice(1)}
                              </h5>
                              <ul>
                                <li>
                                  <span>Manufacturer:</span>
                                  {equip.manufacturer.charAt(0).toUpperCase() +
                                    equip.manufacturer.slice(1)}
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Aux>
            ) : (
              ""
            )}
            {pilotData.profile && pilotData.profile.id != "" ? (
              <ServiceLocation
                profileId={pilotData.profile.id}
                travelOption={pilotData.profile.travel_option}
              />
            ) : (
              ""
            )}

            {/* <!--ServiceArea--> */}
          </div>
        }
      </div>
      {/* <!--FeatruedPilotArea--> */}

      {pilotData.profile && pilotData.profile.id != "" ? (
        <Reel profileId={pilotData.profile.id} />
      ) : (
        ""
      )}
      {pilotData.profile && pilotData.profile.id != "" ? (
        <Portfolio profileId={pilotData.profile.id} />
      ) : (
        ""
      )}
    </Aux>
  );
};
export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + "" + context.resolvedUrl;
  const slug = context.params.slug;

  return await fetch(`${SERVER_URL}/pilot-profile/${slug}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
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
}
export default Pilot;
