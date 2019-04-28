import React from 'react';
import styles from './HeaderNavigation.module.scss';
import { NavLink } from 'react-router-dom';
import AppContext from '../../context';
import PropTypes from 'prop-types';

const HeaderNavigation = ({type,...props}) =>{

    const navLinkClassName = type==='navbar' ? styles.navItem : styles.navItemDropdown;
    const wrapperClassName = type==='navbar' ? styles.wrapper : styles.wrapperDropdown;
    const navItemLinkClassName = type==='navbar' ? styles.navItemLink : styles.navItemDropdownLink;
    const navItemLinkActiveClassName = type==='navbar' ? styles.navItemLinkActive : styles.navItemDropdownLinkActive;

    return(
        <AppContext.Consumer>
            {(context)=>(
                <nav className={wrapperClassName}>
                    <ul >
                        <li className={navLinkClassName}>
                            <NavLink 
                                exact 
                                className={navItemLinkClassName} 
                                activeClassName={navItemLinkActiveClassName} 
                                to={`/user/${context.user.username}`}
                                {...props}
                            >
                            MOJE KONTO
                            </NavLink>
                        </li>
                        <li className={navLinkClassName}>
                            <NavLink 
                                exact 
                                className={navItemLinkClassName} 
                                activeClassName={navItemLinkActiveClassName} 
                                to='/'
                                {...props}
                            >
                            MOJE GRUPY
                            </NavLink>
                        </li>
                        <li className={navLinkClassName}>
                            <NavLink 
                                exact 
                                className={navItemLinkClassName} 
                                activeClassName={navItemLinkActiveClassName} 
                                to='/search-users'
                                {...props}
                            >
                            SPOŁECZNOŚĆ
                            </NavLink>
                        </li>
                        <li className={navLinkClassName}>
                            <NavLink 
                                exact 
                                className={navItemLinkClassName} 
                                activeClassName={navItemLinkActiveClassName} 
                                to='/search-areas'
                                {...props}
                            >
                            SKIARENY
                            </NavLink>
                        </li>
                        <li 
                            className={navLinkClassName}
                        >
                            <button
                                onClick={context.handleLogOut} 
                                className={navItemLinkClassName}
                            >
                            WYLOGUJ
                            </button>
                        </li>
                    </ul>    
                </nav>
            )}
        </AppContext.Consumer>
    )
};

HeaderNavigation.propTypes={
    type: PropTypes.oneOf(['navbar','dropdown']),
}
HeaderNavigation.defaultProps={
    type: 'navbar',
}
export default HeaderNavigation;