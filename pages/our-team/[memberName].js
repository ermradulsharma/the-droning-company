import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import GetStarted from "../../components/CmsPage/GetStarted";
import OurTeams from "../../components/CmsPage/OurTeams";
import Link from "next/link"
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import Loader from "react-loader-spinner";
import parse from 'html-react-parser';
import SEO from "../../components/Seo/Seo";
import { useRouter } from "next/router";
const CmsTeam = (props) => {
  const router = useRouter();
  const memberName = router.query.memberName;
  const [loading, setLoading] = useState(true);
  const [memberDetail, setMemberDetail] = useState(props.memberDetail);
  const currentUrl = props.currentUrl;
  const [metaTitle, setMetaTitle] = useState(props.metaTitle);
  const [metaKeyword, setMetaKeyword] = useState(props.metaKeyword);
  const [metaDescription, setMetaDescription] = useState(props.metaDescription);

  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    getOurTeam();
  }, [memberName]);

  const getOurTeam = async () => {
    try {
      await fetch(`${SERVER_URL}/cms/${memberName}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setLoading(false);
          if (response.statusCode === 200) {
            setMemberDetail(response.data[0]);
            setMetaTitle(response.data[0].hasOwnProperty('meta_title') ? response.data[0].meta_title : '');
            setMetaKeyword(response.data[0].hasOwnProperty('meta_keywords') ? response.data[0].meta_keywords : '');
            setMetaDescription(response.data[0].hasOwnProperty('meta_description') ? response.data[0].meta_description : '');
          }
        });
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <Aux>
      {
        loading
          ?
          <div className="row">
            <div className="col-md-12" style={{ textAlign: 'center' }}>
              <Loader
                type="ThreeDots"
                color="#ffcc0e"
                height={100}
                width={100}
                visible={loading}
              />
            </div>
          </div>
          :
          <Aux>
            <SEO
              title={`${APPLICATION_NAME}`}
              description={metaDescription}
              siteTitle={metaTitle ? metaTitle : memberDetail.title}
              keywords={metaKeyword}
              href={currentUrl}
            />


            <section className="TeamMemberHeader" style={{ backgroundImage: 'url(' + memberDetail.image + ')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
              <div className="blur-backdrop">
                <div className="container">

                  <div className="row justify-content-center d-flex">
                    <div className="col-lg-4 col-md-12 m-b30 m-r30 text-center">

                      <div className="OurTeam">
                        <img className="img-fluid" src={memberDetail.image} alt={memberDetail.title} /><br />

                      </div>
                    </div>
                    <div className="col-lg-8 col-md-12 align-self-center text-center">
                      <h1 className="text-white">{memberDetail.title}</h1>
                      <hr className="hr-text" data-content="Designation"></hr>
                      <h3 className="text-white">{memberDetail.excerpt}</h3>
                      {
                        memberDetail.email
                          ?
                          <p className="profile-email">
                            <strong style={{ color: "#000" }}>
                              <Link href={`mailto:${memberDetail.email}`}>
                                <a href={`mailto:${memberDetail.email}`}>  <i className="fas fa-envelope-open-text"></i> {memberDetail.email}</a>
                              </Link>
                            </strong>
                          </p>
                          :
                          ''
                      }
                    </div>
                  </div>

                </div>
              </div>
            </section>



            <nav className="breadcrumb-border" aria-label="breadcrumb">
              <div className="container">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Link href="/about-us">Our Team</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {memberDetail.title}
                  </li>
                </ol>
              </div>
            </nav>

            <div className="AboutUs paddngtb40">
              <div className="container">

                <div className="AboutSectionOneRight">
                  <div className="MainHeading text-left">
                    {parse(`${memberDetail.page_text}`)}
                  </div>
                </div>

              </div>
            </div>
            <div className="AboutQuality">
              <div className="BestPilot">
                <div className="container">
                  <GetStarted />
                </div>
              </div>
            </div>
            <section className="section-team paddngtb">
              <div className="container">
                <OurTeams currentMember={memberName} />
              </div>
            </section>
          </Aux>
      }
    </Aux>
  );
};

export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + '' + context.resolvedUrl;
  const memberName = context.params.memberName;
  let currentPage = 1;
  return await fetch(`${SERVER_URL}/cms/${memberName}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.statusCode === 200) {
        return {
          props: {
            memberDetail: response.data[0],
            metaTitle: response.data[0].hasOwnProperty('meta_title') ? response.data[0].meta_title : '',
            metaKeyword: response.data[0].hasOwnProperty('meta_keywords') ? response.data[0].meta_keywords : '',
            MetaDescription: response.data[0].hasOwnProperty('meta_description') ? response.data[0].meta_description : '',
            currentUrl: currentURL
          }
        }
      } else {
        return {
          props: {
            memberDetail: {
              title: '',
              email: '',
              image: '',
              page_text: '',
              excerpt: ''
            },
            metaTitle: '',
            metaKeyword: '',
            MetaDescription: '',
            currentUrl: currentURL
          }
        }
      }
    });
}
export default CmsTeam;