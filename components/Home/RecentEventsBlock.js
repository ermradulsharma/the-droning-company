import React, { useState, useEffect } from "react";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Common/Loader";

const RecentEventsBlock = ({ limit = 3, skip = 0 }) => {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  useEffect(() => {
    try {
      fetch(`${SERVER_URL}/recent-events?limit=${limit}&skip=${skip}`, {
        method: "GET"
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((response) => {
          setLoadingEvents(false);
          if (response.statusCode === 200) {
            setEvents(response.data);
          }
        })
        .catch((error) => {
          setLoadingEvents(false);
          console.error("Error fetching recent events:", error);
        });
    } catch (error) {
      setLoadingEvents(false);
    }
  }, [limit, skip]);

  return (
    <div>
      {
        loadingEvents ? (
          <div className="text-center">
            <Loader
              type="ThreeDots"
              color="#ffcc0e"
              height={100}
              width={100}
              visible={loadingEvents}
            />
          </div>
        ) : (
          events && events.map((event, index) => {
            return (
              <div className="card event-item" key={`event-item-${index}`}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <Link href={`/event/${event.slug}`} legacyBehavior>
                        <a>
                          <Image className="img-fluid" src={event.image ? `${MEDIA_BASE_URL}/${getCleanImageUrl(event.image)}` : '/images/no-image.png'} alt={event.title} width={200} height={150} />
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-9">
                      <h4>{event.title}</h4>
                      <div className="event-date"><i className="fas fa-calendar"></i> {event.event_start} - {event.event_end}</div>
                      <div className="event-address"><i className="fas fa-map-marker-alt"></i> {event.location}</div>
                      <div className="event-button"><Link href={`/event/${event.slug}`} legacyBehavior><a className="btn btn-sm btn-warning">READ MORE</a></Link></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )
      }

    </div>
  );
}

export default RecentEventsBlock;