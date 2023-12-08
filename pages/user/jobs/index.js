import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../../util/Constants";
import useAuthContext from "../../../hooks/useAuthContext";
import useCommonFunctionContext from "../../../hooks/useCommonFunctionContext";
import Pagination from '../../../components/UI/Pagination/Pagination';
import Loader from "react-loader-spinner";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Link from "next/link";
import { useRouter } from "next/router";
import Moment from "react-moment";

const MyJobs = () => {
    const { accessToken, userId } = useAuthContext();
    const { backgroundStatusColor } = useCommonFunctionContext();
    const [getMyJob, setMyJob] = useState([]);
    const [jobFilter, setJobFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobCount, setTotalJobCount] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [jobNotfound, setJobNotfound] = useState(false);
    const [inputSearchKeyword, setInputSearchKeyword] = useState('');
    let history = useRouter();

    const onJobFilterStatusChange = (event) => {
        setJobFilter(event);

    }
    const onJobSearch = (e) => {
        setSearchKeyword(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 3) {
            return
        } else if (e.target.value < 1) {
            setInputSearchKeyword('')
        } else {
            setInputSearchKeyword(e.target.value)
        }

    }
    useEffect(() => {
        getUserCreatedJob()
    }, [jobFilter, currentPage, inputSearchKeyword, userId]);
    const getUserCreatedJob = async () => {
        setLoading(true)
        try {
            await fetch(`${SERVER_URL}/job/myJobs?user_id=${userId}&jobfilter=${jobFilter}&page=${currentPage}&q=${searchKeyword}`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    if (response.statusCode === 200) {
                        setMyJob(response.data);
                        setTotalJobCount(response.no_of_jobs);
                        setJobNotfound(false);
                    } else {
                        setJobNotfound(true);
                        setMyJob(null);
                        setTotalJobCount(null);
                    }

                });
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
    }

    const onPageChangeHandler = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const jobDetailHandler = (jobId) => {
        history.push(`/user/job-detail/${jobId}`)
    }

    return (
        <div className="container-fluid">
            <div className="DashHeading mb-3">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="h1 text-black"><i className="far fa-arrow-alt-circle-right"></i> My Jobs</h1>
                    </div>
                    <div className="col-sm-6">
                        <ul id="tabs" className="mt-4 nav nav-tabs d-flex justify-content-end">
                            <li className="nav-item">
                                <Link href="/user/create-job">
                                    <a className="nav-link active">Create Job</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
           
            <div className="row">
                <div className="col-12 text-left mb-3">
                    <div className="card px-0 pb-0">
                        <div className="row">
                            <div className="col-12">
                                <div id="published_jobs_tab" className="card-wrapper">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-8 mt-2">
                                            <ul className="filterTabs">
                                                <li><span>Filter Jobs By:</span></li>

                                                <li>
                                                    <button onClick={(e) => onJobFilterStatusChange('all')} type="button" disabled={jobFilter == "all" ? "disabled" : ''}
                                                        id="published_jobs_status_all">All</button>
                                                </li>


                                                <li><button onClick={(e) => onJobFilterStatusChange('active')}
                                                    type="button" id="published_jobs_status_published"
                                                    disabled={jobFilter == "active" ? "disabled" : ''}
                                                >Published</button></li>

                                                <li><button onClick={(e) => onJobFilterStatusChange('pending-approval')} type="button" id="published_jobs_status_pending_approval"
                                                    disabled={jobFilter == "pending-approval" ? "disabled" : ''}
                                                >Pending Approval</button></li>
                                                <li><button onClick={(e) => onJobFilterStatusChange('rejected')}
                                                    type="button" id="published_jobs_status_rejected"
                                                    disabled={jobFilter == "rejected" ? "disabled" : ''}
                                                >Rejected</button></li>
                                            </ul>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mt-2">
                                            <form name="form_search_pubished_jobs" id="form_search_pubished_jobs" post="get" action="">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group searchWrap">
                                                            <input onChange={(e) => onJobSearch(e)} value={searchKeyword} type="search" name="search_pubished_jobs" placeholder="Search Jobs" className="form-control" />
                                                            {
                                                                searchKeyword.length == 0 ? <i className="fas fa-search fa-sm"></i> : ''
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {loading && (
                                        <div className="row mt-2">
                                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                                <Loader
                                                    type="ThreeDots"
                                                    color="#ffcc0e"
                                                    height={50}
                                                    width={100}
                                                    visible={loading}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="row mt-2">
                                        <div className="col-12">

                                            <div className="job-items-grid" id="published_job_items">
                                                {!loading && (
                                                    <Aux>

                                                        {
                                                            getMyJob && getMyJob.map((job, index) => {
                                                                var extractLocation = job ? job.location[0] : '';
                                                                return <div className="card-job-item" key={job.id}>
                                                                    <div className="card-info-left">
                                                                        <div className="itemRows">
                                                                            <p>
                                                                                #{job.id} &nbsp;
                                                                                <span className={'badge ' + backgroundStatusColor(job.status)}>
                                                                                    {job.status}</span>
                                                                            </p>
                                                                            <a onClick={()=>jobDetailHandler(job.id)} className="post-title">{job.job_title}
                                                                            </a>
                                                                            <p>{extractLocation ? extractLocation.city : ''}, {extractLocation ? extractLocation.state : ''}, {extractLocation ? extractLocation.country : ''}</p>
                                                                            <small>Posted On: {
                                                                                    <Moment format="MM/DD/YYYY">
                                                                                        {job.created_at}
                                                                                    </Moment>    
                                                                                    }
                                                                            </small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-action-right">
                                                                        <button type="button" className="btn btn-dark btn-sm" onClick={()=>jobDetailHandler(job.id)}>Job Details</button>
                                                                        {/* <button type="button" className="btn btn-outline-danger btn-sm">Request Job Cancellation</button> */}
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                    </Aux>
                                                )}

                                                {!loading && jobNotfound && (
                                                    <div className="card-job-item">
                                                        <div className="card-info-left">
                                                            <div className="itemRows">
                                                                <p className="text-center">
                                                                    Job Not found
                                                                </p>

                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!loading && !jobNotfound && totalJobCount > 5
                            ?
                            <div className="row">
                                <div className="col-12">
                                    <nav aria-label="Page navigation" className="navigation">
                                        <Pagination
                                            total={totalJobCount}
                                            pageLimit={5}
                                            dataLimit={10}
                                            pageChange={onPageChangeHandler}
                                            cPage={currentPage}
                                        />
                                    </nav>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyJobs;