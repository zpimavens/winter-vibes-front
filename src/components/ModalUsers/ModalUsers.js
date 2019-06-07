import React from 'react'

import Input from '../Inputs/Input'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'
import UsersList from '../UsersList/UsersList'
import styles from './ModalUsers.module.scss'

class ModalUsers  extends React.Component{

    state = {
        username: '',
        message: {
            msg: 'Szukaj użytkowników',
        },
        found: [],
        checked: '',
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        this.search()
    }
    handleClick=(e)=>{
        this.setState({
            checked:  e.currentTarget.id
        })
        
    }

    isFormEmpty = () => {
        return !this.state.username 
    }
    search=()=>{
        const data = {
            username: this.state.username,
        }
        fetch('/api/userSearch', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
            if(data){
                this.setState({
                    found: data
                })

            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const data={
            id: this.props.groupID,
            member: this.state.checked
        }
        if(!!data.member){
            fetch('/api/groups-add-member',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>{
                if(res.status===200){
                    console.log('dodano')
                }
                else{
                    this.setState({
                        message:{
                            msg:"coś poszło nie tak. spróbuj ponownie później"
                        }
                    })
                }
            })
        //dodaj do grupy this.props.groupid
        }

        
    }

    render() {

        return (
            <div
                className={styles.wrapper}
            >
                <div
                    className={styles.closeButton}
                    onClick={this.props.closeModalFn}
                ></div>
                <h4>Dodaj użytkownika</h4>
                <p>wybrany użytkownik: {this.state.checked}</p>
                <form>
                
                    <Input
                        name='username'
                        id='name'
                        type='text'
                        placeholder='Nazwa użytkownika'
                        onChange={this.handleInputChange}
                        value={this.state.name}
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
export default ModalUsers
