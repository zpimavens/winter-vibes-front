import React, { Component } from 'react'
import AppContext from '../../context'
import DatePicker, { registerLocale } from 'react-datepicker'
import { requestUrls } from '../../urls'
import PL from 'date-fns/locale/pl'
import Input from '../Inputs/Input'
import styles from './AddEvent.module.scss'
import Button from '../Button/Button';

registerLocale('PL', PL);

class AddEvent extends Component {

    state={
        name: '',
        startDate: new Date(),
        endDate: '',
        description: '',
    }

    handleInputChange=(e)=>{
        const { name, value } = e.target
        this.setState({
            [name] : value
        })
    }
    setStartDay=(day)=>{
        this.setState({
            startDate: day
        })
    }

    setEndDay = (day) => {
        this.setState({
            endDate: day
        })
    }
    addEvent = (event) =>{
        fetch(requestUrls.ADD_EVENT, {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res=>{
            if(res.status===201){
                this.context.addEvent()
                this.context.updateEvents()
            }else{
                alert('not ok')
            }
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if(!this.state.name || !this.state.endDate || !this.state.startDate || !this.state.description)
            {alert('wypelnij wszystkie pola')
                return
            }
        const event = {
            group: this.context.id, 
            name: this.state.name, 
            owner: this.context.username, 
            isPrivate: true, 
            description: this.state.description, 
            startDate: this.state.startDate, 
            endDate: this.state.endDate
        }
        this.addEvent(event)
    }
    render(){
        return(
            <form autoComplete='off'>
                <div className={styles.container}>
                    <h4>NOWE WYDARZENIE</h4>
                    <Input 
                        name='name'
                        id='name'
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        placeholder='Nazwa wydarzenia'
                    />     
                    <Input 
                        name='description'
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        type='textarea'
                        placeholder='Opis...'
                    />
                    <div className={styles.dateWrapper}>
                        <DatePicker 
                            onChange={this.setStartDay} 
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy/MM/dd HH:mm"
                            timeCaption="Czas"
                            placeholderText="Początek"
                            locale="PL"
                            minDate={new Date()}
                        />
                        <DatePicker
                            name='startDate'
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.setEndDay}
                            minDate={this.state.startDate}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy/MM/dd HH:mm"
                            timeCaption="Czas"
                            placeholderText="Koniec"
                            locale="PL"
                            
                        />
                    </div>
                    <Button
                        onClick={this.handleSubmit}
                    >DODAJ</Button>
                </div>
            </form>
        )
    }
}
AddEvent.contextType = AppContext
//proptypes
export default AddEvent
