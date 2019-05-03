import React, { Component } from 'react'
import { requestUrls } from '../../urls'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import UsersList from '../../components/UsersList/UsersList'
import styles from './UsersSearchView.module.scss'

class UsersSearchView extends Component {
    state={
        usersFound: [],
        username: '',
    }

    handleInputChange = (e) => {
        const { value, name } = e.target
        this.setState(prevState=>({
            [name]: value,
            usersFound: prevState.usersFound,   
        }))
    }

    getSearchedUsers = ()=>{
        const { usersFound, ...username } = this.state 

        this.state.username &&
        fetch(requestUrls.SEARCH_USER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(username)
        })
        .then(response => {
            if (response.status === 200)
                return response.json()
            else
                throw new Error(response.status)
        })
        .then((data) => {
            this.setState(prevState=>({
                usersFound: data,
                userSearch: prevState.userSearch,
            }))
        })
        .catch()
        }

    handleSearch=(e)=>{
        e.preventDefault()
        this.getSearchedUsers()
    }

    render(){
        return(
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                <h2 
                    className={styles.title}
                >
                WYSZUKAJ UŻYTKOWNIKÓW
                </h2>
                <form className={styles.form}>
                    <Input
                        name='username'
                        placeholder='Szukaj użytkowników...'
                        onChange={this.handleInputChange}
                    />
                    <Button 
                        onClick={this.handleSearch}
                    >Szukaj</Button>
                </form>
            </div>
                <UsersList 
                    users={this.state.usersFound}
                />
            </div>
        )
    }
}
export default UsersSearchView
