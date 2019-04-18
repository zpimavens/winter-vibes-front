import React from 'react';
import UserItem from './UsersListItem';
import styles from './UsersList.module.scss';

const UsersList = ({users})=>(
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
        <h2>Nie znaleziono uzytkowników</h2>
    }
    </div>
)

export default UsersList;