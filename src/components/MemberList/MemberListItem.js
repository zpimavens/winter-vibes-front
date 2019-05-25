import React from 'react'
import PropTypes from 'prop-types'
import styles from './MemberListItem.module.scss'

const MemberListItem = ({ name, image, onClick })=>{

    return(
        <li
            className={styles.wrapper}
            onClick={onClick}
        >
            <img 
                src={image} 
                alt={name} 
                className={styles.image}
                
            />
            <p
                className={styles.name}
            >
                {name}
            </p>
        </li>
    )
}
MemberListItem.propTypes={
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}
export default MemberListItem
