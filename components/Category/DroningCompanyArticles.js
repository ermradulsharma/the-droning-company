import Aux from "../../hoc/Auxiliary/Auxiliary";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
const DroningCompanyArticles = ({ title, category }) => {

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
            <div className="BestArticles">
                <div className="MainHeading">
                    <h1>{title ? (title) : ("Droning Company Articles")}</h1>
                    <hr></hr>
                </div>
                {
                    news.map((blogPost, index) => {
                        return <div className="BestarticleBox form-group" key={blogPost.id}>
                            <div className="row">
                                {
                                    blogPost.image
                                    ?
                                    <div className="col-2 col-sm-2">
                                    <Link href={`/blog/${blogPost.slug}`}>
                                        <a href={`/blog/${blogPost.slug}`} className="SeeMore">
                                            <img className="img-fluid" src={blogPost.image} alt={blogPost.title} />
                                        </a>
                                    </Link>
                                    </div>
                                    :
                                    null
                                }
                                
                                <div className={`${blogPost.image ? 'col-10 col-sm-10' : 'col-12 col-sm-12'} `}>
                                    <div className="ArticleDesc">
                                        <div className="ArticleDescH">{blogPost.title}</div>
                                        <p>{blogPost.excerpt}</p>
                                        <Link href={`/blog/${blogPost.slug}`}>
                                            <a href={`/blog/${blogPost.slug}`} className="BtnSearch" style={{padding:"4px 15px", borderRadius: "4px", height:"auto"}}>Read More</a>
                                        </Link>
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

export default DroningCompanyArticles;