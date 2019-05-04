import React, { Component } from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import SkiAreasList from '../../components/SkiAreasList/SkiAreasList'
import styles from './SkiAreaSearchView.module.scss'

class SkiAreaSearchView extends Component{
//in progress
    state={
        country: '',
        name: '',
        rental: false,
        school: false,
        nightride: false,
        snowpark: false,
        data: []
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
        this.setState({
            data:[
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
                {
                    name: 'Arena 1',

                },
            ]
        })
        //send search data, retrieve ski arenas
        
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
                <SkiAreasList
                    areas={this.state.data}
                />
            </div>
        )
    }
}
export default SkiAreaSearchView
