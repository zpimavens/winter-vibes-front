import React, { Component } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import PL from 'date-fns/locale/pl'
import Input from '../Inputs/Input'
import styles from './AddEvent.module.scss'
import Button from '../Button/Button';

registerLocale('PL', PL);

class AddEvent extends Component {

    state={
        name: '',
        startDate: '',
        endDate: '',
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
    handleSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state)
    }
    render(){
        return(
            <form>
                <div className={styles.container}>
                    <h4>NOWE WYDARZENIE</h4>
                    <Input 
                        name='name'
                        id='name'
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        placeholder='Nazwa wydarzenia'
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
//proptypes
export default AddEvent
