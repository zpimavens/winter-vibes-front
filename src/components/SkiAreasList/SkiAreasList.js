import React from 'react'
import SkiAreasListItem from './SkiAreasListItem'
import styles from './SkiAreasList.module.scss'

const SkiAreaList = ({areas, ...props})=>(
//change teh key
    <div>
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
    </div>
)
export default SkiAreaList
