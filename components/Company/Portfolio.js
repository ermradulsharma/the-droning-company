import React, { useState, useEffect } from "react";
import { SERVER_URL, MEDIA_BASE_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
import Image from "next/image";
import classes from './reel.module.css';

const Portfolio = ({ profileId }) => {
    const [companyPortfolio, setCompanyPortfolio] = useState([]);
    const [hasPortfolioExist, setPortfolioExist] = useState(false);
    useEffect(() => {
        fetch(`${SERVER_URL}/company-profile/portfolio-new/${profileId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    setCompanyPortfolio(response.data);
                    setPortfolioExist(true);
                }
            });
    }, [profileId]);

    return (
        hasPortfolioExist ?
            <div className="PhotoPortfolio paddngb">
                <div className="container">
                    <div className="NormalHeading">Photo Portfolio</div>
                </div>

                <div id="companyPortfolio" className="carousel2 slide" data-ride="carousel2">
                    {/* <!-- The slideshow --> */}
                    <div className="container carousel-inner ">
                        {
                            companyPortfolio.map((galleryOuterWarp, index) => {
                                return <div key={'galleryOuterWarpIndex-' + index} className={'carousel-item2 ' + (index == 0 ? 'active' : '')}>
                                    {
                                        galleryOuterWarp.map((photo, index) => {
                                            return <div className="col-sm-4 col-md-4" key={'galleryInnerWarpIndex-' + index}>
                                                <Image className="img-fluid" src={`${MEDIA_BASE_URL}/${getCleanImageUrl(photo.image)}`} alt="photo" width={400} height={300} />
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                    {/* <!-- Left and right controls --> */}
                    <a className="carousel-control-prev d-none" href="#companyPortfolio" data-slide="prev" data-bs-target="#companyPortfolio">
                        <Image
                            className="img-fluid"
                            src={`/images/arrow-left.png`}
                            alt="arrow"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a className="carousel-control-next d-none" href="#companyPortfolio" data-slide="next" data-bs-target="#companyPortfolio">
                        <Image
                            className="img-fluid"
                            src={`/images/arrow-right.png`}
                            alt="arrow"
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
            </div> : '')

}

export default Portfolio;
