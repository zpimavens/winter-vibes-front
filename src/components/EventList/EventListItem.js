import React from 'react'
import styles from './EventListItem.module.scss'
import { FiMoreVertical } from 'react-icons/fi'

const EventListItem = ({ name, date, participants, type }) => {

    return(
        <li
            className={styles.wrapper}
        >
            <span><FiMoreVertical/></span>
            <p>{name}</p>
            <p>{date}</p>
            <p>{participants.length} osób {type==='past' ? 'wzięło' : 'weźmie'} udział</p>
        </li>
    )
}
export default EventListItem
