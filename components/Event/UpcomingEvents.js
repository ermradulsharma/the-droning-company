import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";

const UpcomingEvents = ({ limit = 3, skip = 0 }) => {
  const [recentBlogPostData, setRecentBlogPostData] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/recent-events?limit=${limit}&skip=${skip}`, {
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

  return (
    <div className="TdBox Td_recent_posts">
      <h4>
        <span>Upcoming Events</span>
      </h4>
      <div className="btImageTextWidgetWraper">
        <ul>

          {recentBlogPostData.map((event, index) => {
            return (
              <li key={event.slug}>
                <div className="TdImageTextWidget">
                  {event.image ? (
                    <div className="TdImageTextWidgetImage">
                      <Link href={`/event/${event.slug}`}>
                        <a href={`/event/${event.slug}`}>
                          <img
                            width="160"
                            height="160"
                            src={event.image}
                            className="img-fluid"
                            alt={event.title}
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
                              href={`/event/${event.slug}`}
                              title={event.title}
                            >
                              {event.title}
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

export default UpcomingEvents;
