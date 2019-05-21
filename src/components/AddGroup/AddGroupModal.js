import React, { Component } from 'react'
import Input from '../Inputs/Input'
import Checkbox from '../Inputs/Checkbox'
import styles from './AddGroupModal.module.scss'
import Button from '../Button/Button';
import FormMessages from '../Form/FormMessages';

class AddGroupModal extends Component {

    state={
        isPrivate: false,
        name: '',
        description: '',
        owner: 'madoranges',
        message: {
            msg: '',
        },
    }

    handleInputChange=(e)=>{
        const { name, value } = e.target
        if(name === 'isPrivate'){
            this.setState(prev=>({
                isPrivate: !prev.isPrivate
            }))
        }else
        this.setState({
            [name]:value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const data = {
            name: this.state.name,
            description: this.state.description,
            owner: this.state.owner,
            private: this.state.isPrivate
        }
        console.log(data)

        fetch('/api/groups',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            if(res.status===201){
                this.setState({
                    message: {
                        msg: 'Dodano grupę!'
                    } 
                })
            }else{
                this.setState({
                    message: {
                        msg: 'Cos poszło nie tak. Sprobuj ponownie później.'
                    }
                })
            }
        })
        
    }
    

    render(){

        return(
            <div
                className={styles.wrapper}
            >
                <div
                    className={styles.closeButton}
                    onClick={this.props.closeModalFn}
                ></div>
                <h4>NOWA GRUPA</h4>
                <form>
                    <FormMessages 
                        formMessages={this.state.message}
                    />
                    <Input 
                        name='name'
                        id='name'
                        type='text'
                        placeholder='Nazwa grupy'
                        onChange={this.handleInputChange}
                        value={this.state.name}
                    />
                    <Checkbox 
                        name='isPrivate'
                        label=' GRUPA PRYWATNA'
                        onChange={this.handleInputChange}
                        value={this.state.isPrivate}
                    />
                    <Input 
                        name='description'
                        type='textarea'
                        placeholder='OPIS GRUPY'
                        maxLength='300'
                        onChange={this.handleInputChange}
                        value={this.state.description}
                    />
                    <Button
                        onClick={this.handleSubmit}
                        
                    >
                        UTWÓRZ
                    </Button>
                </form>
            </div>
        )
    }
}

export default AddGroupModal