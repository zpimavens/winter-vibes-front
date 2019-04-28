import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import styles from './EditProfileView.module.scss';
import Button from '../../components/Button/Button';
import FormErrors from '../../components/Form/FormErrors';

class EditProfileView extends Component {

    state = {
        username: '',
        skis: '',
        level: 0,
        town: '',
        formErrors: {
            else: '',
        }

    }
    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

   handlePrifileUdate = (e) => {
       e.preventDefault();
       fetch('/api/editUser', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({ formErrors: { else: 'Pomyślnie zmieniono Twoje dane :)' } });

            } else {
                const error = new Error(res.status);
                this.setState({formErrors: {else: 'Coś poszło nie tak. Spróbuj ponownie.'}});
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
        });
        
   }
   componentDidMount(){
       fetch('/api/getCurrentUser')
        .then(res=>{
           if (res.status === 200)
               return res.json();
           else
               throw new Error(res.status)
       })
        .then(([data]) => {
            this.setState({
                username: data.username,
                skis: data.skis,
                level: data.level,
                town: data.town,
            })
        })
        .catch(error => (null));
   }

    render(){
        return(
            <>
            <form className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Podaj dane do zmiany:</h2>
            <FormErrors formErrors={this.state.formErrors}/>
                <Input
                    name="skis"
                    id="skis"
                    type='text'
                    placeholder="Nazwa nart"
                    value={this.state.skis}
                    onChange={this.handleInputChange}
                />
                <Input
                    name="town"
                    id="town"
                    type='text'
                    placeholder="Miasto"
                    value={this.state.town}
                    onChange={this.handleInputChange}
                />
                <label htmlFor="level">Poziom umiejętności: {this.state.level}</label>
                <Input
                    className={styles.slider}
                    name="level"
                    id="level"
                    type='range'
                    value={this.state.level}
                    min='0'
                    max='10'
                    onChange={this.handleInputChange}
                />
                <Button
                    clickFn={this.handlePrifileUdate}
                >
                ZAPISZ ZMIANY
                </Button>
            </form>
            </>
        )
    }
}

export default EditProfileView;