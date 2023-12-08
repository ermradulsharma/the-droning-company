import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const GearReview = () => {

    const [gear, setGear] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_URL}/gear-reviews-all`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    setGear(response.data);
                }
            });
    }, []);
    return (
        <Aux>
            <div className="CheckOutYouTubeBlack paddngb text-center">
                <div className="MainHeading">
                    <h1>Gear Reviews</h1>
                </div>
                <div className="container">
                    <div className="row YouTubeBox YouTubeInn">
                        {
                            gear.map((video, index) => {                               
                                return <div className="col-sm-4" key={`youtube-${index}`}>
                                            <iframe className="irameclass" height="315" src={`https://www.youtube.com/embed/${video.video_key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            <div className="VideoTitle">{video.name}</div>
                                        </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </Aux >
    );
};

export default GearReview;