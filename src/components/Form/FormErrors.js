import React from 'react';
import styles from './FormErrors.module.scss';
import PropTypes from 'prop-types';

const FormErrors = ({formErrors})=>
(
    <div className={styles.formErrors}>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>{formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>
)
FormErrors.propTypes={
    formErrors: PropTypes.object,
}

export default FormErrors;