import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import parse from 'html-react-parser';
import Image from 'next/image';

const FeaturePilot = () => {
    const [homefeaturePilotData, sethomefeaturePilotData] = useState([]);
    const [loadingImage, setLoadingImage] = useState(true);
    useEffect(() => {
        fetch(`${SERVER_URL}/home/company-feature`, {
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
                                    src={company.image}
                                    alt={company.name}
                                    className="img-fluid"
                                    onLoad={() => setLoadingImage(false)}
                                    width={120}
                                    height={120}
                                    priority={true}
                                />
                            </div>
                            <p>{company.title}</p>
                            <Link href={`/company/${company.slug}`}>
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