import React from 'react';
import styles from './UsersListItem.module.scss';

const UsersListItem = ({username, image, skill, skis})=>(
    <li className={styles.wrapper}>
        <img 
            src={image} 
            alt={username} 
            className={styles.image}
            // onClick={console.log(username)}
            />
        <ul className={styles.userInfo}>
            <li>{username}</li>
            <li>Poziom zaawansowania: {skill}</li>
            <li>{skis}</li>
            <li>Krakow</li>
        </ul>
    </li>
)

export default UsersListItem;