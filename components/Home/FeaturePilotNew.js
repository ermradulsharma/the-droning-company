import React, { useState, useEffect } from "react";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import parse from 'html-react-parser';
import { getCleanImageUrl } from "../../util/utils";
import Image from 'next/image';

const FeaturePilot = () => {
    const [homefeaturePilotData, sethomefeaturePilotData] = useState([]);
    const [loadingImage, setLoadingImage] = useState(true);
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
    return (
        <>
            {
                homefeaturePilotData.map((pilot, index) => {
                    return <div key={'homeFeaturePilot-' + index} className="col-item" style={{ backgroundImage: "url(" + `${MEDIA_BASE_URL}/${getCleanImageUrl(pilot.image)}` + ")" }}>
                        <div className="BandBox">
                            <div className="BandBoxhead">
                                <h2>Featured Pilot of the Week</h2>
                                <h3>{pilot.name}</h3>
                            </div>
                            <div className={`HomeBlockImg`}>
                                {/* <img className="img-fluid" src={pilot.image} alt={pilot.name} /> */}
                                <Image
                                    src={`${MEDIA_BASE_URL}/${getCleanImageUrl(pilot.image)}`}
                                    alt={pilot.name}
                                    className="img-fluid"
                                    onLoad={() => setLoadingImage(false)}
                                    width={120}
                                    height={120}
                                    priority={true}
                                />
                            </div>
                            <p>{pilot.title}</p>
                            <Link href={`/pilot/${pilot.slug}`} legacyBehavior>
                                <a className="btn BtnLearn">See Profile</a>
                            </Link>
                            {/* <Link className="SeeMore" href={`/pilot-list`}>See More Pilots &gt;</Link> */}
                        </div>
                    </div>
                })
            }
        </>
    )

}

export default FeaturePilot;