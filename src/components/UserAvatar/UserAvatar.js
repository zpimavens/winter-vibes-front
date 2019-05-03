import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({ image, username }) => {    
    return (
        <div className={styles.wrapper}>
            <img
                src={image}
                className={styles.image}
                alt={username}
            />
            <h4 className={styles.name}>{username}</h4>
        </div>
    )
}
UserAvatar.propTypes={
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

export default UserAvatar
