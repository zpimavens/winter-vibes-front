import React from "react"
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types"
import styles from "./HeaderAvatar.module.scss"

const HeaderAvatar = ({ image, username, history }) => (

    <div className={styles.wrapper}>
        <img
            className={styles.image}
            src={image}
            alt={username}
            onClick={() =>
                history.push({ pathname: `/user/${username}` })
            }
        />
        <h4 
            className={styles.name}
        >
            {username}
        </h4>
    </div>
)

HeaderAvatar.propTypes = {
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

export default withRouter(HeaderAvatar)
