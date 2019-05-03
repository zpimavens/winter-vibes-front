import React from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressBar.module.scss'

const ProgressBar = ({progress})=>(
    <div className={styles.wrapper}>
        <div className={styles.progressBar}>
            <div style={{width: `${progress*10}%`}}></div>
        </div>
    </div>
)
ProgressBar.propTypes={
    progress: PropTypes.number,
}
export default ProgressBar
