import React, { Component } from 'react'
import AddGroupButton from '../../components/AddGroup/AddGroupButton'
import styles from './GroupsView.module.scss'
import AddGroupModal from '../../components/AddGroup/AddGroupModal'
import GroupList from '../../components/GroupList/GroupList'


class GroupsView extends Component {

    state={
        isModalOpen: false,
        groups: [
            
        ],
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

    componentDidMount(){
        fetch('/api/groups')
        .then(res=>{
            if(res.status===200){
                return res.json()
            }else{
                throw new Error('no data')
            }
        })
        .then(data=>{
            if(data && data.length>0)
            {
                this.setState({
                    groups: data
                })
            }
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
                <GroupList 
                    groups={this.state.groups}
                />
            </div>
        )
    }
}

export default GroupsView
