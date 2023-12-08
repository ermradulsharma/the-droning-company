import React, { useState, useEffect } from 'react';
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Link from 'next/link';
import { useRouter } from 'next/router';
import BlogArticle from "../../../components/Blog/BlogArticle";
import BlogRecent from '../../../components/Blog/BlogRecent';
import BlogCategories from '../../../components/Blog/BlogCategories';
import FeaturePilot from '../../../components/Blog/FeaturePilot';
import { SERVER_URL, APPLICATION_NAME } from "../../../util/Constants";
import Loader from "react-loader-spinner";
import Pagination from '../../../components/UI/Pagination/Pagination';
import SEO from '../../../components/Seo/Seo';
import useCommonFunctionContext from '../../../hooks/useCommonFunctionContext';

import { useDispatch, useSelector } from "react-redux";
import { getNewsPageAdsData } from "../../../redux/HomePageSlice";
import { generateRandomBannerIndex } from "../../../util/utils";
import AddBanSmall from "../../../components/AddBannerSmall/AddBanSmall";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const BlogCategoryDetail = (props) => {
  const { currentUrlFn } = useCommonFunctionContext();
  const currentUrl = currentUrlFn();
  const [metaTitle, setMetaTitle] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const history = useRouter();
  const slug = history.query.categorySlug;
  const [blogPosts, setBlogPosts] = useState(props.blogPosts);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(slug);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount, setPerPageCount] = useState(props.perPageCount);
  const [totalPostCount, setTotalPostCount] = useState(props.totalPostCount);

  const {
    getNewsPageAdsData_status,
    getNewsPageAdsData_data,
    getNewsPageAdsData_error,
  } = useSelector((state) => state?.home ?? {});
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogPostsByCategory();
    dispatch(getNewsPageAdsData());
  }, [slug, currentPage]);


  const [topbannerIndex, setTopbannerIndex] = useState(0);
  const [bottombannerIndex, setBottombannerIndex] = useState(0);
  const [sidebarbannerIndex, setSidebarbannerIndex] = useState(0);
  const [aboveFooterIndex, setAboveFooterIndex] = useState(0);

  const [LIST_4TH_INDEX, setLIST_4TH_INDEX] = useState(0);
  const [LIST_8TH_INDEX, setLIST_8TH_INDEX] = useState(0);
  const [SIDEBAR_INDEX, setSIDEBAR_INDEX] = useState(0);
  const [aboveRecentPostINDEX, setaboveRecentPostINDEX] = useState(0);
  const [aboveRecentPostINDEXexpos, setaboveRecentPostINDEXexpos] = useState(0);
  const [aboveRecentPostBannerINDEX, setaboveRecentPostBannerINDEX] = useState(0);
  const [aboveRecentPostBannerINDEXexpos, setaboveRecentPostBannerINDEXexpos] = useState(0);
  const [aboveFotterPosition, setAboveFotterPosition] = useState(0);

  const [aboveRecentPostINDEXaccessories, setaboveRecentPostINDEXaccessories] = useState(0);
  const [aboveRecentPostBannerINDEXaccessories, setaboveRecentPostBannerINDEXaccessories] = useState(0);

  const getBlogPostsByCategory = async () => {
    setLoading(true)
    try {
      await fetch(`${SERVER_URL}/blogs?category=${slug}&page=${currentPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          //console.log(response);
          if (response.statusCode === 200) {
            setBlogPosts(response.data.data);
            setPerPageCount(response.data.per_page);
            setTotalPostCount(response.post_count);
          }
        });
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }

  const onSearchBlog = () => {
    //console.log(searchKeyword);
    history.push(`/news/${searchKeyword}`)
  }

  const onPageChangeHandler = (pageNum) => {
    setCurrentPage(pageNum)
  }


  useEffect(() => {
    if (getNewsPageAdsData_data) {
      let list_4th_item_index = getNewsPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "in-list-4th-item"
      );
      let list_8th_item_index = getNewsPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "in-list-8th-item"
      );

      let sidebar_index = getNewsPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "side-bar"
      );
      let abovefooter_index = getNewsPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-footer"
      );

      let above_recent_post_index_expos = getNewsPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-recent-post-expos"
      );

      let above_recent_post_index_accessories = getNewsPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-recent-post-accessories"
      );

      let above_recent_post_index = getNewsPageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "above-recent-post"
      );


      setSIDEBAR_INDEX(sidebar_index);
      setLIST_4TH_INDEX(list_4th_item_index);
      setLIST_8TH_INDEX(list_8th_item_index);
      setAboveFotterPosition(abovefooter_index);

      setaboveRecentPostINDEX(above_recent_post_index);
      setaboveRecentPostINDEXexpos(above_recent_post_index_expos);
      setaboveRecentPostINDEXaccessories(above_recent_post_index_accessories);

      setTopbannerIndex(
        generateRandomBannerIndex(
          "newsPageTopBannerIndex",
          getNewsPageAdsData_data[list_4th_item_index]?.banner?.length || 0
        )
      );
      setBottombannerIndex(
        generateRandomBannerIndex(
          "newsPageBottomBannerIndex",
          getNewsPageAdsData_data[list_8th_item_index]?.banner?.length || 0
        )
      );

      setSidebarbannerIndex(
        generateRandomBannerIndex(
          "sidebarNewsBannerIndex",
          getNewsPageAdsData_data[sidebar_index]?.banner?.length || 0
        )
      );

      setaboveRecentPostBannerINDEX(
        generateRandomBannerIndex(
          "sidebaraboveRecentPostIndex",
          getNewsPageAdsData_data[above_recent_post_index]?.banner?.length || 0
        )
      );

      setaboveRecentPostBannerINDEXexpos(
        generateRandomBannerIndex(
          "sidebaraboveRecentPostIndexexpos",
          getNewsPageAdsData_data[above_recent_post_index_expos]?.banner?.length || 0
        )
      );

      setaboveRecentPostBannerINDEXaccessories(
        generateRandomBannerIndex(
          "sidebaraboveRecentPostIndexaccessories",
          getNewsPageAdsData_data[above_recent_post_index_accessories]?.banner?.length || 0
        )
      );

      setAboveFooterIndex(
        generateRandomBannerIndex(
          "aboveFooterNewsBannerIndex",
          getNewsPageAdsData_data[abovefooter_index]?.banner?.length || 0
        )
      );
    }
  }, [getNewsPageAdsData_data]);

  return (
    <Aux>
      <SEO
        title={`${APPLICATION_NAME}`}
        description={metaDescription}
        siteTitle={'new - categories'}
        keywords={metaKeyword}
        href={currentUrl}
      />
      <div className="Banner d-none d-sm-block">
        <div className="BannerInnerBlog">
          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <div className="BannerText">

                  {
                    slug === 'sam-karp' ? (
                      <>
                        <img className="img-fluid" src="/images/sam-karp.jpg" alt="Samuel Karp" style={{ width: 150, height: 150, borderRadius: '50%', border: '3px solid #fecd0e', marginBottom: 20 }} />
                        <div className="BannerTitle">Samuel Karp</div>
                        <p>Drones have been my passion for as long as I can remember. I have 6+ years of experience behind the controls of various DJI drones, as well as 5 years of experience flying and building custom FPV drones. I've done everything from slow cinematic indoor flights for real estate, to fast action filled shots chasing cars at a dirt track. Along the way I've developed a love for cinematic filmmaking, and I'm always excited to start my next project!</p>
                        <div><a className='btn btn-md btn-warning text-black' href="/pilot/samuel-karp">Read More...</a></div>
                      </>
                    ) : slug === 'chris-fravel' ? (
                      <>
                        <img className="img-fluid" src="/images/chris-fravel.jpg" alt="Chris Fravel" style={{ width: 150, height: 150, borderRadius: '50%', border: '3px solid #fecd0e', marginBottom: 20 }} />
                        <div className="BannerTitle">Chris Fravel</div>
                        <p>I am a Part 107 certified drone pilot based in Pennsylvania and serving the greater Mid-Atlantic region of the United States. I have been flying drones for 6 years with over 3,000 total hours "behind the sticks." I have participated in jobs ranging from crew shoots of multimedia projects for commercials and short films to conducting top-to-bottom inspections and mapping of landscapes and structures.</p>
                        <div><a className='btn btn-md btn-warning text-black' href="/pilot/chris-fravel">Read More...</a></div>
                      </>
                    ) : (
                      <>
                        <div className="BannerTitle">Blog</div>
                        <p>While they might seem like toys, a high-quality quadcopter is a serious investment, and an easy way to add production value to a film project, or get a unique view on the world for your travel vlog. We&apos;ve flown plenty, and these are the best drones in our tests.</p>
                      </>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <nav aria-label="Breadcrumb navigation" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/news">News</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{slug}</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="BlogMain paddngb">
        <div className="container">

          <div className="row">
            <div className="col-md-9" >
              {loading && (
                <div className="row">
                  <div className="col-md-9" style={{ textAlign: 'center' }}>
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
                <Aux>
                  {
                    blogPosts.map((post, index) => {
                      return (
                        <><BlogArticle
                          key={post.id}
                          position={index % 2}
                          id={post.id}
                          description={post.description}
                          excerpt={post.excerpt}
                          slug={post.slug}
                          title={post.title}
                          blogImage={post.image}
                          categories={post.hasOwnProperty('blog_categories') ? post.blog_categories : []}
                        />

                          {
                            index === 3 && (
                              <AddBannerComponent
                                data={getNewsPageAdsData_data}
                                status={getNewsPageAdsData_status}
                                position={LIST_4TH_INDEX}
                                index={topbannerIndex}
                              />
                            )
                          }
                          {
                            index === 7 && (
                              <AddBannerComponent
                                data={getNewsPageAdsData_data}
                                status={getNewsPageAdsData_status}
                                position={LIST_8TH_INDEX}
                                index={bottombannerIndex}
                              />
                            )
                          }
                        </>
                      )
                    })
                  }
                  {
                    totalPostCount
                      ?
                      <nav aria-label="Page navigation example">
                        <Pagination
                          total={totalPostCount}
                          pageLimit={5}
                          dataLimit={perPageCount}
                          pageChange={onPageChangeHandler}
                          cPage={currentPage}
                        />
                      </nav>
                      :
                      <div>No blog posts</div>
                  }
                </Aux>
              )}

              <AddBannerComponent
                data={getNewsPageAdsData_data}
                status={getNewsPageAdsData_status}
                position={aboveFotterPosition}
                index={aboveFooterIndex}
              />
            </div>

            <div className="col-md-3">
              <aside className="TdSidebar">
                <div className="TdSearchInnerContent">
                  <form action="" method="get" _lpchecked="1">
                    <div className="input-group">
                      <input type="text" onChange={(e) => setSearchKeyword(e.target.value)} value={searchKeyword} className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={() => onSearchBlog()}>
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {getNewsPageAdsData_status === "loading" ||
                  getNewsPageAdsData_data === null ? (
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
                          getNewsPageAdsData_status === "loading" ||
                          getNewsPageAdsData_data === null
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="banner-wrap">
                    {getNewsPageAdsData_data && (
                      <>

                        {
                          slug === 'expos' ? (
                            <AddBanSmall
                              href={getNewsPageAdsData_data[aboveRecentPostINDEXexpos]?.banner[aboveRecentPostBannerINDEXexpos]?.link}
                              src={getNewsPageAdsData_data[aboveRecentPostINDEXexpos]?.banner[aboveRecentPostBannerINDEXexpos]?.banner_image_full_path}
                            />
                          ) : slug === 'accessories' ? (
                            <AddBanSmall
                              href={getNewsPageAdsData_data[aboveRecentPostINDEXaccessories]?.banner[aboveRecentPostBannerINDEXaccessories]?.link}
                              src={getNewsPageAdsData_data[aboveRecentPostINDEXaccessories]?.banner[aboveRecentPostBannerINDEXaccessories]?.banner_image_full_path}
                            />
                          ) : (
                            <AddBanSmall
                              href={getNewsPageAdsData_data[aboveRecentPostINDEX]?.banner[aboveRecentPostBannerINDEX]?.link}
                              src={getNewsPageAdsData_data[aboveRecentPostINDEX]?.banner[aboveRecentPostBannerINDEX]?.banner_image_full_path}
                            />
                          )
                        }

                        {/* <div style={{ display: slug === 'expos' ? 'block' : 'none' }}>
                          <AddBanSmall
                            href={
                              getNewsPageAdsData_data[aboveRecentPostINDEXexpos]?.banner[aboveRecentPostBannerINDEXexpos]?.link
                            }
                            src={
                              getNewsPageAdsData_data[aboveRecentPostINDEXexpos]?.banner[aboveRecentPostBannerINDEXexpos]?.banner_image_full_path
                            }
                          />
                        </div>
                        <div style={{ display: slug === 'expos' ? 'none' : 'block' }}>
                          <AddBanSmall
                            href={
                              getNewsPageAdsData_data[aboveRecentPostINDEX]?.banner[aboveRecentPostBannerINDEX]?.link
                            }
                            src={
                              getNewsPageAdsData_data[aboveRecentPostINDEX]?.banner[aboveRecentPostBannerINDEX]?.banner_image_full_path
                            }
                          />
                        </div> */}
                      </>
                    )}
                  </div>
                )}

                {<BlogRecent />}

                {getNewsPageAdsData_status === "loading" ||
                  getNewsPageAdsData_data === null ? (
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
                          getNewsPageAdsData_status === "loading" ||
                          getNewsPageAdsData_data === null
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="banner-wrap">
                    {getNewsPageAdsData_data && (
                      <AddBanSmall
                        href={
                          getNewsPageAdsData_data[SIDEBAR_INDEX]?.banner[sidebarbannerIndex]?.link
                        }
                        src={
                          getNewsPageAdsData_data[SIDEBAR_INDEX]?.banner[sidebarbannerIndex]?.banner_image_full_path
                        }
                      />
                    )}
                  </div>
                )}

                {<FeaturePilot />}
                <div className="TdBox widget_categories">
                  <h4><span>Categories</span></h4>
                  <BlogCategories />
                </div>

                {getNewsPageAdsData_status === "loading" ||
                  getNewsPageAdsData_data === null ? (
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
                          getNewsPageAdsData_status === "loading" ||
                          getNewsPageAdsData_data === null
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="banner-wrap">
                    {getNewsPageAdsData_data && (
                      <AddBanSmall
                        href={
                          getNewsPageAdsData_data[SIDEBAR_INDEX]?.banner[sidebarbannerIndex]?.link
                        }
                        src={
                          getNewsPageAdsData_data[SIDEBAR_INDEX]?.banner[sidebarbannerIndex]?.banner_image_full_path
                        }
                      />
                    )}
                  </div>
                )}

              </aside>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  )
}
export async function getServerSideProps(context) {
  let currentPage = 1;
  const slug = context.params.categorySlug;
  return await fetch(`${SERVER_URL}/blogs?category=${slug}&page=${currentPage}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.statusCode === 200) {
        return {
          props: {
            blogPosts: response.data.data,
            perPageCount: response.data.per_page,
            totalPostCount: response.post_count
          }
        }
      } else {
        return {
          props: {
            blogPosts: [],
            perPageCount: '',
            totalPostCount: ''
          }
        }
      }
    });
}
export default BlogCategoryDetail;