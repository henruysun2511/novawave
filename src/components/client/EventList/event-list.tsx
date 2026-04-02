import EventCard from "./event-card";


export default function EventList() {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <EventCard />
                <EventCard />
                <EventCard />
            </div>
        </>
    );
}