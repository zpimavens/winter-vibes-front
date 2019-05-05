import React, { Component } from 'react'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Button/Button'
import SkiAreasList from '../../components/SkiAreasList/SkiAreasList'
import styles from './SkiAreaSearchView.module.scss'
import Loader from '../../components/Loader/Loader';
import Checkbox from '../../components/Inputs/Checkbox';

class SkiAreaSearchView extends Component{
//in progress
    state={
        country: '',
        name: '',
        skiRental: false,
        skiSchool: false,
        nightRide: false,
        snowpark: false,
        foundData: [],
        message: "Wpisz i wciśnij 'Szukaj' "
    }

    handleInputChange = (e) => {
        const { value, name } = e.target
        
        if(name==='country' || name==='name'){
            this.setState({
                [name]: value
            })
        }else{
            this.setState(prev => ({
                [name]: !prev[name]
            }))
        }
    }
    clearFoundData = () => {
        this.setState({
            message: '',
            foundData: []
        })
    }

    handleSearch = () => {
        
        const { message, foundData, ...searchData } = this.state;

        this.clearFoundData();

        fetch('/api/skiArenaSearch', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(searchData)
        })
        .then(res=>{
            if(res.status === 200){
                return res.json()
            }else if(res.status === 404){
                this.setState({
                    message: 'Niestety, nic nie znaleźliśmy :('
                })
            }else{
                this.setState({
                    message: 'Coś poszło nie tak. Spróbuj ponownie później.'
                })
                throw new Error(res.status)
            }
        })
        .then(data=>{
            this.setState({
                foundData: data
            })
            
        })
        .catch()
    }
    
  
    render(){
        return(
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>WYSZUKAJ SKIARENY</h2>
                    <form className={styles.form}>
                        <Input
                            name='name'
                            placeholder='Nazwa'
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        <Input
                            name='country'
                            placeholder='Kraj'
                            onChange={this.handleInputChange}
                            value={this.state.country}
                        />
                        <Checkbox
                            name='skiRental'
                            onChange={this.handleInputChange}
                            checked={this.state.skiRental}
                            label='WYPOŻYCZALNIA'
                        />
                        <Checkbox
                            name='skiSchool'
                            onChange={this.handleInputChange}
                            checked={this.state.skiSchool}
                            label='SZKÓŁKA NARCIARSKA'
                        />
                        <Checkbox
                            name='nightRide'
                            onChange={this.handleInputChange}
                            checked={this.state.nightRide}
                            label='NOCNA JAZDA'
                        />
                        <Checkbox
                            name='snowpark'
                            onChange={this.handleInputChange}
                            checked={this.state.snowpark}
                            label='SNOWPARK'
                        />
                    </form>
                    <Button
                        onClick={this.handleSearch}
                    >Szukaj</Button>
                </div>
                
                {!this.state.foundData || this.state.foundData.length <= 0  ?
                (
                    this.state.message === '' ? <Loader /> 
                    :  
                    <p>{this.state.message}</p>

                ):(
                    <SkiAreasList
                    areas={this.state.foundData}
                    />
                )
                }
            </div>
        )
    }
}
export default SkiAreaSearchView
