import React, { useState, useEffect, Fragment } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Link from "next/link";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import BlogRecent from "../../components/Blog/BlogRecent";
import FeaturePilot from "../../components/Blog/FeaturePilot";
import BlogCategories from "../../components/Blog/BlogCategories";
import { SERVER_URL } from "../../util/Constants";
import Loader from "react-loader-spinner";
import SEO from "../../components/Seo/Seo";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailsPageAdsData } from "../../redux/HomePageSlice";
import AddBan from "../../components/Addbanner/AddBan";
import AddBanSmall from "../../components/AddBannerSmall/AddBanSmall";
import { generateRandomBannerIndex } from "../../util/utils";
import AddBannerComponent from "../../components/AddBannerComponent/AddBannerComponent";
import AddBannerComponentSmall from "../../components/AddBannerComponent/AddBannerComponentSmall";
import Image from "next/image";
import BoxSection from "../../components/Blog/BoxSection";

const BlogDetail = (props) => {
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

  const getBlogCategories = () => {
    if (
      blogDetailData?.hasOwnProperty("blog_categories") &&
      blogDetailData?.blog_categories.length
    ) {
      return blogDetailData?.blog_categories?.map((category, index) => {
        return (
          <a href="#" key={category.id} className="TdArticleCategory updates">
            {category.title}
          </a>
        );
      });
    } else {
      return null;
    }
  };


  

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    getBlogPostDetail();
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
                "description": "${
                  blogDetailData?.meta_description || "The Droning Company"
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

      {blogDetailData?.length > 0 || Object.keys(blogDetailData)?.length ? (
        <div className="container">
          <div className="row">
            <nav aria-label="Breadcrumb navigation" role="navigation">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/news">Blogs</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link href={`/blog/${slug}`}>
                    <a>{blogDetailData?.title}</a>
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
                    title={blogDetailData?.title || "The droning company"}
                    description={
                      blogDetailData?.meta_description || "The droning company"
                    }
                    siteTitle={""}
                    keywords={blogDetailData?.meta_keyword}
                    href={props?.currentUrl}
                    image={blogDetailData?.image}
                  />

                  {blogDetailData?.length > 0 ||
                  Object.keys(blogDetailData)?.length ? (
                    <article className="TdPostSingleItemStandard TdPostListColumns">
                      <div className="TdArticleContentHolder row">
                        <header className="Td_headline col-sm-12">
                          <h2 className="Td_headline_tag">
                            <span className="Td_headline_superheadline">
                              <span className="TdArticleCategories">
                                {getBlogCategories()}
                              </span>
                            </span>

                            <span className="Td_headline_content">
                              <a
                                href={`/blog/${slug}`}
                                target="_self"
                                title={blogDetailData?.title}
                              >
                                {blogDetailData?.title}
                              </a>
                            </span>
                          </h2>
                        </header>
                        {/*  Underneath the main heading */}
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

                        {blogDetailData.image ? (
                          <div className="TdArticleMedia col-sm-12">
                            <div className="TdMediaBox">
                              <img
                                className="img-fluid"
                                src={blogDetailData.image}
                                alt="post1"
                              />{" "}
                              <hr />
                            </div>
                          </div>
                        ) : null}

                        {props.layout === "normal" ? (
                          <div className="TdArticleTextContent col-sm-12">
                            <div className="TdArticleHeadline">
                              <header className="Td_headline blogDetailDataDesc">
                                {parse(`${blogDetailData.description}`)}
                              </header>

                              <div className="TdShareRow float-right">
                                <div className="Td_icon TdIcoFacebook">
                                  <a
                                    href={
                                      "http://www.facebook.com/share.php?u=" +
                                      `${props.currentUrl}`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Share on Facebook"
                                    className="Td_icon_holder"
                                  >
                                    <i className="fab fa-facebook-f"></i>
                                  </a>
                                </div>
                                <div className="Td_icon TdIcoTwitter">
                                  <a
                                    href={
                                      "https://twitter.com/share?url=" +
                                      props.currentUrl +
                                      "&text=" +
                                      blogDetailData.title +
                                      "&via=Droning"
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Share on Twitter"
                                    className="Td_icon_holder"
                                  >
                                    <i className="fab fa-twitter"></i>
                                  </a>
                                </div>
                                <div className="Td_icon TdIcoLinkedin ">
                                  <a
                                    href={
                                      "https://www.linkedin.com/shareArticle?url=" +
                                      props.currentUrl +
                                      "&title=" +
                                      blogDetailData.title
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Share on Linkedin"
                                    className="Td_icon_holder"
                                  >
                                    <i className="fab fa-linkedin-in"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="TdArticleTextContent col-sm-12">
                            <div className="TdArticleHeadline">
                              <header className="Td_headline blogDetailDataDesc">
                                {parse(`${blogDetailData.description}`)}
                              </header>

                              <FooterNoteLayout />
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ) : null}
                </Fragment>
              )}

              {blogDetailData?.length > 0 ||
              Object.keys(blogDetailData)?.length ? (
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
                                  "carousel-item " +
                                  (index === 0 ? "active" : "")
                                }
                              >
                                <div className="row">
                                  {relatedBlog.map((blog) => {
                                    return (
                                      <div  key={blog.slug} className="col-sm-4">
                                        <div className="RelatedPostBox">
                                          {blog.image ? (
                                            <img
                                              className="img-fluid"
                                              src={blog.image}
                                              alt={parse(blog.title)}
                                            />
                                          ) : null}
                                          <h2 className="RelatedPostheading">
                                            <Link
                                              href={`/blog/${blog.slug}`}
                                              target="_self"
                                            >
                                              {parse(blog.title)}
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
                                          >
                                            Read More
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
                          <img
                            className="img-fluid"
                            src="/images/arrow-left.png"
                            alt="arrow"
                          />
                        </a>
                        <a
                          className="carousel-control-next"
                          href="#demo"
                          data-slide="next"
                        >
                          <img
                            className="img-fluid"
                            src="/images/arrow-right.png"
                            alt="arrow"
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
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <Image
                    src="/gif/nodata.gif"
                    alt="no-data"
                    width={300}
                    height={300}
                  />
                  <h2>Details not found</h2>
                </div>
              )}
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
                {/* {getBlogDetailsPageAdsData_status === "loading" ||
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
                          getBlogDetailsPageAdsData_status === "loading" ||
                          getBlogDetailsPageAdsData_data === null
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="container mt-5">
                    {getBlogDetailsPageAdsData_data && (
                      <AddBanSmall
                        href={
                          getBlogDetailsPageAdsData_data[SIDEBAR_INDEX]?.banner[
                            sidebarindex
                          ]?.link
                        }
                        src={
                          getBlogDetailsPageAdsData_data[SIDEBAR_INDEX]?.banner[
                            sidebarindex
                          ]?.banner_image_full_path
                        }
                      />
                    )}
                  </div>
                )} */}

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

const FooterNoteLayout = ({}) => {
  return (
    <div>
      <BoxSection />
    </div>
  );
};

export async function getServerSideProps(context) {
  const currentURL = context.req.headers.host + "" + context.resolvedUrl;
  const slug = context.params.slug;

  return await fetch(`${SERVER_URL}/blog/${slug}`, {
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
          layout:
            context.params.slug?.toLowerCase() === "fravel-s-footnote"
              ? "footnote"
              : "normal",
        },
      };
    });
}

export default BlogDetail;
