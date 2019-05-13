import React, { Component } from 'react'
import { requestUrls } from '../../urls'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Button/Button'
import UsersList from '../../components/UsersList/UsersList'
import Loader from '../../components/Loader/Loader'
import styles from './UsersSearchView.module.scss'

class UsersSearchView extends Component {
    state={
        usersFound: [],
        username: '',
        message: 'Wpisz nazwę i wciśnij "Szukaj"',
    }

    handleInputChange = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value   
        })
    }

    clearPreviousData=()=>{
        this.setState({
            message: '',
            usersFound: []
        })
    }

    getSearchedUsers = ()=>{
         
        this.clearPreviousData()

        fetch(requestUrls.SEARCH_USER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify({username: this.state.username})
        })
        .then(response => {
            if (response.status === 200){
                return response.json()
            }
            else if(response.status === 404){
                this.setState({
                    message: 'Nic nie znaleźliśmy. Zmień parametry i spróbuj ponownie.'
                })
            }
            else{
                this.setState({
                    message: 'Coś poszło nie tak. Spróbuj ponownie później.'
                })
            }
        })
        .then((data) => {
            if( data && data.length > 0 )
                this.setState({
                    usersFound: data
                })
            else
                this.setState({
                    message: 'Nic nie znaleźliśmy. Zmień parametry i spróbuj ponownie.',
                })
        })
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
                {!this.state.usersFound || this.state.usersFound.length <= 0 ? 
                    (
                       this.state.message===''? <Loader/> : <p>{this.state.message}</p>
                    ):(
                        <UsersList 
                            users={this.state.usersFound}
                        />
                    )
                }
            </div>
        )
    }
}
export default UsersSearchView
