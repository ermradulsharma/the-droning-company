import Aux from "../../hoc/Auxiliary/Auxiliary";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
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
            });
    }, []);

    return (
        <Aux>
            <div className="BestArticles paddngtb">
                <div className="MainHeading">
                    <h1>Trending News</h1>
                </div>
                {
                    news.map((blogPost, index) => {
                        return <div className="BestarticleBox form-group" key={blogPost.id}>
                            <div className="row">
                                {
                                    blogPost.image
                                        ?
                                        <div className="col-4 col-sm-4">
                                            <Link href={`/blog/${blogPost.slug}`} legacyBehavior>
                                                <a href={`/blog/${blogPost.slug}`} className="SeeMore">
                                                    <Image className="img-fluid" src={blogPost.image} alt="03imgarticle" width={200} height={150} />
                                                </a>
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
                    })
                }
            </div>
        </Aux >
    );
};

export default TrendingNews;