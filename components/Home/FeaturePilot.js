import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import parse from 'html-react-parser';
const FeaturePilot = () => {
    const [homefeaturePilotData, sethomefeaturePilotData] = useState([]);
    useEffect(() => {
        fetch(`${SERVER_URL}/home/pilot-feature`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    sethomefeaturePilotData(response.data);
                }
            });
    }, []);
    return (<div className="col-md-6">
        <div className="MainHeading text-left paddngt">
            <h1>Featured Pilot of the Week</h1>
        </div>
        {
            homefeaturePilotData.map((pilot, index) => {
                return < div key={'homeFeaturePilot-' + index} className="row PilotBox paddngt" >
                    <div className="col-4 col-sm-4">
                        <div className="PilotImg">
                            <Link href={`/pilot/${pilot.slug}`}>
                                <a href={`/pilot/${pilot.slug}`}> 
                                    <img className="img-fluid" src={pilot.image} alt="pilot"/>
                                </a>
                            </Link>
                            {/* {
                                pilot.is_insured
                                ?
                                <img className="img-fluid PilotVerified" style={{marginTop: '-20px', position:'initial'}} src={insuredIcon} alt="verified" />
                                :
                                null
                            } */}                                                      
                            
                        </div>
                    </div>
                    <div className="col-8 col-sm-8">
                        <div className="PilotInfo">
                            <h1><Link href={`/pilot/${pilot.slug}`}>{pilot.name}</Link></h1>
                            <p><Link href={`/pilot/${pilot.slug}`}>{pilot.title}</Link></p>
                            <br /><br />
                           { /*<ul className="PilotDetails">
                                <li>({pilot.no_of_jobs} Jobs)</li>
                                <li>${pilot.hourly_rate}/hr</li>
                             </ul> */ }
                            <ul className="PilotSkills">
                                {
                                    pilot.skills.split(',').filter((skill, index) => index < 5).map((exploaded_skill, index) => {
                                        return <li key={exploaded_skill}><span className="badge badge-warning">{exploaded_skill}</span></li>
                                    })
                                }
                            </ul>
                            <p>
                                {
                                    pilot.short_description
                                    ?
                                    parse(`${pilot.short_description}...`)
                                    :
                                    null
                                }   
                            </p>
                            <small>
                                <Link href={`/pilot/${pilot.slug}`}>See Profile</Link>
                            </small>
                            <br />
                            <br />
                            <Link className="SeeMore" href={`/pilot-list`}>See More Pilots &gt;</Link>
                        </div>
                        {/* <!--PilotInfo--> */}
                    </div>
                </div>
            })
        }
        {/* <!--row PilotBox--> */}
    </div >)

}

export default FeaturePilot;