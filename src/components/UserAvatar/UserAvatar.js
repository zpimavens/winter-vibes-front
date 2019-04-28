import React from 'react';
import styles from './UserAvatar.module.scss';
import AppContext from '../../context';
import PropTypes from 'prop-types';

const Avatar = ({avatarType, image, username}) => {    
    let wrapperClassName = undefined;
    let imageClassName  = undefined;
    let usernameClassName = undefined;

    switch (avatarType){
        case 'headerType':
        wrapperClassName = styles.headerType;
        imageClassName = styles.headerTypeImage;
        usernameClassName = styles.headerTypeName;
        break;
        case 'profileType':
            wrapperClassName = styles.profileType;
            imageClassName = styles.profileTypeImage;
            usernameClassName = styles.profileTypeName;
        break;
        case 'listType':
            wrapperClassName = styles.listType;
            imageClassName = styles.listTypeImage;
            usernameClassName = styles.listTypeName;
        break;
        default:
        break;
    }
    return (
        <AppContext.Consumer>
            {(context) => (
                <div className={wrapperClassName}>
                    <img
                        src={image}
                        className={imageClassName}
                        alt={username}
                        onClick={() => context.history.push({ pathname: `/user/${username}` })}
                    />
                    <h4 className={usernameClassName}>{username}</h4>
                </div>
            )}
        </AppContext.Consumer>
    )
};
Avatar.propTypes={
    avatarType: PropTypes.oneOf(['profileType', 'headerType', 'listType']).isRequired,
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}


export default Avatar;