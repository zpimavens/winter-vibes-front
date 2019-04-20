import React from 'react';
import styles from './Header.module.scss';
import HeaderNavigation from './HeaderNavigation';
import UserAvatar from '../UserAvatar/UserAvatar';
import HeaderDropDown from './HeaderDropDown';
import AppContext from '../../context';
import Logo from '../Logo/Logo';

//doesnt work
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
                loading: prevState.loading,
                isAuthenticated: prevState.isAuthenticated,
            })
        )
    };

    render(){
              return(
                    
                    <AppContext.Consumer>
                        {(context)=>(
                            <header className={styles.wrapper}>
                                <Logo
                                    logoType='navbarLogo'
                                />
                                <HeaderNavigation
                                    clickFnc={this.toggleMenu}
            
                                />
                                <UserAvatar 
                                    image={context.user.image}
                                    username={context.user.username}
                                />
            
                                {this.state.isDropDownOpen ? <HeaderDropDown clickFnc={this.toggleMenu} /> : null}
                            </header>

                        )}
                    </AppContext.Consumer>
              )  
    }
};

export default Header;
