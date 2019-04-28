import React from 'react';
import styles from './UserAvatar.module.scss';
import AppContext from '../../context';
import PropTypes from 'prop-types';

const Avatar = ({avatarType, image, username}) => {    
    const wrapperClass = avatarType === 'profileType' ? styles.profileType : styles.smallType;
    const imageClass = avatarType === 'profileType' ? styles.profileTypeImage : styles.smallTypeImage;
    const usernameClass = avatarType === 'profileType' ? styles.profileTypeName : styles.smallTypeName;

    return (
        <AppContext.Consumer>
            {(context) => (
                <div className={wrapperClass}>
                    <img
                        src={image}
                        className={imageClass}
                        alt={username}
                        onClick={() => context.history.push({ pathname: `/user/${username}` })}
                    />
                    <h4 className={usernameClass}>{username}</h4>
                </div>
            )}
        </AppContext.Consumer>
    )
};
Avatar.propTypes={
    type: PropTypes.oneOf(['profileType', 'smallType']),
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}
Avatar.defaultProps = {
    type: 'smallType',
}

export default Avatar;