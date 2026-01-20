import React, { useState, useEffect } from 'react';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Link from 'next/link';
import {useRouter} from 'next/router';
import BlogArticle from "../../components/Blog/BlogArticle";
import BlogRecent from '../../components/Blog/BlogRecent';
import BlogCategories from '../../components/Blog/BlogCategories';
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import Loader from "@/components/Common/Loader";
import Pagination from '../../components/UI/Pagination/Pagination';
import SEO from '../../components/Seo/Seo';
import useCommonFunctionContext from '../../hooks/useCommonFunctionContext';
const BlogSearch = (props) => {
  const {currentUrlFn} = useCommonFunctionContext();  
  const history = useRouter();
  const keyword = history.query.keyword;
  
  const [blogPosts, setBlogPosts] = useState(props.blogPosts);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageCount, setPerPageCount] = useState(props.perPageCount);
  const [totalPostCount, setTotalPostCount] = useState(props.totalPostCount);

  const currentUrl = currentUrlFn();
  const [metaTitle, setMetaTitle] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
    }
    getBlogPostsByKeword()
  }, [keyword, currentPage]);
  const getBlogPostsByKeword = async () => {
    setLoading(true)
    try {
      await fetch(`${SERVER_URL}/blogs?q=${keyword}&page=${currentPage}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
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
    console.log(searchKeyword);
    history.push(`/news/${searchKeyword}`)
  }

  const onPageChangeHandler = (pageNum) => {
    setCurrentPage(pageNum)
  }


  return (
    <Aux>
      <SEO 
            title={`${APPLICATION_NAME} | news`}
            description={metaDescription}
            siteTitle={metaTitle}
            keywords={metaKeyword}
            href={currentUrl}
        />
      <div className="Banner d-none d-sm-block">
        <div className="BannerInnerBlog">
          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <div className="BannerText">
                  <div className="BannerTitle">Blog</div>
                  <p>While they might seem like toys, a high-quality quadcopter is a serious investment, and an easy way to add production value to a film project, or get a unique view on the world for your travel vlog. We&apos;ve flown plenty, and these are the best drones in our tests.</p>
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
              <li className="breadcrumb-item active" aria-current="page">Blog</li>
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
                      return <BlogArticle
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

                {
                  <BlogRecent />
                }
                <div className="TdBox Td_recent_posts TdFeaturedPilots">
                  <h4><span>Featured Pilots</span></h4>
                  <div className="btImageTextWidgetWraper">
                    <ul>
                      <li>
                        <div className="TdImageTextWidget">
                          <div className="TdImageTextWidgetImage">
                            <a href="#"><img width="160" height="160" src={`/images/pilot1.png`} className="img-fluid" alt="pilot1" /></a>
                          </div>
                          <div className="TdImageTextWidgetText">
                            <header className="Td_headline Td_superheadline">
                              <h4 className="Td_headline_tag">
                                <span className="Td_headline_superheadline">Pro Drone Specialist - Environmental Monitoring</span>
                                <span className="Td_headline_content"><span><a href="#" target="_self" title="In the USA are changed drone rules">Jose Salazar</a></span></span>
                              </h4>
                            </header>
                            <ul className="PilotSkills">
                              <li><a href="#" className="badge badge-warning">Drone</a></li>
                              <li><a href="#" className="badge badge-warning">Videography</a></li>
                              <li><a href="#" className="badge badge-warning">Photography</a></li>
                              <li><a href="#" className="badge badge-warning">Video Editing</a></li>
                              <li><a href="#" className="badge badge-warning">Adobe Premiere</a></li>
                            </ul>
                            <small><a href="pilot-details.html">See Profile</a></small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="TdImageTextWidget">
                          <div className="TdImageTextWidgetImage">
                            <a href="#"><img width="160" height="160" src={`/images/pilot2.png`} className="img-fluid" alt="pilot2" /></a>
                          </div>
                          <div className="TdImageTextWidgetText">
                            <header className="Td_headline Td_superheadline">
                              <h4 className="Td_headline_tag">
                                <span className="Td_headline_superheadline">Pro Drone Specialist - Real Estate</span>
                                <span className="Td_headline_content"><span><a href="#" target="_self" title="In the USA are changed drone rules">Alfred Vicz</a></span></span>
                              </h4>
                            </header>
                            <ul className="PilotSkills">
                              <li><a href="#" className="badge badge-warning">Drone</a></li>
                              <li><a href="#" className="badge badge-warning">Videography</a></li>
                              <li><a href="#" className="badge badge-warning">Photography</a></li>
                              <li><a href="#" className="badge badge-warning">Video Editing</a></li>
                              <li><a href="#" className="badge badge-warning">Adobe Premiere</a></li>
                            </ul>
                            <small><a href="pilot-details.html">See Profile</a></small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="TdImageTextWidget">
                          <div className="TdImageTextWidgetImage">
                            <a href="#"><img width="160" height="160" src={`/images/pilot3.png`} className="img-fluid" alt="pilot3" /></a>
                          </div>
                          <div className="TdImageTextWidgetText">
                            <header className="Td_headline Td_superheadline">
                              <h4 className="Td_headline_tag">
                                <span className="Td_headline_superheadline">Pro Drone Specialist - Advertising</span>
                                <span className="Td_headline_content"><span><a href="#" target="_self" title="In the USA are changed drone rules">Elisha Mae</a></span></span>
                              </h4>
                            </header>
                            <ul className="PilotSkills">
                              <li><a href="#" className="badge badge-warning">Drone</a></li>
                              <li><a href="#" className="badge badge-warning">Videography</a></li>
                              <li><a href="#" className="badge badge-warning">Photography</a></li>
                              <li><a href="#" className="badge badge-warning">Video Editing</a></li>
                              <li><a href="#" className="badge badge-warning">Adobe Premiere</a></li>
                            </ul>
                            <small><a href="pilot-details.html">See Profile</a></small>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="TdBox widget_categories">
                  <h4><span>Categories</span></h4>
                  <BlogCategories />
                </div>
              </aside>
            </div>

          </div>
        </div>
      </div>
    </Aux>
  )
}
export async function getServerSideProps(context) {
  const keyword = context.params.keyword;
  let currentPage = 1;
  return await fetch(`${SERVER_URL}/blogs?q=${keyword}&page=${currentPage}`, {
    method: "GET",
  })
  .then((res) => res.json())
  .then((response) => {
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
export default BlogSearch;