import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SERVER_URL } from "../../util/Constants";

const Calendar = () => {
    const router = useRouter();
    const start = new Date();
    const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
    const [events, setEvents] = useState([]);
    // const SERVER_URL = "http://127.0.0.1:8000/api/v1";
    var background_colors = Array('green', 'red', 'blue', 'pink', 'orange', 'purple');
    const allEvents: any[] = [];
    useEffect(() => {
        fetch(`${SERVER_URL}/recent-events?past=true`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.statusCode === 200) {
                    response.data.length > 0 && response.data.map((item, index) => (
                        //console.log(`ITEM: ${JSON.stringify(item)}`),
                        allEvents.push({
                            title: `${item.title}`,
                            start: new Date(`${item.event_start_cal}`),
                            end: new Date(`${item.event_end_cal}`),
                            //end: new Date(new Date(`${item.created_at}`).setHours(8)),
                            backgroundColor: (item.is_past === true) ? '#ea4335' : '#34a853', // background_colors[Math.floor(Math.random() * background_colors.length)],
                            extendedProps: { id: `${item.id}`, slug: `${item.slug}` },
                        })
                    ));
                    setEvents(allEvents);
                }
            });
    }, []);

    const toTimestamp = (strDate) => {
        const dt = Date.parse(strDate);
        return dt / 1000;
    }

    const calendarRef = useRef(null);
    return (
        <div>
            <FullCalendar
                nowIndicator={true}
                eventClick={
                    (info: any) => {
                        //console.log(info.event.extendedProps, info.event.title);
                        router.push('/event/' + info.event.extendedProps.slug);
                    }
                }
                /*eventContent={
                    (info: any) => {
                        return (
                            <>
                                <b>{info.timeText}</b>
                                <i>{info.event.title}</i>
                            </>
                        )
                    }
                }*/
                editable={false}
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                selectMirror={true}
                events={events}
                dayMaxEvents={true}
                dayMaxEventRows={0}
                titleFormat={{ year: "numeric", month: "long" }}
                allDaySlot={false}
                buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                    list: "List",
                }}
                headerToolbar={{
                    left: "dayGridMonth,timeGridWeek,timeGridDay",
                    center: "title",
                    right: "today,prev,next",
                }}
            />
        </div>
    );
};
export default Calendar;