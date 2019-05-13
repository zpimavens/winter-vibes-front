import React from 'react'
import AppContext from '../../context'
import HeaderNavigation from './HeaderNavigation'
import HeaderAvatar from './HeaderAvatar'
import Logo from '../Logo/Logo'
import styles from './Header.module.scss'

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
    }

    render(){
        return(
            <AppContext.Consumer>
                {(context)=>(
                    <header className={styles.wrapper}>
                        <Logo
                            logoType='smallHorizontal'
                        />
                        <HeaderNavigation/>
                        <HeaderAvatar 
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
}

export default Header
