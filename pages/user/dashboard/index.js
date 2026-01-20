import React, { useState, useEffect, useCallback } from "react";
import { SERVER_URL } from "../../../util/Constants";
import useAuthContext from "../../../hooks/useAuthContext";
import Loader from "@/components/Common/Loader";
import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";
const Dashboard = () => {
    const { accessToken, userId, setUserProfileImage
    } = useAuthContext();
    const [getRecentJob, setRecentJob] = useState([]);
    const [jobFilter, setJobFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [fullPageLoading, setFullPageLoading] = useState(true);

    const backgroundStatusColor = (status) => {

        if (status === 'Active') {
            return 'badge-success';
        }

        if (status === 'Pending Approval') {
            return 'badge-warning';
        }

        if (status === 'Rejected') {
            return 'badge-danger';
        }

        return 'badge-success';
    }

    const onJobFilterStatusChange = (event) => {
        setLoading(true)
        setJobFilter(event);

    }
    useEffect(() => {
        getUserCreatedJob()
    }, [getUserCreatedJob]);

    const getUserCreatedJob = useCallback(async () => {

        /* if (!loading) {
            setFullPageLoading(true)
        } */
        try {
            await fetch(`${SERVER_URL}/job/recently?user_id=${userId}&jobfilter=${jobFilter}`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then((res) => res.json())
                .then((response) => {
                    setFullPageLoading(false);
                    setLoading(false);
                    if (response.statusCode === 200) {
                        setRecentJob(response.data);
                        setUserProfileImage(response.data.profile_photo);
                    }
                });
        } catch (error) {
            setFullPageLoading(false);
        }
    }, [userId, jobFilter, accessToken, setUserProfileImage]);

    return (
        fullPageLoading ?
            <div className="row">
                <div className="col-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                    <Loader
                        type="ThreeDots"
                        color="#ffcc0e"
                        height={100}
                        width={100}
                        visible={fullPageLoading}
                    />
                </div>
            </div>
            :
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center justify-content-between">
                        <div className="profile-image">
                            <Image className="img-profile rounded-circle med" alt="profile" src={getRecentJob.profile_photo} width={150} height={150} />
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-4">

                    {/* <!-- Jobs Posted Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Jobs Posted
                                        </div>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{getRecentJob.job_posted}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Hires Card Example --> */}
                    {/* <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Hires</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{getRecentJob.hire}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Member Since</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <Moment format="MM/DD/YYYY">
                                                {getRecentJob.member_since}
                                            </Moment>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-12 mt-3">

                        <div className="card shadow mb-4">
                            <div className="card-header">
                                <h6 className="font-weight-bold text-primary float-left">Recently Posted Jobs</h6>
                                <div className="col-sm-2 float-right text-right">
                                    <div className="cstmselect">
                                        <select onChange={(e) => onJobFilterStatusChange(e.target.value)}>
                                            <option value="all">All</option>
                                            <option value="active">Published</option>
                                            <option value="pending-approval">Pending Approval</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Location</th>
                                                <th>Job Title</th>
                                                <th>Job Status</th>
                                                {/* <th>Job Category</th> */}
                                                <th>Posted On</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                                        <Loader
                                                            type="ThreeDots"
                                                            color="#ffcc0e"
                                                            height={50}
                                                            width={100}
                                                            visible={loading}
                                                        />
                                                    </td>
                                                </tr>
                                            )}

                                            {!loading && (


                                                getRecentJob.recentJobs && getRecentJob.recentJobs.map((job, index) => {
                                                    const extractLocation = job ? job.location[0] : '';
                                                    return <tr key={job.id}>
                                                        <td>{extractLocation ? extractLocation.city : ''}, {extractLocation ? extractLocation.state : ''}, {extractLocation ? extractLocation.country : ''}</td>
                                                        <td>{job.job_title}</td>
                                                        <td><p><span className={'badge ' + backgroundStatusColor(job.status)}>
                                                            {job.status}</span>
                                                        </p></td>
                                                        {/* <td>{job.job_category}</td> */}
                                                        <td>{
                                                            <Moment format="MM/DD/YYYY">
                                                                {job.created_at}
                                                            </Moment>
                                                        }</td>
                                                        <td>
                                                            <Link href={`/user/edit-job/${job.id}`} legacyBehavior>
                                                                <a className="btn btn-outline-primary btn-sm mt-2"><i className="far fa-edit"></i> &nbsp;Edit Job</a>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                })


                                            )}
                                            {
                                                !loading && getRecentJob.recentJobs && getRecentJob.recentJobs.length < 1
                                                    ?
                                                    <tr><td colSpan="5" style={{ textAlign: 'center' }}>Job Not found</td></tr>
                                                    :
                                                    null
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
    )
}

export default Dashboard