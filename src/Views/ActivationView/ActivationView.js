import React from "react";
import { Link } from "react-router-dom";
import styles from "./ActivationView.module.scss";

class ActivationView extends React.Component {
  state = {
    resolved: false,
    loading: true
  };

  componentDidMount() {
    const path = "/api" + window.location.pathname;

    fetch(path).then(response => {
      if (response === 500) {
        this.setState({
          resolved: false,
          loading: false
        });
      } else {
        this.setState({
          resolved: true,
          loading: false
        });
      }
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        {this.state.loading ? (
          <h1>Trwa aktywacja....</h1>
        ) : this.state.resolved ? (
          <>
            <h1>Dzięki za rejestrację!</h1>
            <h2>Twoje konto jest już aktywne.</h2>
            <Link className={styles.link} to="/login">
              Kliknij tutaj by się zalogować!
            </Link>
          </>
        ) : (
          <h1>Coś poszło nie tak. Spróbuj ponownie za chwilę.</h1>
        )}
      </div>
    );
  }
}
export default ActivationView;
