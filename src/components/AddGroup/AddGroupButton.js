import React from 'react'
import styles from './AddGroupButton.module.scss'

const AddGroupButton = ({ ...props }) => {

    return(
        <button
            className={styles.wrapper}
            {...props}
        >
            NOWA GRUPA
        </button>
    )
}
export default AddGroupButton