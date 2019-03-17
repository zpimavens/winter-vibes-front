import React from 'react';
import styles from './HeaderUser.module.scss';
import AppContext from '../../context';

const HeaderUser = ()=>{

    return(
        <AppContext.Consumer>
            {(context)=>(
                <div className={styles.wrapper}>
                    <img 
                        src={context.user.image} 
                        className={styles.userImage} 
                        alt={context.user.username}
                        // onClick={()=>history.push({pathname: '/user'})}
                    />
                    <h4 className={styles.userName}>{context.user.username}</h4>
                </div>
            )}
        </AppContext.Consumer>
    )
};

export default HeaderUser;