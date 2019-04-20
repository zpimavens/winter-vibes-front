import React from 'react';
import UserItem from './UsersListItem';
import AppContext from '../../context';
import styles from './UsersList.module.scss';

class UsersList extends React.Component  {
    
    render(){
        return(
            <AppContext.Consumer>
            {(context) => (
                <div className={styles.wrapper}>
                {this.props.users.length ? 
                    <ul className={styles.userList}>
                        {this.props.users.map((user)=>(
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
    }
}
//({users})=>

export default UsersList;