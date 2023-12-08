import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";

const BlogRecent = ({ layout }) => {
  const [recentBlogPostData, setRecentBlogPostData] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/recentblogpost`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.statusCode === 200) {
          setRecentBlogPostData(response.data);
        }
      });
  }, []);

  // if layout= footnote dont show fabel footnote titile ,

  const check_layout = (blog) => {
    return blog?.slug?.toLowerCase() === "fravel-s-footnote" &&
      layout === "footnote"
      ? "d-none"
      : "";
  };

  return (
    <div className="TdBox Td_recent_posts">
      <h4>
        <span>Recent Posts</span>
      </h4>
      <div className="btImageTextWidgetWraper">
        <ul>
          {layout === "footnote" ? <ShowKeeperCornerTitle /> : null}
          {recentBlogPostData.map((post, index) => {
            return (
              <li key={post.slug} className={check_layout(post)}>
                <div className="TdImageTextWidget">
                  {post.image ? (
                    <div className="TdImageTextWidgetImage">
                      <Link href={`/blog/${post.slug}`}>
                        <a href={`/blog/${post.slug}`}>
                          <img
                            width="160"
                            height="160"
                            src={post.image}
                            className="img-fluid"
                            alt={post.title}
                          />
                        </a>
                      </Link>
                    </div>
                  ) : null}
                  <div className="TdImageTextWidgetText">
                    <header className="Td_headline Td_superheadline">
                      <h4 className="Td_headline_tag">
                        <span className="Td_headline_content">
                          <span>
                            <Link
                              href={`/blog/${post.slug}`}
                              title={post.title}
                            >
                              {post.title}
                            </Link>
                          </span>
                        </span>
                      </h4>
                    </header>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const ShowKeeperCornerTitle = () => {
  return (
    <li>
      <div className="TdImageTextWidget">
        <div className="TdImageTextWidgetText">
          <header className="Td_headline Td_superheadline">
            <h4 className="Td_headline_tag">
              <span className="Td_headline_content">
                <span>
                  <Link
                    href={"/blog/keeper-s-corner-002"}
                    title={"keeper-s-corner-002"}
                  >
                   Keeper's Corner Posts
                  </Link>
                </span>
              </span>
            </h4>
          </header>
        </div>
      </div>
    </li>
  );
};

export default BlogRecent;
