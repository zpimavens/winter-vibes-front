import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../context'
import styles from './MemberListItem.module.scss'
import { IoMdTrash } from 'react-icons/io'

const MemberListItem = ({ name, image, onClick, owner })=>{

    const context = useContext(AppContext)
    return(
        <li
            className={styles.wrapper}
        >
            <img 
                src={image} 
                alt={name} 
                className={styles.image}
                onClick={onClick}
            />
            <p
                className={owner===name ? styles.nameOwner : styles.name}
                onClick={onClick}
            >
                {name}
            </p>
            {context.isOwner &&
                (owner===name ? null : 
                    <span 
                        className={styles.moreIcon}
                        onClick={()=>context.deleteMember(name)}
                    >
                        <IoMdTrash/>
                    </span>)
            }
        </li>
    )
}
MemberListItem.propTypes={
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}
export default MemberListItem
