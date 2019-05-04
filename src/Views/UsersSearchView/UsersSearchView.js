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
        message: 'Wpisz cos zeby szukać co nie'
    }

    handleInputChange = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value   
        })
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
            if (response.status === 200){
                return response.json()
            }
            else if(response.status === 404){
                this.setState({
                    message: 'Nic nie znaleźliśmy :( \n Spróbuj ponownie.'
                })
            }
            else{
                this.setState({
                    message: 'Coś poszło nie tak. Spróbuj ponownie później.'
                })
                throw new Error(response.status)
            }
        })
        .then((data) => {
            if(data.length>0)
                this.setState({
                    usersFound: data
                })
            else
                this.setState({
                    message: 'Nic nie znaleźliśmy :('
                })
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
                {this.state.usersFound.length>0 ? (
                    <UsersList 
                        users={this.state.usersFound}
                    />
                    ):(
                        <p>{this.state.message}</p>
                    )
                }
            </div>
        )
    }
}
export default UsersSearchView
