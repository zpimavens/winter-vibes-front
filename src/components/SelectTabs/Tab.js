import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Tab.module.scss'

class Tab extends Component {

  onClick = () => {
    const { label, onClick } = this.props
    this.props.setType()
    onClick(label)
  }

  render() {
    const { onClick, props: { activeTab, label } } = this

    let className = styles.tab

    if (activeTab === label) {
      className = styles.tabActive
    }

    return (
      <li 
        className={className}
        onClick={onClick}
      >
        {label}
      </li>
    )
  }
}
Tab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
export default Tab
