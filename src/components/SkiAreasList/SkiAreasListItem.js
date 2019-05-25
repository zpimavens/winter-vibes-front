import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { appUrls } from '../../urls'
import styles from './SkiAreasListItem.module.scss'

const SkiAreasListItem = ({ name, country, id, history })=>(
    <li
        className={styles.item}
        onClick={()=>history.push(appUrls.AREA+id)}
    >
    <ul>
        <li className={styles.areaName}>{name}</li>
        <li>{country}</li>
    </ul>
    </li>
)
SkiAreasListItem.propTypes={
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}
export default withRouter(SkiAreasListItem)
