import React, { useState, useEffect, Fragment } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Link from "next/link";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import UpcomingEvents from "../../components/Event/UpcomingEvents";

import { SERVER_URL } from "../../util/Constants";
import Loader from "react-loader-spinner";
import SEO from "../../components/Seo/Seo";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailsPageAdsData } from "../../redux/HomePageSlice";
import AddBan from "../../components/Addbanner/AddBan";
import { generateRandomBannerIndex } from "../../util/utils";
import AddBannerComponentSmall from "../../components/AddBannerComponent/AddBannerComponentSmall";

const BlogDetail = (props) => {
    const history = useRouter();
    const slug = history.query.slug;
    const [eventDetailData, setEventDetailData] = useState(props?.eventDetailData);
    const [relatedEventData, setRelatedEventData] = useState(
        props?.relatedEventData
    );
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaKeyword, setMetaKeyword] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const {
        getBlogDetailsPageAdsData_status,
        getBlogDetailsPageAdsData_data,
        getBlogDetailsPageAdsData_error,
    } = useSelector((state) => state?.home ?? {});
    const dispatch = useDispatch();
    const [topbannerIndex, setTopbannerIndex] = useState(0);
    const [bottombannerIndex, setBottombannerIndex] = useState(0);
    const [sidebarindex, setSidebarindex] = useState(0);
    const [aboveRelatedIndex, setAboveRelatedIndex] = useState(0);
    const [aboveRecentPostIndex, setAboveRecentPostIndex] = useState(0);
    const [underSidebarIndex, setUnderSidebarIndex] = useState(0);
    const [abovecategoryIndex, setAbovecategoryIndex] = useState(0);

    const [UNDER_HEADING, setUNDER_HEADING] = useState(0);
    const [BOTTOM_INDEX, setBOTTOM_INDEX] = useState(0);
    const [SIDEBAR_INDEX, setSIDEBAR_INDEX] = useState(0);
    const [aboveRelatedPosition, setAboveRelatedPosition] = useState(0);
    const [aboveRecentPostPosition, setAboveRecentPostPosition] = useState(0);
    const [underSidebarPosition, setUnderSidebarPosition] = useState(0);
    const [abovecategoryPosition, setAbovecategoryPosition] = useState(0);

    // const SERVER_URL = "http://127.0.0.1:8000/api/v1";

    const getEventDetail = async () => {
        setLoading(true);
        try {
            await fetch(`${SERVER_URL}/event/${slug}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.statusCode === 200) {
                        setEventDetailData(response?.data);
                        setRelatedEventData(response?.relatedEvents);
                        // setMetaTitle(response.data.title);
                        // setMetaKeyword();
                        // setMetaDescription();
                    }
                });
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }
        getEventDetail();
        dispatch(getBlogDetailsPageAdsData());
    }, [slug]);

    useEffect(() => {
        if (getBlogDetailsPageAdsData_data) {
            let under_hed_index = getBlogDetailsPageAdsData_data?.findIndex(
                (item) => item?.section_name_slug === "Underneath-the-main-heading"
            );
            let bottom_index = getBlogDetailsPageAdsData_data?.findIndex(
                (item) => item?.section_name_slug === "bottom-of-the-blog"
            );

            let sidebar_index = getBlogDetailsPageAdsData_data?.findIndex(
                (item) => item?.section_name_slug === "middle-area-of-the-sidebar"
            );

            let aboverelatdpost_index = getBlogDetailsPageAdsData_data?.findIndex(
                (item) => item?.section_name_slug === "above-related-post"
            );

            let aboverecentpost_index = getBlogDetailsPageAdsData_data?.findIndex(
                (item) => item?.section_name_slug === "above-recent-post"
            );

            let undersidebar_index = getBlogDetailsPageAdsData_data?.findIndex(
                (item) => item?.section_name_slug === "under-sidebar"
            );

            let abovecategory_index = getBlogDetailsPageAdsData_data?.findIndex(
                (item) => item?.section_name_slug === "above-categories"
            );

            //fixed position
            setSIDEBAR_INDEX(sidebar_index);
            setUNDER_HEADING(under_hed_index);
            setBOTTOM_INDEX(bottom_index);
            setAboveRelatedPosition(aboverelatdpost_index);
            setAboveRecentPostPosition(aboverecentpost_index);
            setUnderSidebarPosition(undersidebar_index);
            setAbovecategoryPosition(abovecategory_index);

            //random index

            setTopbannerIndex(
                generateRandomBannerIndex(
                    "detailsPageTopBannerIndex",
                    getBlogDetailsPageAdsData_data[under_hed_index]?.banner?.length || 0
                )
            );
            setBottombannerIndex(
                generateRandomBannerIndex(
                    "detailsPageBottomBannerIndex",
                    getBlogDetailsPageAdsData_data[bottom_index]?.banner?.length || 0
                )
            );

            setSidebarindex(
                generateRandomBannerIndex(
                    "detailsPageSidebarBannerIndex",
                    getBlogDetailsPageAdsData_data[sidebar_index]?.banner?.length || 0
                )
            );

            setAboveRelatedIndex(
                generateRandomBannerIndex(
                    "detailsPageAboveRelatedBannerIndex",
                    getBlogDetailsPageAdsData_data[aboverelatdpost_index]?.banner?.length || 0
                )
            );

            setAboveRecentPostIndex(
                generateRandomBannerIndex(
                    "detailsPageAboveRecentPostBannerIndex",
                    getBlogDetailsPageAdsData_data[aboverecentpost_index]?.banner?.length || 0
                )
            );

            setUnderSidebarIndex(
                generateRandomBannerIndex(
                    "detailsPageUnderSidebarBannerIndex",
                    getBlogDetailsPageAdsData_data[undersidebar_index]?.banner?.length || 0
                )
            );

            setAbovecategoryIndex(
                generateRandomBannerIndex(
                    "detailsPageAboveCategoryBannerIndex",
                    getBlogDetailsPageAdsData_data[abovecategory_index]?.banner?.length || 0
                )
            );
        }
    }, [getBlogDetailsPageAdsData_data]);

    return (
        <Aux>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
              {
                "@context": "https://schema.org/",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": '${props?.currentUrl}'
                },
                "headline": "${eventDetailData?.title || "The Droning Company"}",
                "description": "${eventDetailData?.meta_description || "The Droning Company"
                            }",
                "image": {
                  "@type": "ImageObject",
                  "url": "${eventDetailData?.image}",
                  "width": "",
                  "height": ""
                },
                "author": {
                  "@type": "Organization",
                  "name": "TheDroningCompany"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "TheDroningCompany.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.thedroningcompany.com/images/logo.png",
                    "width": "",
                    "height": ""
                  }
                },
              `,
                    }}
                />
            </Head>
            <div className="Banner d-none d-sm-block"></div>

            {eventDetailData?.length > 0 || Object.keys(eventDetailData)?.length ? (
                <div className="container">
                    <div className="row">
                        <nav aria-label="Breadcrumb navigation" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link href="/events">Events</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <Link href={`/event/${slug}`}>
                                        <a>{eventDetailData?.title}</a>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="BlogMain paddngb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            {loading && (
                                <div className="row">
                                    <div className="col-md-9" style={{ textAlign: "center" }}>
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

                            {!loading && (
                                <Fragment>
                                    <SEO
                                        title={eventDetailData?.title || "The droning company"}
                                        description={
                                            eventDetailData?.meta_description || "The droning company"
                                        }
                                        siteTitle={""}
                                        keywords={eventDetailData?.meta_keyword}
                                        href={props?.currentUrl}
                                        image={eventDetailData?.image}
                                    />

                                    {eventDetailData?.length > 0 ||
                                        Object.keys(eventDetailData)?.length ? (
                                        <article className="TdPostSingleItemStandard TdPostListColumns">
                                            <div className="TdArticleContentHolder row">
                                                <header className="Td_headline col-sm-12">
                                                    <h1 className="">
                                                        <span className="Td_headline_content">
                                                            {eventDetailData?.title}
                                                        </span>
                                                    </h1>
                                                    <hr></hr>
                                                    <div className="event-date"><i className="fas fa-calendar"></i> {eventDetailData?.event_start} - {eventDetailData?.event_end}</div>
                                                    <div className="event-address mb-3"><i className="fas fa-map-marker-alt"></i> {eventDetailData?.street_add}, {eventDetailData?.suite} {eventDetailData?.city} {eventDetailData?.state}</div>


                                                    {eventDetailData?.cost ? (
                                                        <div className="mb-3">
                                                            <p style={{ fontSize: '18px', color: '#000' }}>Event Cost: <strong>{eventDetailData?.cost}</strong></p>
                                                        </div>
                                                    ) : ''}

                                                    {eventDetailData?.event_link ? (
                                                        <div className="mb-3">
                                                            <a className="btn btn-md btn-warning text-black" href={eventDetailData?.event_link} target="_blank"><i class="fas fa-link"></i> Event Website</a>
                                                        </div>
                                                    ) : ''}

                                                </header>
                                                {/*  Underneath the main heading */}

                                                {eventDetailData.image ? (
                                                    <div className="TdArticleMedia col-sm-12">
                                                        <div className="TdMediaBox">
                                                            <img
                                                                className="img-fluid"
                                                                src={eventDetailData.image}
                                                                alt={eventDetailData?.title}
                                                            />{" "}
                                                        </div>
                                                    </div>
                                                ) : null}

                                                {getBlogDetailsPageAdsData_status === "loading" ||
                                                    getBlogDetailsPageAdsData_data === null ? (
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
                                                                    getBlogDetailsPageAdsData_status ===
                                                                    "loading" ||
                                                                    getBlogDetailsPageAdsData_data === null
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="container mt-2">
                                                        {getBlogDetailsPageAdsData_data && (
                                                            <AddBan
                                                                src={
                                                                    getBlogDetailsPageAdsData_data[UNDER_HEADING]
                                                                        ?.banner[topbannerIndex]
                                                                        ?.banner_image_full_path
                                                                }
                                                                href={
                                                                    getBlogDetailsPageAdsData_data[UNDER_HEADING]
                                                                        ?.banner[topbannerIndex]?.link
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )}


                                                <div className="TdArticleTextContent col-sm-12">
                                                    <div className="TdArticleHeadline">
                                                        <header className="Td_headline eventDetailDataDesc mb-4">
                                                            {parse(`${eventDetailData.description}`)}
                                                        </header>

                                                        {eventDetailData?.event_video ? (
                                                            <div className="youtubeVideo">{parse(`${eventDetailData.event_video}`)}</div>
                                                        ) : ''}

                                                        <div className="row">
                                                            {eventDetailData.gallery_img_1 ? (<div className="col-md-4 mb-3"> <img className="img-fluid" src={eventDetailData.gallery_img_1} alt={eventDetailData?.title} /></div>) : null}
                                                            {eventDetailData.gallery_img_2 ? (<div className="col-md-4 mb-3"> <img className="img-fluid" src={eventDetailData.gallery_img_2} alt={eventDetailData?.title} /></div>) : null}
                                                            {eventDetailData.gallery_img_3 ? (<div className="col-md-4 mb-3"> <img className="img-fluid" src={eventDetailData.gallery_img_3} alt={eventDetailData?.title} /></div>) : null}
                                                            {eventDetailData.gallery_img_4 ? (<div className="col-md-4 mb-3"> <img className="img-fluid" src={eventDetailData.gallery_img_4} alt={eventDetailData?.title} /></div>) : null}
                                                            {eventDetailData.gallery_img_5 ? (<div className="col-md-4 mb-3"> <img className="img-fluid" src={eventDetailData.gallery_img_5} alt={eventDetailData?.title} /></div>) : null}
                                                            {eventDetailData.gallery_img_6 ? (<div className="col-md-4 mb-3"> <img className="img-fluid" src={eventDetailData.gallery_img_6} alt={eventDetailData?.title} /></div>) : null}
                                                        </div>

                                                        <div className="TdShareRow float-right">
                                                            <div className="Td_icon TdIcoFacebook">
                                                                <a href={"http://www.facebook.com/share.php?u=" + `${props.currentUrl}`} target="_blank" rel="noreferrer" title="Share on Facebook" className="Td_icon_holder" >
                                                                    <i className="fab fa-facebook-f"></i>
                                                                </a>
                                                            </div>
                                                            <div className="Td_icon TdIcoTwitter">
                                                                <a href={"https://twitter.com/share?url=" + props.currentUrl + "&text=" + eventDetailData.title + "&via=Droning"} target="_blank" rel="noreferrer" title="Share on Twitter" className="Td_icon_holder">
                                                                    <i className="fab fa-twitter"></i>
                                                                </a>
                                                            </div>
                                                            <div className="Td_icon TdIcoLinkedin ">
                                                                <a href={"https://www.linkedin.com/shareArticle?url=" + props.currentUrl + "&title=" + eventDetailData.title} target="_blank" rel="noreferrer" title="Share on Linkedin" className="Td_icon_holder">
                                                                    <i className="fab fa-linkedin-in"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </article>
                                    ) : null}
                                </Fragment>
                            )}

                        </div>

                        <div className="col-md-3">
                            <aside className="TdSidebar">
                                {/**  ABOVE RECENT BLOG */}
                                <AddBannerComponentSmall
                                    data={getBlogDetailsPageAdsData_data}
                                    status={getBlogDetailsPageAdsData_status}
                                    position={aboveRecentPostPosition}
                                    index={aboveRecentPostIndex}
                                />
                                {<UpcomingEvents layout={props?.layout} />}
                                {/**  ABOVE FEATURE PILOT */}
                                <AddBannerComponentSmall
                                    data={getBlogDetailsPageAdsData_data}
                                    status={getBlogDetailsPageAdsData_status}
                                    position={SIDEBAR_INDEX}
                                    index={sidebarindex}
                                />

                            </aside>
                        </div>
                    </div>
                </div>
            </div >
        </Aux >
    );
};


export async function getServerSideProps(context) {
    const currentURL = context.req.headers.host + "" + context.resolvedUrl;
    const slug = context.params.slug;

    return await fetch(`${SERVER_URL}/event/${slug}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((response) => {
            let relatedEvents = [];

            for (let i = 0; i < response?.relatedEvents?.length; i++) {
                let blogGroup = response?.relatedEvents[i];
                relatedEvents.push(blogGroup);
            }
            return {
                props: {
                    eventDetailData: response?.data,
                    relatedEventData: relatedEvents,
                    currentUrl: currentURL,
                    layout: "normal",
                },
            };
        });
}

export default BlogDetail;
