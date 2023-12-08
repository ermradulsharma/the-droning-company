import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import Loader from "react-loader-spinner";

const RecentEventsBlock = ({ limit = 3, skip = 0 }) => {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  useEffect(() => {
    try {
      console.log("LIMIT: " + limit);
      fetch(`${SERVER_URL}/recent-events?limit=${limit}&skip=${skip}`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((response) => {
          setLoadingEvents(false);
          if (response.statusCode === 200) {
            setEvents(response.data);
          }
        });
    } catch (error) {
      setLoadingEvents(false);
    }
  }, []);

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
                      <Link href={`/event/${event.slug}`}>
                        <a href={`/event/${event.slug}`}>
                          <img className="img-fluid" src={event.image ? event.image : '/images/no-image.png'} alt={event.title} />
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-9">
                      <h4>{event.title}</h4>
                      <div className="event-date"><i className="fas fa-calendar"></i> {event.event_start} - {event.event_end}</div>
                      <div className="event-address"><i className="fas fa-map-marker-alt"></i> {event.location}</div>
                      <div className="event-button"><a className="btn btn-sm btn-warning" href={`/event/${event.slug}`}>READ MORE</a></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )
      }

      <div><a className="btn BtnSearch w-100" href="/events">Show All Events</a></div>

    </div>
  );
}

export default RecentEventsBlock;