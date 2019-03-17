import React from 'react';
import styles from './HeaderNavigation.module.scss';
import { NavLink } from 'react-router-dom';
import AppContext from '../../context';

const HeaderNavigation = ({clickFnc}) =>{

    return(
        <AppContext.Consumer>
            {(context)=>(
                <nav className={styles.wrpper}>
                    <ul >
                        <li className={styles.navItem}>
                            <NavLink exact  className={styles.navItemLink} activeClassName={styles.navItemLinkActive} to='/user'>MOJE KONTO</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink exact className={styles.navItemLink} activeClassName={styles.navItemLinkActive} to='/'>MOJE GRUPY</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink exact className={styles.navItemLink} activeClassName={styles.navItemLinkActive} to='/'>SPOŁECZNOŚĆ</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink exact className={styles.navItemLink} activeClassName={styles.navItemLinkActive} to='/skiarea'>SKIARENY</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <button
                                onClick={context.logOut} 
                                className={styles.navItemLink}
                            >WYLOGUJ</button>
                        </li>
                    </ul>
                    <button 
                        className={styles.button}
                        onClick={clickFnc}
                    >
                    <div className={styles.buttonIcon}></div>
                    </button>  
                </nav>
            )}
        </AppContext.Consumer>
    )
};

export default HeaderNavigation;