import React, { useState, useEffect } from "react";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Common/Loader";
import parse from "html-react-parser";

const FourNewsBlock = ({ category, limit }) => {
  const [news, setNews] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [limitNumber, setLimitNumber] = useState(5);
  const [limitLabel, setLimitLabel] = useState("Show more");

  useEffect(() => {
    try {
      fetch(`${SERVER_URL}/get-blogs-by-category?category=${category}&limit=${limit}`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setLoadingNews(false);
          if (response.statusCode === 200) {
            setNews(response.data);
          }
        });
    } catch (error) {
      setLoadingNews(false);
    }
  }, [category, limit]);

  return (
    <div className="MainArticles paddngt40 fourArticleBox">
      <div className="container">
        <div className="row">
          {loadingNews ? (
            <div
              className="col-sm-12 text-center justify-content-between"
              style={{ textAlign: "center" }}
            >
              <Loader
                type="ThreeDots"
                color="#ffcc0e"
                height={100}
                width={100}
                visible={loadingNews}
              />
            </div>
          ) : (
            news &&
            news.map((blog_new, index) => {
              return (
                <div className="col-sm-6" key={`blog-new-${index}`}>
                  <div className="ArticleInn">
                    <div className="row">
                      {blog_new.image ? (
                        <div className="col-4 col-sm-4">
                          <Image
                            className="img-fluid"
                            src={`${MEDIA_BASE_URL}/${getCleanImageUrl(blog_new.image)}`}
                            alt="03imgarticle"
                            width={200}
                            height={150}
                          />
                        </div>
                      ) : null}

                      <div
                        className={`${blog_new.image ? "col-8 col-sm-8 align-self-center" : "col-12 col-sm-12"
                          }`}
                      >
                        <div className="ArticleDesc">
                          <div className="ArticleDescH">{blog_new.title}</div>
                          {blog_new.excerpt ? (
                            <p>{parse(blog_new.excerpt)}</p>
                          ) : null}
                          <Link href={`/blog/${blog_new.slug}`} legacyBehavior>
                            <a
                              href={`/blog/${blog_new.slug}`}
                              className="SeeMore"
                            >
                              Read More{" "}
                              <i className="fas fa-long-arrow-alt-right"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FourNewsBlock;
