import React from 'react'
import styles from './MenuItemList.module.scss'

const MenuItemList = ({ items })=>{

    return(
        <div
            className={styles.container}
        >
            <ul>
                {items.map(item=>(
                    <li
                        onClick={item.onClick}
                        className={styles.item}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default MenuItemList
