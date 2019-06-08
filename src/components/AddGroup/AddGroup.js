import React, { Component } from 'react'
import Input from '../Inputs/Input'
import Checkbox from '../Inputs/Checkbox'
import styles from './AddGroup.module.scss'
import Button from '../Button/Button';
import FormMessages from '../Form/FormMessages';

class AddGroup extends Component {

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

    isFormEmpty=()=>{
        return !this.state.name && !this.state.description 
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.isFormEmpty()){
            this.setState({
                message:{
                    msg: 'Wypełnij wszystkie pola.'
                }
            })
        }else{

            const data = {
                name: this.state.name,
                description: this.state.description,
                owner: this.state.owner,
                isPrivate: this.state.isPrivate
            }
    
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
                    this.props.reloadData()
                }else{
                    this.setState({
                        message: {
                            msg: 'Cos poszło nie tak. Sprobuj ponownie później.'
                        }
                    })
                }
            })
        }
    }
    
    render(){

        return(
            <div
                className={styles.wrapper}
            >
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
                        maxLength='30'
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

export default AddGroup