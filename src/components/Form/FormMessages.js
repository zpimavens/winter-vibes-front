import React from 'react'
import PropTypes from 'prop-types'
import styles from './FormMessages.module.scss'

const FormMessages = ({ formMessages, messageType }) => (
  <div 
    className={messageType === "error" ? styles.error : styles.confirm}>
    {Object.keys(formMessages).map((fieldName, i) => {
      if (formMessages[fieldName].length > 0) {
        return <p key={i}>{formMessages[fieldName]}</p>
      } else {
        return ""
      }
    })}
  </div>
)

FormMessages.propTypes={
    formMessages: PropTypes.object,
    messageType: PropTypes.oneOf(['error', 'confirm']),
}
FormMessages.defaultProps={
    messageType: 'error'
}

export default FormMessages
