import React, {Component} from 'react';
import styles from './SkiAreaSearchView.module.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

class SkiAreaSearchView extends Component{
//in progress
    state={
        country: '',
        rental: false,
        school: false,
        nightride: false,
        snowpark: false,
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        
        if(name==='country'){
            this.setState({
                [name]: value
            });
        }else{
            this.setState(prev => ({
                [name]: !prev[name]
            }));
        }
    }

    handleSearch=()=>{
        //send search data, retrieve ski arenas
    }
  
    render(){
        return(
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>WYSZUKAJ SKIARENY</h2>
                    <form className={styles.form}>
                        <Input
                            name='country'
                            placeholder='Kraj'
                            onChange={this.handleInputChange}
                            value={this.state.country}
                        />
                        <label htmlFor='rental'>WYPOŻYCZALNIA</label>
                        <Input
                            name='rental'
                            type='checkbox'
                            onChange={this.handleInputChange}
                            checked={this.state.rental}
                        />
                        <label htmlFor='school'>SZKÓŁKA NARCIARSKA</label>
                        <Input
                            name='school'
                            type='checkbox'
                            onChange={this.handleInputChange}
                            checked={this.state.school}
                        />
                        <label htmlFor='nightride'>NOCNA JAZDA</label>
                        <Input
                            name='nightride'
                            type='checkbox'
                            onChange={this.handleInputChange}
                            checked={this.state.nightride}
                        />
                        <label htmlFor='snowpark'>SNOWPARK</label>
                        <Input
                            name='snowpark'
                            type='checkbox'
                            onChange={this.handleInputChange}
                            checked={this.state.snowpark}
                        />
                        <Button
                            clickFn={this.handleSearch}
                        >Szukaj</Button>
                        
                    </form>
                </div>
            </div>
        )
    }
}
export default SkiAreaSearchView;