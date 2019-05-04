import React from 'react'
import styles from './Lifts.module.scss'
import dragliftIcon from '../../assets/svg/001-ski.svg'
import chairliftIcon from '../../assets/svg/003-snowboard.svg'
import gondolaIcon from '../../assets/svg/002-overhead.svg'

const Lifts = ({ draglift, chairlift, gondolas }) => (
    
    <div className={styles.container}>

        <div>
        <img 
            src={dragliftIcon} 
            alt="Draglift icon"
        />
            {draglift}
        </div>
        <div>
        <img 
            src={chairliftIcon} 
            alt="Chair icon"
        />
            {chairlift}
        </div>
        <div>
        <img 
            src={gondolaIcon} 
            alt="Chair icon"
        />
            {gondolas}
        </div>
    </div>
);

export default Lifts
