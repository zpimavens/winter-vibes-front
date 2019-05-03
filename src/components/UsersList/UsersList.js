import React from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../context'
import UserItem from './UsersListItem'
import styles from './UsersList.module.scss'

const UsersList =({users})=>  (
    <AppContext.Consumer>
    {(context) => (
        <div className={styles.wrapper}>
        {users.length ? 
            <ul className={styles.userList}>
                {users.map((user)=>(
                    <UserItem 
                        {...user}
                        key={user.username}
                        history={context.history}
                    />
                ))}
            </ul>
            :
            <h2>Nie znaleziono uzytkowników</h2>
        }
        </div>
    )}
    </AppContext.Consumer>
)
UsersList.propTypes={
    users: PropTypes.array.isRequired,
}

export default UsersList
