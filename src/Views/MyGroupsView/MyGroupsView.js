import React, { Component } from 'react'
import { requestUrls } from '../../urls'
import { FaPlus } from 'react-icons/fa'
import AppContext from '../../context'
import IconButton from '../../components/Button/SmallIconButton'
import AddGroupModal from '../../components/AddGroup/AddGroupModal'
import GroupList from '../../components/GroupList/GroupList'
import styles from './MyGroupsView.module.scss'


class GroupsView extends Component {

    state={
        isModalOpen: false,
        groups: [
            
        ],
    }
    
    toggleModal=()=>{
        this.setState(prev=>({
            isModalOpen: !prev.isModalOpen
        }))
    }
    closeModal=()=>{
        this.setState({
            isModalOpen: false
        })
    }

    componentDidMount(){
        fetch(requestUrls.GET_USER_GROUPS, {
            method: "POST",
            body: JSON.stringify({ username: this.context.user.username }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
            <div
                className={styles.container}
            >
                <GroupList 
                    groups={this.state.groups}
                />
                <IconButton
                    onClick={this.toggleModal}
                    type='fixed'
                >
                    <FaPlus /> 
                </IconButton>
                {this.state.isModalOpen && 
                    <AddGroupModal 
                        closeModalFn={this.closeModal} 
                    />
                }
            </div>
        )
    }
}
GroupsView.contextType = AppContext; 
export default GroupsView
