import React, { useContext } from 'react'
import AppContext from '../../context';
import styles from './GroupListItem.module.scss'
import { FaLock, FaLockOpen } from 'react-icons/fa'

const GroupListItem = ({ name, description, owner, isPrivate, onClick,  otherMembers })=>{
    const context = useContext(AppContext)
    const isMember = otherMembers.filter(el=>el===context.user.username).length
    
    return(
        <li
            className={styles.wrapper}
            onClick={onClick}
        >
            <h4>{name} <span > {isPrivate ? <FaLock /> : <FaLockOpen />}</span></h4>
            <p className={styles.italic}>{description}</p>
            <p>{context.user.username===owner ? "Właściciel" 
            : 
            (
                isMember ? "Członek" : null)}</p>
        </li>
    )
}
export default GroupListItem