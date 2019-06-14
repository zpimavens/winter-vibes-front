import React from 'react'
import PropTypes from 'prop-types'
import EventListItem from './EventListItem'
import styles from './EventList.module.scss'

const EventList = ({ events }) =>{
// console.log(events)
    return(
        <div
            className={styles.container}
        >
            {!!events && events.length ? 
            <ul>
                {events.map(event=>(
                    <EventListItem
                        key={event._id}
                        {...event}
                    />
                ))}
            </ul>
            :
            <p>Brak wydarzeń</p>}
        </div>
    )
}
EventList.propTypes={
    events: PropTypes.array,
}
export default EventList
