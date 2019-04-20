import React from 'react';
import styles from './HeaderDropDown.module.scss';
import {NavLink} from 'react-router-dom';
import AppContext from '../../context';

const HeaderDropDown = ({clickFnc}) =>{

    return(
        <AppContext.Consumer>
            {(context)=>(
                <ul className={styles.wrapper}>
                    <li className={styles.navItem}
                    >
                        <NavLink exact 
                        onClick={clickFnc}
                        className={styles.navItemLink} 
                        activeClassName={styles.navItemLinkActive} 
                        to={`/user/${context.user.username}`}
                        >MOJE KONTO</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink exact 
                        onClick={clickFnc}
                        className={styles.navItemLink} 
                        activeClassName={styles.navItemLinkActive} 
                        to='/'>MOJE GRUPY</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink exact 
                        onClick={clickFnc}
                        className={styles.navItemLink} 
                        activeClassName={styles.navItemLinkActive} 
                        to='/search-users'>SPOŁECZNOŚĆ</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink exact 
                        onClick={clickFnc}
                        className={styles.navItemLink} 
                        activeClassName={styles.navItemLinkActive} 
                        to='/search-areas'>SKIARENY</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <button
                            onClick={context.logOut}
                            className={styles.navItemLink}
                        >WYLOGUJ</button>
                    </li>
                    
                </ul>

            )}
        </AppContext.Consumer>
    )
}

export default HeaderDropDown;