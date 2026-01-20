import React, { useState, useEffect, Fragment } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Link from "next/link";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import BlogRecent from "../../../components/Blog/BlogRecent";
import FeaturePilot from "../../../components/Blog/FeaturePilot";
import BlogCategories from "../../../components/Blog/BlogCategories";
import { SERVER_URL } from "../../../util/Constants";
import Loader from "@/components/Common/Loader";
import SEO from "../../../components/Seo/Seo";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailsPageAdsData } from "../../../redux/HomePageSlice";
import AddBan from "../../../components/Addbanner/AddBan";
import AddBanSmall from "../../../components/AddBannerSmall/AddBanSmall";
import { generateRandomBannerIndex, GetFavBoxData } from "../../../util/utils";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";
import AddBannerComponentSmall from "../../../components/AddBannerComponent/AddBannerComponentSmall";
import Image from "next/image";
import BoxSection from "../../../components/Blog/BoxSection";
import { Box } from "@mui/material";
import axiosInstance from "../../../api/AxiosInstance";

const VideoReview = (props) => {
  const history = useRouter();
  const slug = history.query.slug;
  const [blogDetailData, setBlogDetailData] = useState(props?.blogDetailData);
  const [relatedBlogData, setRelatedBlogData] = useState(
    props?.relatedBlogData
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
  const [fourboxData, setFourBoxData] = useState(null);
  const [fourboxDataloading, setLoading_fourboxData] = useState(false);

  const [interviews_data, setinterviewsData] = useState(null);
  const [video_reviews_data, setvideo_reviewsData] = useState(null);
  const [drone_geek_data, setdrone_geekData] = useState(null);

  const getBlogPostDetail = async () => {
    setLoading(true);
    try {
      await fetch(`${SERVER_URL}/blog/${slug}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === 200) {
            setBlogDetailData(response?.data);
            setRelatedBlogData(response?.relatedBlogs);
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
  const onSearchBlog = () => {
    history.push(`/news/${searchKeyword}`);
  };

  const getFavelBoxData = useCallback(async () => {
    setLoading_fourboxData(true);
    let { data } = await axiosInstance.get("get-favel-boxes");
    setLoading_fourboxData(false);
    if (data?.status) {
      let api_respomse = data?.data;
      setvideo_reviewsData(GetFavBoxData(api_respomse, "video-reviews"));
    } else {
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    getFavelBoxData();
    dispatch(getBlogDetailsPageAdsData());
  }, [slug, getFavelBoxData, dispatch]);

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
          getBlogDetailsPageAdsData_data[under_hed_index]?.banner?.length
        )
      );
      setBottombannerIndex(
        generateRandomBannerIndex(
          "detailsPageBottomBannerIndex",
          getBlogDetailsPageAdsData_data[bottom_index]?.banner?.length
        )
      );

      setSidebarindex(
        generateRandomBannerIndex(
          "detailsPageSidebarBannerIndex",
          getBlogDetailsPageAdsData_data[sidebar_index]?.banner?.length
        )
      );

      setAboveRelatedIndex(
        generateRandomBannerIndex(
          "detailsPageAboveRelatedBannerIndex",
          getBlogDetailsPageAdsData_data[aboverelatdpost_index]?.banner?.length
        )
      );

      setAboveRecentPostIndex(
        generateRandomBannerIndex(
          "detailsPageAboveRecentPostBannerIndex",
          getBlogDetailsPageAdsData_data[aboverecentpost_index]?.banner?.length
        )
      );

      setUnderSidebarIndex(
        generateRandomBannerIndex(
          "detailsPageUnderSidebarBannerIndex",
          getBlogDetailsPageAdsData_data[undersidebar_index]?.banner?.length
        )
      );

      setAbovecategoryIndex(
        generateRandomBannerIndex(
          "detailsPageAboveCategoryBannerIndex",
          getBlogDetailsPageAdsData_data[abovecategory_index]?.banner?.length
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
                "headline": "${blogDetailData?.title || "The Droning Company"}",
                "description": "${blogDetailData?.meta_description || "The Droning Company"
              }",
                "image": {
                  "@type": "ImageObject",
                  "url": "${blogDetailData?.image}",
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
                    "url": "https://www.example.com/images/logo.png",
                    "width": "",
                    "height": ""
                  }
                },
              `,
          }}
        />
      </Head>
      <div className="Banner d-none d-sm-block"></div>

      <div className="container">
        <div className="row">
          <nav aria-label="Breadcrumb navigation" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/" legacyBehavior>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/news" legacyBehavior>Blogs</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link href={`/blog/Fravel-s-Footnote`} legacyBehavior>
                  <a>Fravel-s-Footnote</a>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link href={`/blog/Fravel-s-Footnote/video-review`} legacyBehavior>
                  <a>video-review</a>
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="BlogMain paddngb">
        <div className="container">
          <div className="row">
            <div className="col-md-9 ">
              <div className="Td_headline">
                <h2 className="Td_headline_tag">
                  <span className="Td_headline_content">
                    <a target="_self">Video Reviews</a>
                  </span>
                </h2>
              </div>

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
                <div className="container mt-5">
                  {getBlogDetailsPageAdsData_data !== null && (
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

              <div className="d-sm-block pt-2" style={{ position: "relative" }}>
                {/* {video_reviews_data?.favel_box_details?.map((item) => {
                  return (
                    <div key={item?.title} className="ArticleDesc mt-2">
                      <div className="ArticleDescH fixHeight">{item.title}</div>

                      <Link href={`/${item?.page_video_link}`}>
                        <a
                          href={`/${item?.page_video_link}`}
                          className="SeeMore"
                        >
                          Read More{" "}
                          <i className="fas fa-long-arrow-alt-right"></i>
                        </a>
                      </Link>
                      <hr />
                    </div>
                  );
                })} */}

                <div className="ArticleDesc mt-2">
                  <div className="ArticleDescH fixHeight text-capitalize">
                    reviewed autel robotics evo lite
                  </div>

                  <Link href={`/blog/reviewed-autel-robotics-evo-lite-`} legacyBehavior>
                    <a
                      href={`/blog/reviewed-autel-robotics-evo-lite-`}
                      className="SeeMore"
                    >
                      Read More <i className="fas fa-long-arrow-alt-right"></i>
                    </a>
                  </Link>
                  <hr />
                </div>

                <>
                  <div className="BlogRelatedPosts paddngt">
                    <AddBannerComponent
                      data={getBlogDetailsPageAdsData_data}
                      status={getBlogDetailsPageAdsData_status}
                      position={aboveRelatedPosition}
                      index={aboveRelatedIndex}
                    />
                    <div className="MainHeading text-left">
                      <h1>Related Posts</h1>
                    </div>
                    {relatedBlogData?.length > 0 ? (
                      <div
                        id="demo"
                        className="carousel slide"
                        data-ride="carousel"
                      >
                        <div className="carousel-inner">
                          {relatedBlogData?.map((relatedBlog, index) => {
                            return (
                              <div
                                key={relatedBlog.slug}
                                className={
                                  "carousel-item " + (index === 0 ? "active" : "")
                                }
                              >
                                <div className="row">
                                  {relatedBlog.map((blog) => {
                                    return (
                                      <div key={blog.slug} className="col-sm-4">
                                        <div className="RelatedPostBox">
                                          {blog.image ? (
                                            <Image
                                              className="img-fluid"
                                              src={blog.image}
                                              alt={parse(blog.title)}
                                              width={300}
                                              height={200}
                                            />
                                          ) : null}
                                          <h2 className="RelatedPostheading">
                                            <Link
                                              href={`/blog/${blog.slug}`}
                                              target="_self"
                                              legacyBehavior
                                            >
                                              <a>{parse(blog.title)}</a>
                                            </Link>
                                          </h2>
                                          <p>
                                            {blog.description
                                              ? parse(
                                                blog.description.substring(
                                                  0,
                                                  80
                                                )
                                              )
                                              : ""}
                                          </p>
                                          <Link
                                            className="SeeMore"
                                            href={`/blog/${blog.slug}`}
                                            target="_self"
                                            legacyBehavior
                                          >
                                            <a className="SeeMore">Read More</a>
                                          </Link>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <a
                          className="carousel-control-prev"
                          href="#demo"
                          data-slide="prev"
                        >
                          <Image
                            className="img-fluid"
                            src="/images/arrow-left.png"
                            alt="arrow"
                            width={30}
                            height={30}
                          />
                        </a>
                        <a
                          className="carousel-control-next"
                          href="#demo"
                          data-slide="next"
                        >
                          <Image
                            className="img-fluid"
                            src="/images/arrow-right.png"
                            alt="arrow"
                            width={30}
                            height={30}
                          />
                        </a>
                      </div>
                    ) : (
                      <p>No related blog found</p>
                    )}
                  </div>
                  {/*  Bottom of the blog baneer */}
                  <AddBannerComponent
                    data={getBlogDetailsPageAdsData_data}
                    status={getBlogDetailsPageAdsData_status}
                    position={BOTTOM_INDEX}
                    index={bottombannerIndex}
                  />
                </>
              </div>
            </div>

            <div className="col-md-3">
              <aside className="TdSidebar">
                <div className="TdSearchInnerContent">
                  <form action="" method="get" _lpchecked="1">
                    <div className="input-group">
                      <input
                        type="text"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        value={searchKeyword}
                        className="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => onSearchBlog()}
                        >
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/**  ABOVE RECENT BLOG */}
                <AddBannerComponentSmall
                  data={getBlogDetailsPageAdsData_data}
                  status={getBlogDetailsPageAdsData_status}
                  position={aboveRecentPostPosition}
                  index={aboveRecentPostIndex}
                />
                {<BlogRecent layout={props?.layout} />}
                {/**  ABOVE FEATURE PILOT */}
                <AddBannerComponentSmall
                  data={getBlogDetailsPageAdsData_data}
                  status={getBlogDetailsPageAdsData_status}
                  position={SIDEBAR_INDEX}
                  index={sidebarindex}
                />

                {<FeaturePilot />}
                {/**  ABOVE CATEGORIES */}
                <AddBannerComponentSmall
                  data={getBlogDetailsPageAdsData_data}
                  status={getBlogDetailsPageAdsData_status}
                  position={abovecategoryPosition}
                  index={abovecategoryIndex}
                />
                <div className="TdBox widget_categories">
                  <h4>
                    <span>Categories</span>
                  </h4>
                  <BlogCategories />
                  {/**  under SIDEbar */}
                  <AddBannerComponentSmall
                    data={getBlogDetailsPageAdsData_data}
                    status={getBlogDetailsPageAdsData_status}
                    position={underSidebarPosition}
                    index={underSidebarIndex}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};
export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + "" + context.resolvedUrl;

  return await fetch(`${SERVER_URL}/blog/Fravel-s-Footnote`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      let relatedBlogs = [];

      for (let i = 0; i < response?.relatedBlogs?.length; i++) {
        let blogGroup = response?.relatedBlogs[i];
        relatedBlogs.push(blogGroup);
      }
      return {
        props: {
          blogDetailData: response?.data,
          relatedBlogData: relatedBlogs,
          currentUrl: currentURL,
        },
      };
    });
}


export default VideoReview;
