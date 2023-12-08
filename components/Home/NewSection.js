import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import Loader from "react-loader-spinner";
import parse from 'html-react-parser';

const NewSection = () => {

    const [news, setNews] = useState([]);
    const [loadingImage, setLoadingImage] = useState(true);
    const [loadingNews, setLoadingNews] = useState(true);
    const [limitNumber, setLimitNumber] = useState(5);
    const [limitLabel, setLimitLabel] = useState('Show more');

    useEffect(() => {
        try{
            fetch(`${SERVER_URL}/home/blog`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    setLoadingNews(false);
                    if (response.statusCode === 200) {
                        setNews(response.data);
                    }
                });
        }catch (error) {
            setLoadingNews(false);
        }        
    }, []);
    const changeLimitLabel = (limit, total) => {
        if (limit === 5) {   
            setLimitLabel('Show less');
            setLimitNumber(total);
        } else {    
            setLimitLabel('Show more');
            setLimitNumber(5);
        }
    }

    const listJobLocations = (location) => {
        return  location.map((data, index) => {
                    if (index < limitNumber)
                    return <li>{data.city}{data.state ? ', '+data.state : ''}</li>
                })
                   
    }

    return (
            
            <div className="MainArticles paddngtb">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="ArticleBox">
                                <div className="ArticleTitle">
                                {news.category_1}
                                </div>
                                <div className="d-sm-block" style={{position: 'relative'}}>
                                    {
                                    loadingImage
                                    ?
                                    <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center', position:'absolute', backgroundColor: '#fff' }}>
                                        <div style={{ textAlign: 'center', height: '300px' }}>
                                            <Loader
                                                type="ThreeDots"
                                                color="#ffcc0e"
                                                height={100}
                                                width={100}
                                                visible={loadingImage}
                                            />
                                        </div>
                                    </div>
                                    :
                                    null
                                    }
                                    <Link href={`/blog/${news.category_1_title_slug}`}>
                                        <a href={`/blog/${news.category_1_title_slug}`}><img className="img-fluid" src={news.category_1_image} alt="Trending News" onLoad={()=>setLoadingImage(false)} /></a>
                                    </Link>
                                    
                                
                                    <div className="ArticleDesc">
                                        <div className="ArticleDescH fixHeight">{news.category_1_title}</div>
                                        <p className="fixHeight">{news.category_1_short_descrption}</p>
                                        <Link href={`/blog/${news.category_1_title_slug}`}>
                                            <a href={`/blog/${news.category_1_title_slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {
                                loadingNews
                                ?
                                <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                                    <Loader
                                        type="ThreeDots"
                                        color="#ffcc0e"
                                        height={100}
                                        width={100}
                                        visible={loadingNews}
                                    />
                                </div>
                                :
                                news.category_1_blogs && news.category_1_blogs.map((blog_new, index) => {
                                    return < div className="ArticleInn" key={`blog-new-${index}`}>
                                        <div className="row">
                                            {
                                                blog_new.image
                                                ?
                                                <div className="col-4 col-sm-4">                                                
                                                    <img className="img-fluid" src={blog_new.image} alt="03imgarticle" />                                                
                                                </div>
                                                :
                                                null
                                            }
                                            
                                            <div className={`${blog_new.image ? 'col-8 col-sm-8' : 'col-12 col-sm-12'}`}>
                                                <div className="ArticleDesc">
                                                    <div className="ArticleDescH">{blog_new.title}</div>
                                                    {
                                                        blog_new.excerpt
                                                        ?
                                                        <p>{parse(blog_new.excerpt)}</p>
                                                        :
                                                        null
                                                    }
                                                    <Link href={`/blog/${blog_new.slug}`}>
                                                        <a href={`/blog/${blog_new.slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            <div className="ArticleBox ArticleBoxLatestJobs" style={{borderBottom: 0, paddingBottom: 0, marginBottom:0}}>
                                <div className="ArticleTitle">
                                {/* {news.category_3} */}
                                Droning Jobs
                                </div>
                                <div className="d-sm-block" style={{position: 'relative'}}>
                                    {
                                    loadingImage
                                    ?
                                    <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center', position:'absolute', backgroundColor: '#fff' }}>
                                        <div style={{ textAlign: 'center', height: '300px' }}>
                                            <Loader
                                                type="ThreeDots"
                                                color="#ffcc0e"
                                                height={100}
                                                width={100}
                                                visible={loadingImage}
                                            />
                                        </div>
                                    </div>
                                    :
                                    null
                                    }
                                    
                                    <Link href={`/job-list`}>
                                        <a href={`/job-list`}><img className="img-fluid" src={`/images/jobHome.jpg`} alt="Trending News" onLoad={()=>setLoadingImage(false)} /></a>
                                    </Link>
                                                               
                                    {/* <div className="ArticleDesc PilotInfo PilotJobInfo">
                                        <div className="ArticleDescH fixHeight">{news.category_3_title}</div>
                                        <ul><li>West Edview, Akita</li></ul>
                                        <p className="fixHeight">{news.category_3_short_descrption}</p><br />
                                        <Link to={`/blog/${news.category_3_title_slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></Link>
                                    </div> */}
                                </div>
                            </div>
                            {
                                loadingNews
                                ?
                                <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                                    <Loader
                                        type="ThreeDots"
                                        color="#ffcc0e"
                                        height={100}
                                        width={100}
                                        visible={loadingNews}
                                    />
                                </div>
                                :
                                news.category_3_blogs && news.category_3_blogs.map((blog_new, index) => {
                                    return < div className="ArticleInn" key={`blog-new-${index}`}>
                                        <div className="row">
                                            {
                                                blog_new.hasOwnProperty('image') && blog_new.image
                                                ?
                                                <div className="col-4 col-sm-4">                                                
                                                    <img className="img-fluid" src={blog_new.image} alt="03imgarticle" />                                                
                                                </div>
                                                :
                                                null
                                            }
                                            
                                            <div className={`${blog_new.image ? 'col-8 col-sm-8' : 'col-12 col-sm-12'}`}>
                                                <div className="ArticleDescH">{blog_new.job_title}</div>
                                                <div className="PilotInfo PilotJobInfo">
                                                    <ul>
                                                    {
                                                        listJobLocations(blog_new.location)
                                                    }
                                                    {
                                                        blog_new.location.length > 5
                                                        ?
                                                        <li style={{backgroundColor:'#fff'}}><span style={{cursor:'pointer',}} onClick={()=>changeLimitLabel(limitNumber, blog_new.location.length)}>{limitLabel}</span></li>
                                                        :
                                                        null  
                                                    }
                                                    </ul>
                                                </div>
                                                <div className="ArticleDesc">                                                    
                                                    {
                                                        blog_new.job_description
                                                        ?
                                                        <p>{parse(blog_new.job_description.substr(0, 100))}...</p>
                                                        :
                                                        null
                                                    }
                                                    <Link href={`/job/${blog_new.id}/${blog_new.slug}`}>
                                                        <a href={`/job/${blog_new.id}/${blog_new.slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                        </div>

                        <div className="col-sm-6">
                            <div className="ArticleBox">
                                <div className="ArticleTitle">
                                {news.category_2}
                                </div>
                                <div className="d-sm-block" style={{position: 'relative'}}>
                                    {
                                    loadingImage
                                    ?
                                    <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center', position:'absolute', backgroundColor: '#fff' }}>
                                        <div style={{ textAlign: 'center', height: '300px' }}>
                                            <Loader
                                                type="ThreeDots"
                                                color="#ffcc0e"
                                                height={100}
                                                width={100}
                                                visible={loadingImage}
                                            />
                                        </div>
                                    </div>
                                    :
                                    null
                                    }
                                    <Link href={`/blog/${news.category_2_title_slug}`}>
                                        <a href={`/blog/${news.category_2_title_slug}`}><img className="img-fluid" src={news.category_2_image} onLoad={()=>setLoadingImage(false)} alt="Video Reel of the Week" /></a>
                                    </Link>
                                    
                                
                                    <div className="ArticleDesc">
                                        <div className="ArticleDescH fixHeight">{news.category_2_title}</div>
                                        <p className="fixHeight">{news.category_2_short_descrption} </p>
                                        <Link href={`/blog/${news.category_2_title_slug}`}>
                                            <a href={`/blog/${news.category_2_title_slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {
                                loadingNews
                                ?
                                <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                                    <Loader
                                        type="ThreeDots"
                                        color="#ffcc0e"
                                        height={100}
                                        width={100}
                                        visible={loadingNews}
                                    />
                                </div>
                                :
                                news.category_2_blogs && news.category_2_blogs.map((blog_new_2, index) => {
                                    return < div className="ArticleInn" key={`${blog_new_2.title}-${index}`}>
                                        <div className="row">
                                            {
                                                blog_new_2.image
                                                ?
                                                <div className="col-4 col-sm-4">
                                                    <img className="img-fluid" src={blog_new_2.image} alt="03imgarticle" />
                                                </div>
                                                :
                                                null
                                            }
                                            
                                            <div className={`${blog_new_2.image ? 'col-8 col-sm-8' : 'col-12 col-sm-12'}`}>
                                                <div className="ArticleDesc">
                                                    <div className="ArticleDescH">{blog_new_2.title}</div>
                                                    {
                                                        blog_new_2.excerpt
                                                        ?
                                                        <p>{parse(blog_new_2.excerpt)}</p>
                                                        :
                                                        null
                                                    }
                                                    <Link href={`/blog/${blog_new_2.slug}`}>
                                                        <a href={`/blog/${blog_new_2.slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            <div className="ArticleBox">
                                <div className="ArticleTitle">
                                {news.category_4}
                                </div>
                                <div className="d-sm-block" style={{position: 'relative'}}>
                                    {
                                    loadingImage
                                    ?
                                    <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center', position:'absolute', backgroundColor: '#fff' }}>
                                        <div style={{ textAlign: 'center', height: '300px' }}>
                                            <Loader
                                                type="ThreeDots"
                                                color="#ffcc0e"
                                                height={100}
                                                width={100}
                                                visible={loadingImage}
                                            />
                                        </div>
                                    </div>
                                    :
                                    null
                                    }
                                    <Link href={`/blog/${news.category_4_title_slug}`}>
                                        <a href={`/blog/${news.category_4_title_slug}`}><img className="img-fluid" src={news.category_4_image} onLoad={()=>setLoadingImage(false)} alt="Video Reel of the Week" /></a>
                                    </Link>
                                    
                                
                                    <div className="ArticleDesc">
                                        <div className="ArticleDescH fixHeight">{news.category_4_title}</div>
                                        <p className="fixHeight">{news.category_4_short_descrption} </p>
                                        <Link href={`/blog/${news.category_4_title_slug}`}>
                                            <a href={`/blog/${news.category_4_title_slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {
                                loadingNews
                                ?
                                <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                                    <Loader
                                        type="ThreeDots"
                                        color="#ffcc0e"
                                        height={100}
                                        width={100}
                                        visible={loadingNews}
                                    />
                                </div>
                                :
                                news.category_4_blogs && news.category_4_blogs.map((blog_new, index) => {
                                    return < div className="ArticleInn" key={`blog-new-${index}`}>
                                        <div className="row">
                                            {
                                                blog_new.hasOwnProperty('image') && blog_new.image
                                                ?
                                                <div className="col-4 col-sm-4">                                                
                                                    <img className="img-fluid" src={blog_new.image} alt={blog_new.title} />                                                
                                                </div>
                                                :
                                                null
                                            }
                                            
                                            <div className={`${blog_new.image ? 'col-8 col-sm-8' : 'col-12 col-sm-12'}`}>
                                                <div className="ArticleDesc">
                                                    <div className="ArticleDescH">{blog_new.title}</div>
                                                    {
                                                        blog_new.excerpt
                                                        ?
                                                        <p>{parse(blog_new.excerpt)}</p>
                                                        :
                                                        null
                                                    }
                                                    <Link href={`/blog/${blog_new.slug}`}>
                                                        <a href={`/blog/${blog_new.slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default NewSection;