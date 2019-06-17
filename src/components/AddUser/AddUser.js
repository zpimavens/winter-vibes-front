import React, { Component } from 'react'
import { requestUrls } from '../../urls'
import AppContext from '../../context'
import Button from '../Button/Button'
import UsersList from '../UsersList/UsersList'
import Loader from '../Loader/Loader'
import Input from '../Inputs/Input'
import styles from './AddUser.module.scss'

class AddUser extends Component {

    state = {
        username: ' ',
        message: {
            msg: 'Szukaj użytkowników',
        },
        found: [],
        checked: '',
    }

    handleInputChange = (e) => {
        this.search()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleClick = (e) => {
        this.setState({
            checked: e.currentTarget.id
        })
    }

    isFormEmpty = () => {
        return !this.state.username
    }
    search = () => {

        fetch(requestUrls.SEARCH_USER+this.state.username)
        .then(res => {

            if (res.status === 200) {
                return res.json()
            } else if (res.status === 404) {
                this.setState({
                    message: {
                        msg: 'Nie znaleźlismy takiego uzytkownika.'
                    }
                })
            }
            else {
                this.setState({
                    message: {
                        msg: 'Cos poszło nie tak. Spróbuj ponownie później.'
                    }
                })
            }
        })
        .then(data => {
            if (data) {
                this.setState({
                    found: data
                })

            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.isFormEmpty){
        const url = !!this.props.groupId ? requestUrls.ADD_MEMBER : requestUrls.ADD_MEMBER_EVENT

        const data = {
            id: this.props.groupId || this.props.eventId,
            member: this.state.checked
        }

        if (!!data.member) {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.context.addMember()
                        this.props.groupId ? this.context.updateGroupData() : this.context.updateEventData()
                    }
                    else {
                        this.setState({
                            message: {
                                msg: "coś poszło nie tak. spróbuj ponownie później"
                            }
                        })
                    }
                })
            //dodaj do grupy this.props.groupid
        }}
    }

    render(){
        return(
            <div className={styles.container}>
                <h4>DODAJ UŻYTKOWNIKA</h4>
                <p>wybrany użytkownik: {this.state.checked}</p>
                <form>
                    <Input
                        name='username'
                        id='name'
                        type='text'
                        placeholder='Nazwa użytkownika'
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        maxLength='30'
                    />
                    <div className={styles.listWrapper}>
                        {!this.state.found || this.state.found.length <= 0 ?
                            (
                                this.state.message.msg === '' ? <Loader /> : <p>{this.state.message.msg}</p>
                            ) : (
                                <UsersList
                                    users={this.state.found}
                                    onClick={this.handleClick}
                                />
                            )
                        }
                    </div>
                    <Button
                        onClick={this.handleSubmit}
                    >
                        dodaj
                    </Button>
                </form>
            </div>
        )
    }
}
AddUser.contextType = AppContext
export default AddUser
