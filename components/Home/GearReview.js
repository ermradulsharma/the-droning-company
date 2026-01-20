import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Loader from "@/components/Common/Loader";

const GearReview = () => {
    const [gearReviewData, setgearReviewData] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        try {
            fetch(`${SERVER_URL}/gear-reviews`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((response) => {
                //console.log(response);
                setLoadingReviews(false);
                if (response.statusCode === 200) {
                    setgearReviewData(response.data);
                }
            });
        } catch (error) {
            console.log(error);
            setLoadingReviews(false);
        }
        
    }, []);

    return (<div className="CheckOutYouTube paddngtb text-center">
        <div className="container">
            <div className="MainHeading">
                <h1>Gear Reviews</h1>
            </div>
            <div className="row YouTubeInn">
                {
                    loadingReviews
                    ?
                    <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                        <Loader
                            type="ThreeDots"
                            color="#ffcc0e"
                            height={100}
                            width={100}
                            visible={loadingReviews}
                        />
                    </div>
                    :
                    gearReviewData.map((video, index) => {

                        return <div className="col-sm-4" key={'gearReviewIndex-' + index}>
                            <iframe
                                style={{ border: 0 }}
                                height="315"
                                src={'https://www.youtube.com/embed/' + (video.video_key)}
                                title={video.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="VideoTitle">{video.name}</div>
                        </div>

                    })
                }
            </div>
        </div>
    </div >
    )

}

export default GearReview;