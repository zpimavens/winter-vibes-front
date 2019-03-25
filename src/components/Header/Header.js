import React from 'react';
import styles from './Header.module.scss';
import HeaderNavigation from './HeaderNavigation';
import Avatar from '../UserAvatar/UserAvatar';
import HeaderDropDown from './HeaderDropDown';
import AppContext from '../../context';
import Logo from '../Logo/Logo';

class Header extends React.Component{
    state={
        isDropDownOpen: false,
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
            {
                (context)=>(
                    <header className={styles.wrapper}>
                        <Logo 
                            logoType='navbarLogo'
                        />
                        <HeaderNavigation 
                            clickFnc={this.toggleMenu}
                        />
                        <Avatar />
                        
                    {this.state.isDropDownOpen ? <HeaderDropDown clickFnc={this.toggleMenu}/> : null }
                    </header>
                )
            }
            </AppContext.Consumer>
        )
    }
    
};

export default Header;
