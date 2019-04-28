import React from 'react';
import styles from './Header.module.scss';
import HeaderNavigation from './HeaderNavigation';
import UserAvatar from '../UserAvatar/UserAvatar';
import AppContext from '../../context';
import Logo from '../Logo/Logo';

class Header extends React.Component{
    state={
        isDropDownOpen: false,
        loading: true,
        isAuthenticated: false,
    }

    toggleMenu = ()=>{
        this.setState(
            prevState=>({
                isDropDownOpen: !prevState.isDropDownOpen,
            })
        )
    };

    render(){
              return(
                    <AppContext.Consumer>
                        {(context)=>(
                            <header className={styles.wrapper}>
                                <Logo
                                    logoType='smallHorizontal'
                                />
                                <HeaderNavigation/>
                                <UserAvatar 
                                    avatarType='headerType'
                                    image={context.user.image}
                                    username={context.user.username}
                                />
                                <button 
                                    className={styles.button}
                                    onClick={this.toggleMenu}
                                >
                                <div className={styles.buttonIcon}></div>
                                </button>
                                {this.state.isDropDownOpen && <HeaderNavigation onClick={this.toggleMenu} type='dropdown' />}
                            </header>

                        )}
                    </AppContext.Consumer>
              )  
    }
};

export default Header;
