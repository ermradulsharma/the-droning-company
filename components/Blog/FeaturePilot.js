import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";

const FeaturePilot = () => {
    const [featurePilotData, setfeaturePilotData] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_URL}/pilot/feature`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    setfeaturePilotData(response.data);
                }
            });
    }, []);

    return (<div className="TdBox Td_recent_posts TdFeaturedPilots">
        <h4><span>Featured Pilots</span></h4>
        <div className="btImageTextWidgetWraper">
            <ul>
                {
                    featurePilotData.map((post, index) => {
                        return <li key={post.slug}>
                            <div className="TdImageTextWidget">
                                <div className="TdImageTextWidgetImage">
                                    <Link href={`/pilot/${post.slug}`}>
                                        <a href={`/pilot/${post.slug}`}>
                                            <img width="160" height="160" src={post.image} className="img-fluid" alt="pilot2" />
                                        </a>
                                    </Link>
                                </div>
                                <div className="TdImageTextWidgetText">
                                    <header className="Td_headline Td_superheadline">
                                        <h4 className="Td_headline_tag">
                                            <span className="Td_headline_superheadline"><Link href={`/pilot/${post.slug}`} title="{post.title}">{post.title}</Link></span>
                                            <span className="Td_headline_content">
                                                <span>
                                                    <Link href={`/pilot/${post.slug}`} title="{post.name}">{post.name}</Link>
                                                </span></span>
                                        </h4>
                                    </header>
                                    <ul className="PilotSkills">
                                        {
                                            post.skills.split(',').filter((value, index) => index < 5).map((exploaded_skill, index) => {
                                                return <li key={exploaded_skill+index} className="badge badge-warning">{exploaded_skill}</li>
                                            })
                                        }
                                    </ul>
                                    <small>
                                        <Link href={`/pilot/${post.slug}`}>See Profile</Link>
                                    </small>
                                </div>
                            </div>
                        </li>
                    })
                }

            </ul>
        </div>
    </div>)

}

export default FeaturePilot;