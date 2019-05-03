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
                    key={area.name}
                />
            )}
        </ul>
    </div>
)
export default SkiAreaList
