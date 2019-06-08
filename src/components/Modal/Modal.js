import React from 'react'
import styles from './Modal.module.scss'

const Modal = ({render : Render, closeModalFn, ...props})=>(

    <div
        className={styles.wrapper}
    >
        <div
            className={styles.closeButton}
            onClick={closeModalFn}
        ></div>
        <Render {...props} closeModalFn={closeModalFn}/>
    </div>
)


export default Modal
