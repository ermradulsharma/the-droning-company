import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Link from "next/link";

const GetStarted = () => {

	return (
		<Aux>
			<div className="MainHeading">
				<h1>Meet the best Pilots for your needs and budget</h1>
				<p>We&apos;re about Quality and Trust.</p>
				<br />
				<br />
			</div>
			<div className="row text-center">
				<div className="col-sm-4">
					<div className="row BestPilotBox">
						<div className="col-12 col-sm-12">
							<img className="img-fluid IconImg" src={`/images/ic1.png`} alt="sign up/create an account" />
						</div>
						<div className="col-12 col-sm-12">
							<div className="BestSteps">
								<h5>Sign up/create an account</h5>
								<p>Join our community and take flight!</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-4">
					<div className="row BestPilotBox">
						<div className="col-12 col-sm-12">
							<img className="img-fluid IconImg" src={`/images/ic2.png`} alt="Search for a drone pilot" />
						</div>
						<div className="col-12 col-sm-12">
							<div className="BestSteps">
								<h5>Search for a drone pilot</h5>
								<p>Your perfect drone pilot awaits.</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-4">
					<div className="row BestPilotBox">
						<div className="col-12 col-sm-12">
							<img className="img-fluid IconImg" src={`/images/ic3.png`} alt="Get your job done" />
						</div>
						<div className="col-12 col-sm-12">
							<div className="BestSteps">
								<h5>Create a Job Listing</h5>
								<p>Start your search for a certified Drone Pilot</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center autoWidthBtn">
				<a className="btn BtnGetStarted" title="Get Started" href="/registration">Get Started</a>
			</div>
		</Aux>
	);
};

export default GetStarted;
