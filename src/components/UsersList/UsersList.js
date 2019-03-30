import React from 'react';
import UserItem from './UsersListItem';
import styles from './UsersList.module.scss';

const UsersList = ({users})=>(
    <div className={styles.wrapper}>
    <h1>Znaleziono takich userow, pacz:</h1>
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
        <h1>no users, sorry</h1>
    }
    </div>
)

export default UsersList;