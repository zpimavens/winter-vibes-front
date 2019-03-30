import React from 'react';
import styles from './UserAvatar.module.scss';
import AppContext from '../../context';


const Avatar = ({avatarType}) => {        //type: navbar or big
    // (type === 'profile' ? styles.profileType : styles.listType)
    const wrapperClass = avatarType === 'profile' ? styles.profileType : styles.navType;
    const imageClass = avatarType === 'profile' ? styles.profileTypeImage : styles.navTypeImage ;
    const usernameClass = avatarType === 'profile' ? styles.profileTypeName : styles.navTypeName  ;

    return (
        <AppContext.Consumer>
            {(context) => (
                <div className={wrapperClass}>
                    <img
                        src={context.user.image}
                        className={imageClass}
                        alt={context.user.username}
                        onClick={() => context.history.push({ pathname: '/user' })}
                    />
                    <h4 className={usernameClass}>{context.user.username}</h4>
                </div>
            )}
        </AppContext.Consumer>
    )
};

Avatar.defaultProps = {
    type: 'navType',
}

export default Avatar;