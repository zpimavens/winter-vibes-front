import React from 'react'
import { withRouter } from 'react-router-dom'
import { appUrls } from '../../urls'
import styles from './EventListItem.module.scss'
import { FiMoreVertical } from 'react-icons/fi'

const EventListItem = ({ name, startDate, endDate, members, _id, history }) => {

    const start = new Date(startDate)
    const end = new Date(endDate)
    return(
        <li
            className={styles.wrapper}
            onClick={()=>history.push(appUrls.EVENT+_id)}
        >
            <span><FiMoreVertical/></span>
            <p>{name}</p>
            <p>Początek: {start.getDate()}/{start.getMonth()+1}/{start.getFullYear()}</p>
            <p>Koniec: {end.getDate()}/{end.getMonth()+1}/{end.getFullYear()}</p>
            <p>{members.length} uczestników </p>
        </li>
    )
}
export default withRouter(EventListItem)
