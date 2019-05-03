import React from "react"
import PropTypes from "prop-types"
import AppContext from "../../context"
import styles from "./HeaderAvatar.module.scss"

const HeaderAvatar = ({ image, username }) => {

    return (
        <AppContext.Consumer>
            {context => (
                <div className={styles.wrapper}>
                <img
                    className={styles.image}
                    src={image}
                    alt={username}
                    onClick={() =>
                        context.history.push({ pathname: `/user/${username}` })
                    }
                />
                <h4 
                    className={styles.name}
                >
                    {username}
                </h4>
                </div>
            )}
        </AppContext.Consumer>
    )
}
HeaderAvatar.propTypes = {
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

export default HeaderAvatar
