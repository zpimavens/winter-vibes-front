import React from 'react'
import styles from './MenuItemList.module.scss'

const MenuItemList = ({ items, onClick })=>{

    return(
        <div
            className={styles.container}
            onClick={onClick}
        >
            <ul>
                {items.map(item=>(
                    <li
                        onClick={item.onClick}
                        className={styles.item}
                        key={item.name}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default MenuItemList
