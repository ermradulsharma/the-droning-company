import React, { useState, useEffect } from "react";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import parse from 'html-react-parser';
import { getCleanImageUrl } from "../../util/utils";
import Image from 'next/image';

const FeaturePilotVideo = () => {
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
                                <h2>Featured Pilot&apos;s Video</h2>
                                <h3>{pilot.name}</h3>
                            </div>
                            <div className={`HomeBlockImg`}>
                                <a href={`${pilot.pilot_video}`} target="_blank" rel="noreferrer">
                                    <Image
                                        src={`/images/youtube-icon.png`}
                                        alt="View Video"
                                        className="img-fluid"
                                        onLoad={() => setLoadingImage(false)}
                                        width={120}
                                        height={120}
                                        priority={true}
                                    />
                                </a>
                            </div>
                            <p>{pilot.title}</p>
                            <a href={`${pilot.pilot_video}`} target="_blank" rel="noreferrer" className="btn BtnLearn">
                                View Video
                            </a>
                        </div>
                    </div>
                })
            }
        </>
    )

}

export default FeaturePilotVideo;