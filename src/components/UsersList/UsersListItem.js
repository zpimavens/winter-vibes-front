import React from 'react'
import { withRouter } from 'react-router-dom'
import { appUrls } from '../../urls'
import PropTypes from 'prop-types'
import styles from './UsersListItem.module.scss'

class UsersListItem extends React.Component{
    
    handleClick = (e) => {
        this.props.history.push(appUrls.USER+this.props.username)  
    }
    
    render(){
        const {username, image, level, skis, city} = this.props
        return(
            <li 
                className={styles.wrapper}
                onClick={this.handleClick}
                id={username}
            >
                <img 
                    className={styles.avatar}
                    src={image}
                    alt={username}
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
UsersListItem.defaultProps={
    level: 0,
}

export default withRouter(UsersListItem)
