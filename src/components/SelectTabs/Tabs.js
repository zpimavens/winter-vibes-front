import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'
import styles from './Tabs.module.scss'

class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label,
  }
  
  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab })

  }

  render() {
    const { onClickTabItem, props: { children }, state: { activeTab } } = this

    return (
      <div>
        <ul className={styles.wrapper}>
          {children.map((child) => {
            const { label, setType } = child.props

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
                setType={setType}
              />
            )
          })}
        </ul>
        <div >
          {children.map((child) => {
            if (child.props.label !== activeTab) return null
            return child.props.children
          })}
        </div>
      </div>
    )
  }
}
Tabs.propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
}
export default Tabs
