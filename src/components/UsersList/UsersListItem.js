import React from 'react';
import styles from './UsersListItem.module.scss';

const boldText={
    fontWeight: '800',
    fontSize: '1.3em'
}
const italicText = {
    fontStyle: 'italic',
}

const UsersListItem = ({username, image, level, skis})=>(
    <li 
        className={styles.wrapper}
        onClick={() => console.log(username)}
    >
        <img 
            src={image} 
            alt={username} 
            className={styles.image}
            
            />
        <ul className={styles.userInfo}>
            <li style={boldText}>{username}</li>
            <li>Poziom zaawansowania: {level/10}</li>
            <li style={italicText}>{skis}</li>
            <li>Krakow</li>
        </ul>
    </li>
)

export default UsersListItem;