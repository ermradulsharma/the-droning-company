import Aux from "../../hoc/Auxiliary/Auxiliary";
import React, { useState, useEffect } from "react";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import { getCleanImageUrl, getImageSrc } from "../../util/utils";
import Link from "next/link";
import Image from "next/image";
const TrendingNews = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_URL}/home/featured-blog`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    setNews(response.data);
                }
            })
            .catch(() => console.warn("API Fetch Error (backend offline)"));
    }, []);

    return (
        <Aux>
            <div className="BestArticles paddngtb">
                <div className="MainHeading">
                    <h1>Trending News</h1>
                </div>
                {
                    news.map((blogPost, index) => {
                        return (
                            <div className="BestarticleBox form-group" key={blogPost.id}>
                                <div className="row">
                                    {
                                        blogPost.image
                                            ?
                                            <div className="col-4 col-sm-4">
                                                <Link href={`/blog/${blogPost.slug}`} className="SeeMore">

                                                    <Image className="img-fluid" src={getImageSrc(blogPost.image)} alt="03imgarticle" width={200} height={150} />

                                                </Link>
                                            </div>
                                            :
                                            null
                                    }

                                    <div className={`${blogPost.image ? 'col-8 col-sm-8' : 'col-12 col-sm-12'} `}>
                                        <div className="ArticleDesc">
                                            <div className="ArticleDescH">{blogPost.title}</div>
                                            <p>{blogPost.excerpt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </Aux >
    );
};

export default TrendingNews;