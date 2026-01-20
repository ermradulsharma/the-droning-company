import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import parse from 'html-react-parser';
import { SERVER_URL } from "../../../util/Constants";
import Loader from "@/components/Common/Loader";
import useAuthContext from "../../../hooks/useAuthContext";
import SEO from "../../../components/Seo/Seo";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import FeaturePilot from '../../../components/Blog/FeaturePilot';
import Head from 'next/head';
import Error from 'next/error';
const Job = (props) => {
    let history = useRouter();
    const jobId = history.query.jobId;
    const [jobData, setJobData] = useState(props.jobData);
    const [moreJobs, setMoreJobs] = useState(props.moreJobs);
    const [dataLoading, setDataLoading] = useState(false);
    const [isSetContactButton, setContactButton] = useState(false);
    const [isViewContact, setViewContact] = useState(false);
    const { authTokens, accessToken } = useAuthContext();
    const currentUrl = props.currentUrl;
    const [metaTitle, setMetaTitle] = useState(props.metaTitle);
    const [metaKeyword, setMetaKeyword] = useState(props.metaKeyword);
    const [metaDescription, setMetaDescription] = useState(props.metaDescription);
    const [limitNumber, setLimitNumber] = useState(8);
    const [limitLabel, setLimitLabel] = useState('Show more');
    const [limitMoreNumber, setLimitMoreNumber] = useState(2);
    const [limitMoreLabel, setLimitMoreLabel] = useState('Show more');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        getProfile()
    }, [jobId]);

    useEffect(()=>{  
        if (typeof window !== 'undefined') {      
            window.scrollTo(0, 0);
        }
    },[])
    
    if (props.errorCode) {
        return <Error statusCode={'404'} />
    }

    const getProfile = async () => {
        setDataLoading(true)
        try {
            await fetch(`${SERVER_URL}/job/list/show/${jobId}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.statusCode === 200) {
                        setDataLoading(false)
                        setJobData(response.data);
                        setMoreJobs(response.moreJobs);
                        setMetaTitle(response.data.profile.metatitle);
                        setMetaKeyword(response.data.profile.metakeyword);
                        setMetaDescription(response.data.profile.metadescription);
                    }
                });
        } catch (error) {
            setDataLoading(false)
        }
        setDataLoading(false)
    }

    const changeLimitLabel = (limit, total) => {
        if (limit === 8) {   
            setLimitLabel('Show less');
            setLimitNumber(total);
        } else {    
            setLimitLabel('Show more');
            setLimitNumber(8);
        }
    }

    const changeLimitMoreLabel = (limit, total) => {
        if (limit === 2) {   
            setLimitMoreLabel('Show less');
            setLimitMoreNumber(total);
        } else {    
            setLimitMoreLabel('Show more');
            setLimitMoreNumber(2);
        }
    }

    const listJobLocations = (location, section) => {

        return  location.map((data, index) => {
                const limitLoc = section === 'more-jobs' ? limitMoreNumber : limitNumber;
                    if (index < limitLoc)
                    return <li key={data.city}>{data.city}{data.state ? ', '+data.state : ''}</li>
            })       
    }

    //alert(fullPageLoading);
    const handleLoginToContactButton = () => {
        if (authTokens && accessToken) {
            setContactButton(true);
        } else {
            history.push('/login');
        }
    }

    

    return (

        dataLoading ?
            <div className="row">
                <div className="col-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                    <Loader
                        type="ThreeDots"
                        color="#ffcc0e"
                        height={100}
                        width={100}
                        visible={dataLoading}
                    />
                </div>
            </div>
            :
            <Aux>
                <SEO 
                    title={metaTitle}
                    description={metaDescription}
                    siteTitle={metaTitle}
                    keywords={metaKeyword}
                    href={currentUrl}
                />
                <Head>
                    <script 
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html:`
                            {
                                "@context": "https://schema.org/",
                                "@type": "JobPosting",
                                "title": "${metaTitle}",
                                "description": "${metaDescription}",
                                "hiringOrganization": {
                                  "@type": "Organization",
                                  "name": "${jobData.company_name}",
                                  "sameAs": "${currentUrl}"
                                },
                                "employmentType": "CONTRACTOR",
                                "datePosted": "${jobData.created_at}",
                                "validThrough": "",
                                "applicantLocationRequirements": {
                                  "@type": "Country",
                                  "name": "US"
                                },
                                "jobLocationType": "TELECOMMUTE"
                              }
                            `
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
                            <Link href="/job-list">Find a Job</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {jobData.job_title}
                            </li>
                        </ol>
                    </div>
                </nav>

                <div className="PilotFullInfo">
                    {

                        <div className="container">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="row PilotBox">
                                        {/* <div className="col-sm-3">
                                            <div className="PilotImg">
                                                <img
                                                    className="img-fluid"
                                                    src={jobData.file_attachment}
                                                    alt=""
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-sm-8">
                                            <div className="PilotInfo PilotJobInfoDetails">
                                                <h1> {jobData.job_title}</h1><br/>
                                                <p>Posted on {jobData.created_at}</p>
                                                <ul className="PilotDetails">
                                                    {
                                                        jobData.company_name
                                                        ?
                                                        <li>Company Name : {jobData.company_name}</li>
                                                        :
                                                        ''
                                                    }
                                                </ul>
                                                
                                                <hr/>
                                                    <div className="JobLoc">
                                                    <h2>Job Locations:</h2>
                                                    <ul>
                                                    {
                                                        jobData.location ?
                                                        listJobLocations(jobData.location, 'detail')
                                                        : null
                                                    }
                                                    {
                                                        jobData.location && jobData.location.length > 8
                                                        ?
                                                        <li style={{backgroundColor:'#fff'}}><span style={{cursor:'pointer'}} onClick={()=>changeLimitLabel(limitNumber, jobData.location.length)}>{limitLabel}</span></li>
                                                        :
                                                        null  
                                                    }
                                                    </ul>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 align-self-center">
                                            {/* {
                                                jobData.profile && jobData.profile.is_insured
                                                ?
                                                <img className="img-fluid PilotVerified" style={{marginBottom: '-140px', height:'200px', position:'relative'}} src={insuredIcon} alt="verified" />
                                                :
                                                null
                                            } */}                                       
                                            {
                                                isSetContactButton || (authTokens && accessToken)
                                                ?
                                                    isViewContact
                                                    ?
                                                        <div className="PilotBoxContactDetails">                                                            
                                                            <p><i className="fas fa-phone"></i> {jobData.contact_via_phone_number && jobData.user_mobile ? <a href={`tel:${jobData.user_mobile}`}> {jobData.user_mobile}</a> : 'Not available'}</p>
                                                            <p><i className="fas fa-envelope"></i> {jobData.contact_via_email && jobData.user_email ? <a href={`mailto:${jobData.user_email}`}>{jobData.user_email}</a> : 'Not available'}</p>
                                                        </div>
                                                    :
                                                    <button className="btn btn-warning BtnLog" type="button" onClick={()=>setViewContact(true)}>View Contact</button>
                                                :
                                                <button className="btn btn-warning BtnLog" type="button" onClick={()=>handleLoginToContactButton()}>
                                                    Log In To Contact
                                                </button>
                                            }
                                            
                                        </div>
                                    </div>
                                    <div className="AboutInfo">
                                        <div className="NormalHeading">Job Description:</div>
                                        <p>
                                            {jobData.job_description && parse(jobData.job_description)}
                                        </p>
                                    </div>
                            
                                    <div className="EqpBox">
                                        <div className="NormalHeading">More Jobs in the Area:</div>
                                            <div className="card-columns">
                                                    {
                                                        moreJobs && moreJobs.length
                                                        ?
                                                        moreJobs.map((job) => {
                                                            return <div key={job.id} className="card">
                                                                <div className="PilotInfo PilotJobInfo PilotMoreJob">
                                                                    <h1>{job.job_title}</h1><br />
                                                                    <ul>
                                                                    {
                                                                        job.location ?
                                                                        listJobLocations(job.location, 'more-jobs')
                                                                        : null
                                                                    }
                                                                    {
                                                                        job.location && job.location.length > 2
                                                                        ?
                                                                        <li style={{backgroundColor:'#fff'}}><span style={{cursor:'pointer'}} onClick={()=>changeLimitMoreLabel(limitMoreNumber, job.location.length)}>{limitMoreLabel}</span></li>
                                                                        :
                                                                        null  
                                                                    }
                                                                    </ul>
                                                                    {
                                                                        job.job_description
                                                                        ?
                                                                        <p className="PilotText">{parse(job.job_description.substr(0, 80))}</p>
                                                                        :
                                                                        null
                                                                    }
                                                                    <br />
                                                                    <Link  href={`/job/${job.id}/${job.slug}`}><a className="SeeMore">View Job &gt;</a></Link>
                                                                </div>
                                                            </div>
                                                        })
                                                        :
                                                        <p>No jobs found.</p>
                                                    }
                                            </div>
                                    </div>
                                </div>
                                  
                                <div className="col-md-3 paddngt">
                                <aside className="TdSidebar">
                                    {
                                    <FeaturePilot />
                                    }
                                </aside>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Aux>
    );
};

export async function getServerSideProps(context) {
    const currentURL = context.req.headers.host+''+context.resolvedUrl;
    const jobId = context.params.jobId;
  
    return await fetch(`${SERVER_URL}/job/list/show/${jobId}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((response) => {     
        if (response.statusCode === 200) { 
            return {
                props: {
                    jobData: response.data,
                    moreJobs: response.moreJobs,
                    metaTitle: response.data.hasOwnProperty('meta_title') 
                                        ? response.data.meta_title 
                                        : response.data.job_title,
                    metaKeyword: response.data.hasOwnProperty('meta_keyword') 
                                        ? response.data.meta_keyword
                                        : '',
                    metaDescription: response.data.hasOwnProperty('metadescription') 
                                        ? response.data.metadescription 
                                        : response.data.job_description.substring(0, 160),
                    currentUrl: currentURL,
                    errorCode: false
                }
            }
        } else {
            return {
                props: {
                    jobData: [],
                    moreJobs: [],
                    metaTitle: '',
                    metaKeyword: '',
                    metaDescription: '',
                    currentUrl: currentURL,
                    errorCode: true
                }
            }
        }
    });
  }

export default Job;
