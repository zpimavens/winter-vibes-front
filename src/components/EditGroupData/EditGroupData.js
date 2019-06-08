import React, { Component } from 'react'
import Input from '../Inputs/Input'
import Button from '../Button/Button'
import CheckBox from '../Inputs/Checkbox'
import styles from './EditGroupData.module.scss'

class EditGroupData extends Component {

    state={
        name: "",
        description: "",
        isPrivate: false,
    }

    handleInputChange=(e)=>{
        const {name, value} = e.target
        if(name==='isPrivate'){
            this.setState(prev=>({
                isPrivate: !prev.isPrivate
            }))
        }else{
            this.setState({
                [name]: value
            })
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const data = this.removeFalsy(this.state)
        this.changeData()
        this.props.closeModalFn()
    }

    changeData=()=>{
        //fetch......
        alert('waiting for backend')
    }
    removeFalsy = (obj) => {
        let newObj = {}
        Object.keys(obj).forEach((prop) => {
            if (!!obj[prop] !== false) { 
                newObj[prop] = obj[prop] 
            }
        })
        newObj = {...newObj, ...this.state.isPrivate}
        return newObj
    }

    render(){
        return(
            <div className={styles.container}>
                <h4>
                    EDYTUJ DANE GRUPY
                </h4>
                <form>
                    <div className={styles.wrapper}>
                        <Input 
                            name='name'
                            id='name'
                            placeholder='NAZWA GRUPY'
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />

                        <Input
                            name='description'
                            id='description'
                            type='textarea'
                            placeholder='OPIS'
                            value={this.state.description}
                            onChange={this.handleInputChange}
                        />
                        <CheckBox
                            name='isPrivate'
                            onChange={this.handleInputChange}
                            checked={this.state.isPrivate}
                            label='GRUPA PRYWATNA'
                        />
                        <Button
                            onClick={this.handleSubmit}
                        >
                            ZAPISZ
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}
export default EditGroupData
