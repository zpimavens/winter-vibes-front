import React, { Component } from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import SkiAreasList from '../../components/SkiAreasList/SkiAreasList'
import styles from './SkiAreaSearchView.module.scss'
import Loader from '../../components/Loader/Loader';

class SkiAreaSearchView extends Component{
//in progress
    state={
        country: '',
        name: '',
        rental: false,
        school: false,
        nightride: false,
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

    handleSearch=()=>{
        
        //send search data, retrieve ski arenas
        this.setState({
            message: false,
            foundData: []
        })
        fetch('/api/skiArenaSearch', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...this.state.name})
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
            console.log(data[0])
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
                        <label 
                            htmlFor='rental'
                        >
                            <Input
                                name='rental'
                                type='checkbox'
                                onChange={this.handleInputChange}
                                checked={this.state.rental}
                            />
                        WYPOŻYCZALNIA
                        </label>
                        <label 
                            htmlFor='school'
                        >
                            <Input
                                name='school'
                                type='checkbox'
                                onChange={this.handleInputChange}
                                checked={this.state.school}
                            />
                        SZKÓŁKA NARCIARSKA
                        </label>
                        <label 
                            htmlFor='nightride'
                        >
                            <Input
                                name='nightride'
                                type='checkbox'
                                onChange={this.handleInputChange}
                                checked={this.state.nightride}
                            />
                        NOCNA JAZDA
                        </label>
                        <label 
                            htmlFor='snowpark'
                        >
                            <Input
                                name='snowpark'
                                type='checkbox'
                                onChange={this.handleInputChange}
                                checked={this.state.snowpark}
                            />
                        SNOWPARK
                        </label>
                    </form>
                    <Button
                        onClick={this.handleSearch}
                    >Szukaj</Button>
                </div>
                
                    <div className={styles.loader}>
                    </div>
                
                {this.state.foundData.length > 0 ?
                (
                    <SkiAreasList
                        areas={this.state.foundData}
                    />
                ):(
                    this.state.message===false? <Loader /> 
                    :  
                    <p>{this.state.message}</p>
                )
                }
            </div>
        )
    }
}
export default SkiAreaSearchView
