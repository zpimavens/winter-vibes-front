import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './SkiAreasListItem.module.scss'

const SkiAreasListItem = ({ name, country, history, id })=>(
    <li
        className={styles.item}
        onClick={()=>history.push('/area/'+id)}
    >
    <ul>
        <li className={styles.areaName}>{name}</li>
        <li>{country}</li>
    </ul>
    </li>
)
export default withRouter(SkiAreasListItem)
