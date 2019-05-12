import React from 'react'
import PropTypes from 'prop-types'
import styles from './GroupItem.module.scss'

const GroupItem = ({ name, members, events }) =>(
    <ul 
        className={styles.wrapper}
        onClick={()=>console.log(name)}
    >
        <li className={styles.name}>
            {name}
        </li>
        <li>
            Członkowie grupy: {members.length}
        </li>
        <li>
            Aktywne wydarzenia: {events.length}
        </li>
    </ul>
)

GroupItem.propTypes={
    name: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired
}
export default GroupItem