import React from 'react'
import PropTypes from 'prop-types'
import UserItem from './UsersListItem'
import styles from './UsersList.module.scss'

const UsersList =({ users })=>  (
    <div className={styles.wrapper}>
        {users.length ? 
            <ul className={styles.userList}>
                {users.map((user)=>(
                    <UserItem 
                        {...user}
                        key={user.username}
                    />
                ))}
            </ul>
            :
            null
        }
    </div>
)
UsersList.propTypes={
    users: PropTypes.array.isRequired,
}

export default UsersList
