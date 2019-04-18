import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import styles from './EditProfileView.module.scss';
import Button from '../../components/Button/Button';
import FormErrors from '../../components/Form/FormErrors';

class EditProfileView extends Component {

    state = {
        username: '',
        skis: '',
        skill: '',
        formErrors: {
            username: '',
        }

    }
    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

   handlePrifileUdate = (e) => {
       //update profile info in database
       e.preventDefault();
       console.log('pretend to be updated, connect to db');
       /*
       fetch('/someurltoupdateprofile', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    Errors='done!';

                } else {
                    const error = new Error(res.status);
                    this.setState({formErrors: {username: 'Taka nazwa użytkownika już istnieje.'}});
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
            });
        */
   }

    render(){
        return(
            <>
            <form className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Podaj nam dane do zmiany: </h2>
            <FormErrors formErrors={this.state.formErrors}/>
                <Input
                    // className={styles.input}
                    name="username"
                    id="username"
                    type='text'
                    placeholder="Nazwa użytkownika"
                    onChange={this.handleInputChange}
                />
                <Input
                    // className={styles.input}
                    name="skis"
                    id="skis"
                    type='text'
                    placeholder="Nazwa nart"
                    onChange={this.handleInputChange}
                />
                <label htmlFor="skill">Poziom umiejętności: </label>
                <Input
                    className={styles.slider}
                    name="skill"
                    id="skill"
                    type='range'
                    min='0'
                    max='10'
                    onChange={this.handleInputChange}
                    
                />
                <Button
                    clickFn={this.handlePrifileUdate}
                >ZAPISZ ZMIANY</Button>
            </form>
            </>
        )
    }
}

export default EditProfileView;