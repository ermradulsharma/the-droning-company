import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import Loader from "react-loader-spinner";
import parse from 'html-react-parser';

const NewSection = () => {

    const [news, setNews] = useState([]);
    const [loadingImage, setLoadingImage] = useState(true);
    const [loadingNews, setLoadingNews] = useState(true);
    const [limitNumber, setLimitNumber] = useState(5);
    const [limitLabel, setLimitLabel] = useState('Show more');

    useEffect(() => {
        try {
            fetch(`${SERVER_URL}/home/blog`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((response) => {
                    //console.log(response);
                    setLoadingNews(false);
                    if (response.statusCode === 200) {
                        setNews(response.data);
                    }
                });
        } catch (error) {
            setLoadingNews(false);
        }
    }, []);
    const changeLimitLabel = (limit, total) => {
        if (limit === 5) {
            setLimitLabel('Show less');
            setLimitNumber(total);
        } else {
            setLimitLabel('Show more');
            setLimitNumber(5);
        }
    }

    const listJobLocations = (location) => {
        return location.map((data, index) => {
            if (index < limitNumber)
                return <li>{data.city}{data.state ? ', ' + data.state : ''}</li>
        })

    }

    return (

        <div className="col-item" style={{ backgroundImage: "url(" + news.category_4_image + ")" }}>
            <div className="BandBox">
                <div className="BandBoxhead">
                    <h2>{news.category_4}</h2>
                    <h3>{news.category_4_title}</h3>
                </div>
                <div className={`HomeBlockImg`}>
                    <img className="img-fluid" src={news.category_4_image} onLoad={() => setLoadingImage(false)} alt="Video Reel of the Week" />
                </div>
                <p>{news.category_4_short_descrption}</p>
                <Link href={`/blog/${news.category_4_title_slug}`}>
                    <a className="btn BtnLearn">READ MORE</a>
                </Link>
            </div>
        </div>



    );
};

export default NewSection;