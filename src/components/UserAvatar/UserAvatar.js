import React from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../context'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({ image, username}) => {    
    return (
        <AppContext.Consumer>
            {(context) => (
                <div className={styles.wrapper}>
                    <img
                        src={image}
                        className={styles.image}
                        alt={username}
                        onClick={() => context.history.push({ pathname: `/user/${username}` })}
                    />
                    <h4 className={styles.name}>{username}</h4>
                </div>
            )}
        </AppContext.Consumer>
    )
}
UserAvatar.propTypes={
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

export default UserAvatar
