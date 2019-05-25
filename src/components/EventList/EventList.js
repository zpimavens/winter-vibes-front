import React from 'react'
import PropTypes from 'prop-types'
import EventListItem from './EventListItem'
import styles from './EventList.module.scss'

const EventList = ({ events, type }) =>{

    return(
        <div
            className={styles.container}
        >
            <h5>{type==='current' ? 'Nadchodzące wydarzenia:' : 'Przeszłe wydarzenia'}</h5>
            {events.length ? 
            <ul>
                {events.map(event=>(
                    <EventListItem
                        key={event.id}
                        {...event}
                        type={type}
                    />
                ))}
            </ul>
            :
            <p>nie ok </p>}
        </div>
    )
}
EventList.propTypes={
    events: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
}
export default EventList
