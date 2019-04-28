import React from 'react';
import styles from './UsersListItem.module.scss';
import PropTypes from 'prop-types';

class UsersListItem extends React.Component{
    
    handleClick = (e) => {
        this.props.history.push(`/user/${this.props.username}`)  
    }
    
    render(){
        const {username, image, level, skis, city} = this.props;
        return(
            <li 
                className={styles.wrapper}
                onClick={this.handleClick}
                id={username}
            >
                <img 
                    src={image} 
                    alt={username} 
                    className={styles.image}
                    
                    />
                <ul className={styles.userInfo}>
                    <li 
                        className={styles.boldText}
                    >
                    {username}
                    </li>
                    <li>Poziom zaawansowania: {level}</li>
                    <li 
                        className={styles.italicText}
                    >
                    {skis}
                    </li>
                    <li>{city}</li>
                </ul>
            </li>

        )
    }
}
UsersListItem.propTypes={
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, 
    level: PropTypes.number,   
    skis: PropTypes.string, 
    city: PropTypes.string,
}
UsersListItem.dfaultProps={
    level: 0,
}

export default UsersListItem;