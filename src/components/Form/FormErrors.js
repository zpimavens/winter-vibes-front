import React from 'react'
import PropTypes from 'prop-types'
import styles from './FormErrors.module.scss'

const FormErrors = ({formErrors})=>
(
    <div className={styles.formErrors}>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>{formErrors[fieldName]}</p>
                )
            } else {
                return ''
            }
        })}
    </div>
)
FormErrors.propTypes={
    formErrors: PropTypes.object,
}

export default FormErrors
