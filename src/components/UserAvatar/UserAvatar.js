import React from 'react';
import styles from './UserAvatar.module.scss';
import AppContext from '../../context';


const Avatar = ({avatarType}) => {        //type: navbar or big
    // (type === 'profile' ? styles.profileType : styles.listType)
    const wrapper = avatarType === 'profile' ? styles.profileType : styles.navType;
    const image = avatarType === 'profile' ? styles.profileTypeImage : styles.navTypeImage ;
    const username = avatarType === 'profile' ? styles.profileTypeName : styles.navTypeName  ;

    return (
        <AppContext.Consumer>
            {(context) => (
                <div className={wrapper}>
                    <img
                        src={context.user.image}
                        className={image}
                        alt={context.user.username}
                        onClick={() => context.history.push({ pathname: '/user' })}
                    />
                    <h4 className={username}>{context.user.username}</h4>
                </div>
            )}
        </AppContext.Consumer>
    )
};

Avatar.defaultProps = {
    type: 'navType',
}

export default Avatar;