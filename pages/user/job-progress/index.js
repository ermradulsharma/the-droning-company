import React from "react";
import Image from "next/image";

const JobProgress = () => {
    return (
        <div className="container-fluid JobDetailsProgressTracking">
            <div className="DashHeading">
                <h1 className="h1 mb-0 text-black"><i className="far fa-arrow-alt-circle-right"></i>Job Tracking by Pilots Hired</h1>
                <p className="lead">Here is the job tracking pilots hired</p>

            </div>
            <div className="row">
                <div className="col-12 text-left mb-3">
                    <div className="card shadow px-4 py-4">
                        <div className="card-job-item">
                            <div className="card-info-left">
                                <div className="itemRows">

                                    <ul className="JobEdit">
                                        <li><label>Job Id</label><strong>#897654</strong></li>
                                        <li><label>Job Status</label><span className="badge badge-success">Published</span></li>
                                        <li><label>Job Title</label><input className="form-control" type="text" value="Looking for Drone Pilot" /></li>
                                        <li><label>Job Location</label><input className="form-control" type="text" value="Frisco, TX, USA" /></li>
                                        <li><label>Job Attchment</label><input className="form-control" type="text" value="job.doc" /></li>
                                        <li><label>Job Description</label><textarea className="form-control" name="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet sem ultricies, porttitor urna non, semper nibh. Nunc eget orci luctus, cursus nunc quis, condimentum nisl. Nam nibh ligula...</textarea></li>

                                    </ul>
                                </div>



                                <div className="itemRows">

                                    <ul className="JobEdit">
                                        <li><label>Job Id</label><strong>#897654</strong></li>
                                        <li><label>Job Status</label><span className="badge badge-success">Published</span></li>
                                        <li><label>Job Title</label><p>Looking for Drone Pilot</p></li>
                                        <li><label>Job Location</label><p>Frisco, TX, USA</p></li>
                                        <li><label>Job Attchment</label><p>job.doc</p></li>
                                        <li><label>Job Description</label><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet sem ultricies, porttitor urna non, semper nibh. Nunc eget orci luctus, cursus nunc quis, condimentum nisl. Nam nibh ligula...</p></li>

                                    </ul>
                                </div>

                            </div>
                            <div className="card-action-right text-center">
                                <p><b>Posted On: 05/05/2021</b></p>
                                <button type="button" className="action-button">Save</button>
                            </div>
                        </div>
                        <div className="card-header py-3 mb-3">

                            <select className="form-control col-sm-2">
                                <option>Select Pilot</option>
                                <option>Alfred Vicz</option>
                                <option>Jose Salazar</option>
                                <option>Elisha Mae</option>
                                <option>Danel Khon</option>
                                <option>Mirka Lou</option>
                            </select>
                        </div>

                        <div className="row">

                            <div className="col-sm-5">
                                <div className="card px-4 py-4">

                                    <div className="PilotTrackingBox">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <Image className="img-profile rounded-circle" src="/images/undraw_profile.svg" alt="profile" width={60} height={60} />
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="pilot-info text-primary">
                                                    <h2>
                                                        <span className="font-bebas">Alfred Vicz</span>
                                                        <small>(21 Jobs) | $65/hr</small>
                                                    </h2>
                                                    <h6>Pro Drone Specialist - Real Estate</h6>
                                                    <div className="key-skills-list">
                                                        <span>Drone</span>
                                                        <span>Videography</span>
                                                        <span>Photography</span>
                                                        <span>Video Editing</span>
                                                    </div>
                                                    <button type="button" className="btn btn-link SeeMore p-0">View Profile</button>
                                                </div>

                                            </div>
                                            <div className="col-sm-12">
                                                <div className="card-action-right paddngtb40">
                                                    <button type="button" className="btn btn-sm btn-outline-dark ">Contact Pilot</button>
                                                    <button type="button" className="btn btn-sm btn-outline-success">Chat Pilot</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="card">
                                    <div className="card-body">
                                        <button type="button" className="btn btn-sm btn-primary shadow-sm float-right"><i className="fas fa-plus fa-sm text-white-50"></i> Send a message</button>
                                        <div className="clearfix"></div>
                                        <div id="content">
                                            <ul className="timeline">
                                                <li className="event" data-date="12:30 - 1:00pm">
                                                    <h3>Pending Approved / Job Started</h3>
                                                    <p>Your job didn&apos;t meet our requirements for approval.</p>
                                                </li>
                                                <li className="event" data-date="2:30 - 4:00pm">
                                                    <h3>Job in-progress</h3>
                                                    <p>Pilot HD started the work.</p>
                                                </li>
                                                <li className="event" data-date="5:00 - 8:00pm">
                                                    <h3>Expected completion on <a data-date="">02/02/2021</a></h3>
                                                    <p>Pilot is progressing well, there is delay in job</p>
                                                </li>
                                                <li className="event" data-date="8:30 - 9:30pm">
                                                    <h3>Job Completed on <a>03/02/2021</a></h3>
                                                    <p>job has completed satisfactorily</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobProgress;