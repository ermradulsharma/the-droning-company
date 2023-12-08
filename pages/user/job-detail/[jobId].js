import React, { useState, useEffect} from "react";
import { SERVER_URL } from "../../../util/Constants";
import Loader from "react-loader-spinner";
import Moment from "react-moment";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import useAuthContext from "../../../hooks/useAuthContext";
import useCommonFunctionContext from "../../../hooks/useCommonFunctionContext";
import Link from "next/link";
import { useRouter } from "next/router";


const JobDetail = ({ match, location }) => {
    const router = useRouter();
    const jobId  = router.query.jobId;
    const [loading, setLoading] = useState(true);
    const [jobDetailData, setJobDetailData] = useState([]);
    const { accessToken } = useAuthContext();
    const { backgroundStatusColor } = useCommonFunctionContext();

    useEffect(() => {
        getJobtDetail()
    }, [jobId]);

    const getJobtDetail = async () => {
        try {
          await fetch(`${SERVER_URL}/job/show/${jobId}`, {
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
              setLoading(false);
              if (response.statusCode === 200) {
                setJobDetailData(response.data);
              }
            });
        } catch (error) {
          setLoading(false);
        }
    }

    return (
        <div className="container-fluid JobDetailsProgressTracking">
            {
                loading
                ?
                <div className="col-md-12" style={{ textAlign: 'center' }}>
                    <Loader
                        type="ThreeDots"
                        color="#ffcc0e"
                        height={100}
                        width={100}
                        visible={loading}
                    />
                </div>
                :
                <Aux>
                    <div className="DashHeading">
                        <h1 className="h1 mb-0 text-black"><i className="far fa-arrow-alt-circle-right"></i>Job Detail</h1>
                    </div>
                    <div className="row">
                        <div className="col-12 text-left mb-3">
                            <div className="card shadow px-4 py-4">
                                <div className="card-job-item">
                                    <div className="card-info-left">
                                        <div className="itemRows">

                                            <ul className="JobEdit">
                                                <li><label>Job Id</label><strong>#{jobDetailData.id}</strong></li>
                                                <li><label>Job Status</label><span className={`badge ${backgroundStatusColor(jobDetailData.status)}`}>{jobDetailData.status}</span></li>
                                                <li><label>Job Title</label><p>{jobDetailData.job_title}</p></li>
                                                <li><label>Company Name</label><p>{jobDetailData.company_name}</p></li>
                                                {/* <li><label>Job Budget</label><p>{jobDetailData.job_budget}</p></li> */}
                                                {/* <li><label>Job Categories</label>
                                                {
                                                        jobDetailData.job_categoires
                                                        ?
                                                        jobDetailData.job_categoires.map((category) => {
                                                            return <p>{category.skill_name}</p>
                                                        })
                                                        :
                                                        'No Categories'
                                                    }
                                                </li> */}
                                                <li><label>Job Location</label>
                                                    {
                                                        jobDetailData.location
                                                        ?
                                                        jobDetailData.location.map((location) => {
                                                            return <p key={location.city}>{`${location.city}, ${location.state}, ${location.country}`}</p>
                                                        })
                                                        :
                                                        'No Location'
                                                    }
                                                </li>
                                                {/* <li><label>Job Attachment</label>
                                                    <p>
                                                        {
                                                            jobDetailData.file_attachment
                                                            ?
                                                            <a href={`${jobDetailData.file_attachment}`} download target="_blank" rel="noreferrer noopener">
                                                                <i className="fa fa-download" aria-hidden="true"></i>
                                                            </a>
                                                            :
                                                            "No attachement available for this job."
                                                        }
                                                        
                                                    </p>
                                                </li> */}
                                                <li><label>Job Description</label><p>{jobDetailData.job_description}</p></li>
                                                <li><label>Candidate contact you via</label><p>{jobDetailData.contact_via_email ? 'Email' : ''}{jobDetailData.contact_via_phone_number ? ', Phone' : ''}</p></li>
                                                
                                            </ul>
                                            
                                            <Link href="/user/jobs"><a className="btn btn-dark btn-sm">Go Back to Jobs</a></Link>
                                            <Link href={`/user/edit-job/${jobDetailData.id}`}><a className="btn btn-dark btn-sm" style={{marginLeft:'10px'}}>Edit Job</a></Link>
                                            <br /><br />
                                        </div>

                                    </div>
                                    <div className="card-action-right text-center">
                                        <p><b>Posted On: {
                                            <Moment format="MM/DD/YYYY">
                                                {jobDetailData.created_at}
                                            </Moment>    
                                        }</b></p>
                                    </div>
                                </div>                                
                            </div>                        
                        </div>
                    </div>
                </Aux>
            }            
        </div>
    )
}

export default JobDetail;