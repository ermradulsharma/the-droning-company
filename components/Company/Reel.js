import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from './reel.module.css';

const Reel = ({ profileId }) => {

    const [pilotReel, setPilotReel] = useState([]);
    const [hasReelExist, setReelExist] = useState(false);


    useEffect(() => {
        fetch(`${SERVER_URL}/company-profile/reel/${profileId}`, {
            method: "GET",
        }, [profileId])
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    setPilotReel(response);
                    setReelExist(true)
                }
            });
    }, []);

    let main_url = '';
    let title = '';
    if (pilotReel.main &&  pilotReel.main.type === 'Youtube') {
        main_url = `https://www.youtube.com/embed/${pilotReel.main && pilotReel.main.video_key}`;
        title = "YouTube video player";
    } else {
        main_url = `https://player.vimeo.com/video/${pilotReel.main && pilotReel.main.video_key}`;
        title = "Vimeo video player"
    }
    return (
        hasReelExist ?
            <div className="DroneVideoArea text-left">
                <div className="container">
                    <div className="NormalHeading">Video Reel</div>
                    <Aux>
                        {
                            // pilotReel.main && pilotReel.main.type === 'Youtube'
                            // ?
                            <iframe
                                className={classes.borderZero}
                                height="700"
                                src={main_url}
                                title = {title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                webkitallowfullscreen 
                                mozallowfullscreen 
                            ></iframe>
                           /*  :
                            <iframe 
                                src={`https://player.vimeo.com/video/${pilotReel.main.video_key}`} 
                                width="{video_width}" 
                                height="600" 
                                frameBorder="0" 
                                title="{video_title}" 
                                webkitallowfullscreen 
                                mozallowfullscreen 
                                allowfullscreen
                            ></iframe> */
                        }
                        
                        <div className="row">
                            {
                                pilotReel.data && pilotReel.data.map((video, index) => {
                                    let videoUrl = '';
                                    let videoTitle = '';
                                    if (video.type === 'Youtube') {
                                        videoUrl = `https://www.youtube.com/embed/${video.video_key}`;
                                        videoTitle = "YouTube video player";
                                    } else {
                                        videoUrl = `https://player.vimeo.com/video/${video.video_key}`;
                                        videoTitle = "Vimeo video player";
                                    }
                                    return <div className="col-sm-4" key={'pilotreel-' + index}>
                                        <iframe
                                            className={classes.borderZero}
                                            height="315"
                                            src={videoUrl}
                                            title={videoTitle}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            webkitallowfullscreen 
                                            mozallowfullscreen 
                                        ></iframe>
                                    </div>
                                })
                            }
                        </div>
                    </Aux>                    
                </div>
            </div > 
        : 
        ''
    )
}

export default Reel;
