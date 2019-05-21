import React, { Component } from 'react'
import AddGroupButton from '../../components/AddGroup/AddGroupButton'
import styles from './GroupsView.module.scss'
import AddGroupModal from '../../components/AddGroup/AddGroupModal'

class GroupsView extends Component {

    state={
        isModalOpen: false,
    }
    openModal=()=>{
        this.setState({
            isModalOpen: true
        })
    }
    closeModal=()=>{
        this.setState({
            isModalOpen: false
        })
    }


    render(){
        return(
            <div className={styles.container}>
                <AddGroupButton
                    onClick={this.openModal}
                />
                {this.state.isModalOpen && 
                    <AddGroupModal 
                        closeModalFn={this.closeModal} 
                    />
                }
                <p>Cześć! Ta podstrona jest w trakcie produkcji, wpadnij tutaj troszkę później :)</p>
            </div>
        )
    }
}

export default GroupsView
