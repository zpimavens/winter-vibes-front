import React from 'react';
import {Link} from 'react-router-dom';
import styles from './ActivationView.module.scss';

class ActivationView extends React.Component {
   state={
       resolved: false,
       loading: true,
       path: '/api'+window.location.pathname,
   }

   componentDidMount(){
       
    fetch(this.state.path)
    .then(response => {
        if(response===500){
            this.setState({
                resolved: false,
                loading: false,
            })
            throw new Error(response.status);
        }else{
            this.setState({
                resolved: true,
                loading: false
            })
        }   
    })
    .catch(err=> console.error(err));
    
    }
   render(){
       return(
           <div className={styles.wrapper}>
       {this.state.loading ? 
            (<h1>Trwa aktywacja....</h1>
            ):(
                this.state.resolved ? (
                    <>
                    <h1>Dzięki za rejestrację!</h1>
                    <h2>Twoje konto jest już aktywne.</h2>
                    <Link className={styles.link} to='/login'>Kliknij tutaj by się zalogować!</Link>
                    </>
                ):(
                    <h1>Coś poszło nie tak. Spróbuj ponownie za chwilę.</h1>
                )
            )}

        </div>
       )
   }
}

//wyslj zapytanie do api/activate, zwroc jakis kod
export default ActivationView;