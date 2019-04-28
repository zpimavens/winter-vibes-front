import React from 'react';
import styles from './SkiAreasListItem.module.scss';

const SkiAreasListItem = ({name})=>(
    <li
        className={styles.item}
        onClick={()=>{console.log(name)}}
    >
    {name}
    </li>
)
export default SkiAreasListItem;