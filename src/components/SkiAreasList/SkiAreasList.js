import React from 'react'
import PropTypes from 'prop-types'
import SkiAreasListItem from './SkiAreasListItem'
import styles from './SkiAreasList.module.scss'

const SkiAreaList = ({areas, ...props})=>(

    areas.length ? 
    <ul className={styles.wrapper}>
        {areas.map(area=>
            <SkiAreasListItem
                name={area.name}
                key={area._id}
                id={area._id}
                country={area.country}
            />
        )}
    </ul>
    :
    null
)
SkiAreaList.propTypes={
    areas: PropTypes.array
}
export default SkiAreaList
