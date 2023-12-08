import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import Loader from "react-loader-spinner";
import parse from "html-react-parser";
import Image from 'next/image';

const VideoReelOfWeek = ({ category, limit, title = category, image = null, skip = 0, slug = null, cbody = 'show' }) => {
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [loadingImage, setLoadingImage] = useState(true);
    useEffect(() => {
        try {
            fetch(`${SERVER_URL}/get-blogs-by-category?category=${category}&limit=${limit}&skip=${skip}`, {
                method: "GET"
            })
                .then((res) => res.json())
                .then((response) => {
                    setLoadingNews(false);
                    if (response.statusCode === 200) {
                        setNews(...response.data);
                    }
                });
        } catch (error) {
            setLoadingNews(false);
        }
    }, []);

    return (
        <>
            {loadingNews ? (
                <Loader
                    type="ThreeDots"
                    color="#ffcc0e"
                    height={100}
                    width={100}
                    visible={loadingNews}
                />
            ) : (
                <>
                    {(news !== undefined && news !== null) ? (
                        <div className="col-item" style={{ backgroundImage: "url(" + news.image + ")" }}>
                            <div className="BandBox">
                                <div className="BandBoxhead">
                                    <h2>{title}</h2>
                                    <h3>{news.title}</h3>
                                </div>
                                <div className={`HomeBlockImg`}>
                                    {/* <img className="img-fluid" src={image ? image : news.image} onLoad={() => setLoadingImage(false)} alt="Video Reel of the Week" /> */}
                                    <Image
                                        src={image ? image : news.image}
                                        alt="Video Reel of the Week"
                                        className="img-fluid"
                                        onLoad={() => setLoadingImage(false)}
                                        width={120}
                                        height={120}
                                        priority={true}
                                    />
                                </div>
                                <p>{news.excerpt}</p>
                                <Link href={`/blog/${news.slug}`}>
                                    <a className="btn BtnLearn">READ MORE</a>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="col-item" style={{ backgroundImage: "url(" + image ? image : '/images/no-image.png' + ")" }}>
                            <div className="BandBox">
                                <div className="BandBoxhead">
                                    <h2>{title}</h2>
                                    <h3>Article Not Found!</h3>
                                </div>
                                <div className={`HomeBlockImg`}>
                                    {/* <img className="img-fluid" src={image ? image : '/images/no-image.png'} onLoad={() => setLoadingImage(false)} alt="Video Reel of the Week" /> */}
                                    <Image
                                        src={image ? image : '/images/no-image.png'}
                                        onLoad={() => setLoadingImage(false)}
                                        alt="Video Reel of the Week"
                                        className="img-fluid"
                                        width={120}
                                        height={120}
                                        priority={true}
                                    />
                                </div>
                                <p>{news.excerpt}</p>
                                <Link href={`/news/categories/${slug}`}>
                                    <a className="btn BtnLearn">READ MORE</a>
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default VideoReelOfWeek;