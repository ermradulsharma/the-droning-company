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
        fetch(`${SERVER_URL}/home/company-feature`, {
            method: "GET",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((response) => {
                if (response.statusCode === 200) {
                    sethomefeaturePilotData(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching featured company:", error);
            });
    }, []);
    return (
        <>
            {
                homefeaturePilotData.map((company, index) => {
                    return <div key={'homeFeatureCompany-' + index} className="col-item company" style={{ backgroundImage: "url(/images/imgDrone.jpg)" }}>
                        <div className="BandBox">
                            <div className="BandBoxhead">
                                <h2>Featured Company Profile</h2>
                                <h3>{company.name}</h3>
                            </div>
                            <div className={`HomeBlockImg`}>
                                {/* <img className="img-fluid" src={company.image} alt={company.name} /> */}
                                <Image
                                    src={`${MEDIA_BASE_URL}/${getCleanImageUrl(company.image)}`}
                                    alt={company.name}
                                    className="img-fluid"
                                    onLoad={() => setLoadingImage(false)}
                                    width={120}
                                    height={120}
                                    priority={true}
                                />
                            </div>
                            <p>{company.title}</p>
                            <Link href={`/company/${company.slug}`} legacyBehavior>
                                <a className="btn BtnLearn">See Profile</a>
                            </Link>
                        </div>
                    </div>
                })
            }
        </>
    )

}

export default FeaturePilot;