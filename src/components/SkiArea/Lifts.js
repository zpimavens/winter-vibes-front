import React from 'react'
import styles from './Lifts.module.scss'
import dragLiftIcon from '../../assets/svg/001-ski.svg'
import chairLiftIcon from '../../assets/svg/003-snowboard.svg'
import gondolaIcon from '../../assets/svg/002-overhead.svg'

const Lifts = ({ dragLift, chairLift, gondolas }) => (
    
    <div className={styles.container}>

        <div
            title='Orczyki'
        >
            <img 
                src={dragLiftIcon} 
                alt="DragLift icon"
            />
            {dragLift}
        </div>
        <div
            title='Krzesełka'
        >
            <img 
                src={chairLiftIcon} 
                alt="Chair icon"
            />
            {chairLift}
        </div>
        <div
            title='Gondole'
        >
            <img 
                src={gondolaIcon} 
                alt="Chair icon"
            />
            {gondolas}
        </div>
    </div>
)

export default Lifts
