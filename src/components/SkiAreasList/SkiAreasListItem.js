import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './SkiAreasListItem.module.scss'

const SkiAreasListItem = ({ name, history })=>(
    <li
        className={styles.item}
        onClick={()=>history.push('/area')}
    >
    {name}
    </li>
)
export default withRouter(SkiAreasListItem)
