import React, {useState, useEffect} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { SERVER_URL, APPLICATION_NAME, SERVER_BASE_URL } from "../../util/Constants";
import Link from "next/link";
import Loader from "react-loader-spinner";
import SEO from "../../components/Seo/Seo";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
const Sitemap = () => {

    const [blogsUrl, setBlogsUrl] = useState([]);
    const [blogCategoryUrl, setBlogCategoryUrl] = useState([]);
    const [pilotsProfileUrl, setPilotsUrl] = useState([]);
    const [jobUrl, setJobsUrl] = useState([]);
    const [loading, setLoading] = useState(true);
    const {currentUrlFn} = useCommonFunctionContext();
    const currentUrl = currentUrlFn();
    const hostBlogBaseURL = SERVER_BASE_URL+'/blog';
    const hostBlogCategoryBaseURL = SERVER_BASE_URL+'/news/categories';
    const hostPilotBaseURL = SERVER_BASE_URL+'/pilot';
    const hostJobBaseURL = SERVER_BASE_URL+'/job';
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
		    window.scrollTo(0, 0);
        }
        getBlogUrl();
        getBlogCategoryUrl();
        getPilotsProfileUrl();
        getJobsUrl();
    }, []);
    
    const getBlogUrl = async () => {
        try {   
            await fetch(`${SERVER_URL}/blog/sitemap/`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((response) => {
                setLoading(false);
                if (response.statusCode === 200) {
                    setBlogsUrl(response.data.data);
                }
            });
        } catch (error) {
            setLoading(false);
        }
    }

    const getBlogCategoryUrl = async () => {
        try {   
            await fetch(`${SERVER_URL}/blog-categories/`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((response) => {
                setLoading(false);
                if (response.statusCode === 200) {
                    setBlogCategoryUrl(response.data);
                }
            });
        } catch (error) {
            setLoading(false);
        }
    }

    const getPilotsProfileUrl = async () => {
        try {   
            await fetch(`${SERVER_URL}/pilot/sitemap/`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((response) => {
                setLoading(false);
                if (response.statusCode === 200) {
                    setPilotsUrl(response.data);
                }
            });
        } catch (error) {
            setLoading(false);
        }
    }

    const getJobsUrl = async () => {
        try {   
            await fetch(`${SERVER_URL}/job/list/sitemap/`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((response) => {
                setLoading(false);
                if (response.statusCode === 200) {
                    setJobsUrl(response.data);
                }
            });
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <Aux>
            <SEO 
                title={`${APPLICATION_NAME} | Sitemap`}
                description={''}
                siteTitle={''}
                keywords={''}
                href={currentUrl}
            />
            <div className="PrivacyPage paddngtb"> 
                <div className="container">
                    <div className="row"> 
                <div className="col-sm-12"> 
                <div className="panel-group" id="accordionGroupOpen" role="tablist" aria-multiselectable="true">
               
                {
                    loading
                    ?
                    <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                        <Loader
                            type="ThreeDots"
                            color="#ffcc0e"
                            height={100}
                            width={100}
                            visible={loading}
                        />
                    </div>
                    :
                    <div className="PrivacyPage SiteMapContent paddngtb"> 
                        <div className="container">
                            <div className="row"> 
                                <div className="col-sm-12"> 
                                    <div className="justify-content-center">
                                        <div className="row SiteMapBox">
                                            <div className="col-sm-4 form-group">
                                                <h3><i className="fas fa-list"></i> <Link href="/">Home</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <h3><i className="fas fa-list"></i> <Link href="/about-us">About Us</Link></h3>
                                                <Link href="/our-team/stuart-smith"><a><i className="fas fa-link"></i> Stuart Smith</a></Link>
                                                <Link href="/our-team/archie-galbraith"><a><i className="fas fa-link"></i> Archie Galbraith</a></Link>
                                                <Link href="/our-team/michael-molenda"><a><i className="fas fa-link"></i> Michael Molenda</a></Link>
                                                <Link href="/our-team/michael-keeper"><a><i className="fas fa-link"></i> Michael Keeper</a></Link>
                                                <Link href="/our-team/ben-behrooz"><a><i className="fas fa-link"></i> Ben Behrooz</a></Link>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <h3><i className="fas fa-list"></i> <Link href="/gear-reviews">Gear Reviews</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">                                            
                                                <h3><i className="fas fa-list"></i> <Link href="/news">Blogs</Link></h3>
                                                {
                                                    blogsUrl.map(data => {
                                                        return <Aux key={data.slug}>
                                                            <a 
                                                                    href={`${hostBlogBaseURL}/${data.slug}`}
                                                                ><i className="fas fa-link"></i> {data.hasOwnProperty('title') ? data.title : data.slug}</a>
                                                                
                                                        </Aux>
                                                        
                                                    })
                                                }
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <a href="#">Blog Categories</a></h3>
                                            {
                                                blogCategoryUrl.map(data => {
                                                    return <Aux key={data.slug}>
                                                        <a 
                                                                href={`${hostBlogCategoryBaseURL}/${data.slug}`}
                                                            ><i className="fas fa-link"></i> {data.hasOwnProperty('title') ? data.title : data.slug}</a>
                                                            
                                                    </Aux>
                                                    
                                                })
                                            }
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <h3><i className="fas fa-list"></i> <Link href="pilot-list">Pilot Profiles</Link></h3>
                                                {
                                                    pilotsProfileUrl.map(data => {
                                                        return <a  key={data.id}
                                                                href={`${hostPilotBaseURL}/${data.slug}`}
                                                            ><i className="fas fa-link"></i> {data.hasOwnProperty('title') ? data.title : data.slug}</a>
                                                    })
                                                }
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <h3><i className="fas fa-list"></i> <Link href="job-list">Job List</Link></h3>
                                                {
                                                    jobUrl.map(data => {
                                                        return <a  key={data.id}
                                                                    href={`${hostJobBaseURL}/${data.id}/${data.slug}`}
                                                                ><i className="fas fa-link"></i> {data.hasOwnProperty('job_title') ? data.job_title : data.slug}</a>
                                                    })
                                                }
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <h3><i className="fas fa-list"></i> <Link href="/contact-us">Contact Us</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/faqs">Faqs</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/login">Login</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/registration">Sign Up</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/terms">Terms &amp; Conditions</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/privacy-policy">Privacy Policy</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/looking-pilots">Looking For Pilot</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/pilots-welcome">Welcome Pilots</Link></h3>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                            <h3><i className="fas fa-list"></i> <Link href="/sitemap">Sitemap</Link></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                }
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
        
    );
};
export default Sitemap;