import React from 'react';
import styles from './UsersListItem.module.scss';

const boldText={
    fontWeight: '800',
    fontSize: '1.3em'
}
const italicText = {
    fontStyle: 'italic',
}
//{username, image, level, skis, city}
class UsersListItem extends React.Component{
    
    handleClick = (e) => {
        this.props.history.push(`/user/${this.props.username/*.toLowerCase()*/}`)  
    }
    
    render(){
        return(
            <li 
                className={styles.wrapper}
                onClick={this.handleClick}
                id={this.props.username}
            >
                <img 
                    src={this.props.image} 
                    alt={this.props.username} 
                    className={styles.image}
                    
                    />
                <ul className={styles.userInfo}>
                    <li style={boldText}>{this.props.username}</li>
                    <li>Poziom zaawansowania: {this.props.level}</li>
                    <li style={italicText}>{this.props.skis}</li>
                    <li>{this.props.city}</li>
                </ul>
            </li>

        )
    }
}

export default UsersListItem;