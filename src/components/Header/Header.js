import React from 'react';
import styles from './Header.module.scss';
import HeaderNavigation from './HeaderNavigation';
import Avatar from '../UserAvatar/UserAvatar';
import HeaderDropDown from './HeaderDropDown';
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
    componentDidMount() {
        fetch('/checkToken')
            .then((res) => {
                this.setState(
                    prevState=>({
                    loading: false,
                    isAuthenticated: res.status === 200,
                    isDropDownOpen: prevState.isDropDownOpen,
                    })
                );
            });
    }
    componentDidUpdate(){
        fetch('/checkToken')
            .then((res) => {
                this.setState({
                    loading: false,
                    isAuthenticated: res.status === 200,
                });
            });
    }

    render(){
        if (this.state.loading) {
            return null;
        } else {
              return(
                      this.state.isAuthenticated && 
                      <header className={styles.wrapper}>
                          <Logo
                              logoType='navbarLogo'
                          />
                          <HeaderNavigation
                              clickFnc={this.toggleMenu}
      
                          />
                          <Avatar />
      
                          {this.state.isDropDownOpen ? <HeaderDropDown clickFnc={this.toggleMenu} /> : null}
                      </header>
              )  
            
        }
       
    }
    
};

export default Header;
