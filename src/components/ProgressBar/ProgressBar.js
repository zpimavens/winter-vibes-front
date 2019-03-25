import React from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({progress})=>(

    <div className={styles.wrapper}>
    
    <div className={styles.progressBar}>
        <div style={{width: `${progress}%`}}></div>
    </div>
    
    </div>
)
export default ProgressBar;