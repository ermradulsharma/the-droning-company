import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import Loader from "react-loader-spinner";
import parse from "html-react-parser";
import Image from 'next/image';

const ArticleByCategoryBlock = ({ category, limit, title = category, image = null, skip = 0, slug = null, cbody = 'show', column = null, }) => {
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
    <div className="card categoryArticle">
      <h4 className="card-header">
        <Link href={`/news/categories/${slug}`}>
          <a href={`/news/categories/${slug}`}>{title}</a>
        </Link>
      </h4>
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
          {(news !== undefined && news) ? (
            <>
              <Link href={`/news/categories/${slug}`}>
                <a href={`/news/categories/${slug}`}>
                  {/* <img className="img-fluid" src={image ? image : news.image} alt={news.title} /> */}
                  {(column == 3) ? '' : ''}
                  <Image
                    src={image ? image : news.image}
                    alt={news.title}
                    className="img-fluid"
                    onLoad={() => setLoadingImage(false)}
                    width={(column == 3) ? 367 : 280}
                    height={(column == 3) ? 230 : 180}
                    fill={true}
                    style={{ objectFit: "cover", width: "100%" }}
                    priority={true}
                    layout={"responsive"}
                  />
                </a>
              </Link>
              {(cbody == 'show') ? (
                <div className="card-body">
                  <h2>
                    <Link href={`/blog/${news.slug}`}>
                      <a href={`/blog/${news.slug}`}>
                        {news.title}
                      </a>
                    </Link>
                  </h2>
                </div>
              ) : ""}

            </>
          ) : (
            <>
              <Link href={`/news/categories/${slug}`}>
                <a href={`/news/categories/${slug}`}>
                  {/* <img className="img-fluid" src={image ? image : '/images/no-image.png'} alt={'news.title'} /> */}
                  <Image
                    src={image ? image : '/images/no-image.png'}
                    alt={'news.title'}
                    className="img-fluid"
                    onLoad={() => setLoadingImage(false)}
                    width={(column == 3) ? 367 : 280}
                    height={(column == 3) ? 230 : 180}
                    style={{ objectFit: "cover", width: "100%" }}
                    priority={true}
                    layout={"responsive"}
                  />
                </a>
              </Link>

              {(cbody == 'show') ? (
                <div className="card-body">
                  <h2>Sorry! <br></br>Article Not Found</h2>
                </div>
              ) : ""}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleByCategoryBlock;