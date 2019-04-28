import React from 'react';
import UserItem from './UsersListItem';
import AppContext from '../../context';
import styles from './UsersList.module.scss';
import PropTypes from 'prop-types';

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

export default UsersList;