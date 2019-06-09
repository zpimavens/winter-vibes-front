import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { appUrls, requestUrls } from '../../urls'
import AppContext from '../../context'
import GroupHeader from '../../components/GroupHeader/GroupHeader'
import Members from '../../components/Members/Members'
import Events from '../../components/Events/Events'
import ContextMenu from '../../components/ContextMenu/MenuItemList'
import SmallIconButton from '../../components/Button/SmallIconButton'
import Loader from '../../components/Loader/Loader'
import EditGroup from '../../components/EditGroupData/EditGroupData'
import AddUser from '../../components/AddUser/AddUser'
import AddEvent from '../../components/AddEvent/AddEvent'
import styles from './GroupView.module.scss'
import { FiSettings } from 'react-icons/fi'
import Modal from '../../components/Modal/Modal'

class GroupView extends Component{

    state={
        isMenuOpen: false,
        isAddMemberOpen: false,
        isEditGroupOpen: false,
        isAddEventOpen: false,
        isDataLoading: false,
        name: '',
        description: '',
        isPrivate: false,
        otherMembers: [],
        currentEvents: [
            {
                id: 'wfnoifenwoi34isefgtrh',
                name: 'fajny iwent',
                date: '2018-03-21',
                destination: 'fajna skiarena',
                participants: ['ola1','ola2']
            },
            {
                id: 'wfnoifenwojefesefgtrh',
                name: 'fajny iwent',
                date: '2018-03-21',
                destination: 'fajna skiarena',
                participants: ['ola1','ola2']
            }
        ],
        pastEvents: [
            {
                id: 'wfnoifenwoi34it3niwfn',
                name: 'mniej fajny iwent',
                date: '2017-03-21',
                destination: 'fajna skiarena',
                participants: ['ola1','ola2','ola1','ola2']
            }
        ],
    }

    groupData = {
        id : window.location.pathname.replace(appUrls.GROUP, ''),
        owner: '',
    }
    availableSettings=[]

    setAvailableSettings=(isOwner, isMember)=>{
        if(isOwner){
            this.availableSettings=[
                {
                    name: 'Usuń grupę',
                    onClick: this.deleteGroup
                },
                {
                    name: 'Edytuj dane grupy',
                    onClick: this.toggleEditGroupModal
                }
        ]
        }else if(!isMember){
            this.availableSettings=[
                {
                    name: 'Dołącz do grupy',
                    onClick: this.joinGroup
                }
            ]
        }
        else{
            this.availableSettings=[
                {
                    name: 'Opuść grupę',
                    onClick: this.leaveGroup
                }
            ]
        }
    }

    joinGroup=()=>{
        fetch(requestUrls.ADD_MEMBER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: this.groupData.id,
                member: this.context.user.username
            })
        })
        .then(res=>{
            if(res.status===200){
                this.updateGroupData()
            }else{
                alert('cos poszlo zle')
            }
        })
    }

    leaveGroup = () => {
        if (window.confirm('na pewno chcesz opuscic grupe?')) {
            this.deleteUser(this.groupData.id, this.context.user.username)
            this.props.history.push(appUrls.ROOT)
        }
    }

    toggleSettings=()=>{
        const isOwner = this.context.user.username===this.groupData.owner
        const isMember = !!this.state.otherMembers.filter(el=>el.name===this.context.user.username).length
        this.setAvailableSettings(isOwner, isMember)
        this.setState(prev=>({
            isMenuOpen: !prev.isMenuOpen
        }))
    }

    deleteUser=(username)=>{
        fetch(requestUrls.DELETE_MEMBER, {
            method: "POST",
            body: JSON.stringify({
                id: this.groupData.id,
                username: username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert('usunięto')
            } else {
                alert('cos poszło nie tak, spróbuj ponownie później')
            }
        })
        this.updateGroupData()
    }

    toggleAddMemberModal=()=>{
        this.setState(prev=>({
            isAddMemberOpen: !prev.isAddMemberOpen,
        }))
    }

    toggleEditGroupModal = () => {
        this.setState(prev => ({
            isEditGroupOpen: !prev.isEditGroupOpen,
        }))
    }

    toggleAddEventModal = () => {
        this.setState(prev => ({
            isAddEventOpen: !prev.isAddEventOpen,
        }))
    }

    removeEvent=()=>{
        //only if u r owner of the group
    }

    deleteGroup=()=>{
        var result = window.confirm('Na pewno chcesz usunąć grupę?')
        if(result){
            fetch(requestUrls.DELETE_GROUP, {
                method: "POST",
                body: JSON.stringify({id:this.groupData.id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>{
                if(res.status===200){
                    alert('Usunęliśmy Twoją grupę')
                    this.props.history.push(appUrls.ROOT)
                }
                else{
                    alert('Błąd podczas usuwania grupy, spróbuj ponownie później')
                }
            })
        }
    }

    updateGroupData=()=>{
        this.setState({
            isDataLoading: true
        })
        fetch(requestUrls.GET_GROUP_BY_ID+this.groupData.id)
        .then(res=>{
            this.setState({
                isDataLoading: false
            })
            if (res.status===200){ return res.json()}
        })
        .then(([data])=>{
            let members=[]
            if(data){
                for(let i=0; i<data.otherMembers.length;i++){
                    members = [...members, { name: data.otherMembers[i], image:'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'}]
                }
                this.groupData.owner = data.owner
                this.setState({
                    name: data.name,
                    description: data.description,
                    isPrivate: data.isPrivate,
                    otherMembers: members,
                    // currentEvents: data.currentEvents,
                    // pastEvents: data.pastEvents,
                })
            }
        })
    }

    componentDidMount(){
        //fetch data from db
        this.updateGroupData(this.groupData.id)
        const isOwner = this.context.user.username===this.groupData.owner
        this.setAvailableSettings(isOwner)

    }

    render(){
        const data={
            username: this.context.user.username,
            ...this.state,
            ...this.groupData,
            addMember: this.toggleAddMemberModal,
            addEvent: this.toggleAddEventModal,
            isOwner: this.context.user.username===this.groupData.owner,
            updateGroupData: this.updateGroupData,
            deleteUser: this.deleteUser,
        }
        return(
            <AppContext.Provider value={data}>
                {this.state.isDataLoading ? <Loader /> :
                <>
                    <GroupHeader/>
                    {this.state.isAddMemberOpen && <Modal groupId={this.groupData.id} closeModalFn={this.toggleAddMemberModal} render={AddUser}/>}
                    {this.state.isEditGroupOpen && <Modal groupId={this.groupData.id} closeModalFn={this.toggleEditGroupModal} render={EditGroup} />}
                    {this.state.isAddEventOpen && <Modal groupId={this.groupData.id} closeModalFn={this.toggleAddEventModal} render={AddEvent} />}

                    <div
                        className={styles.content}
                    >
                        <Members />
                        <Events />
                    </div>
                    <div
                        className={styles.contextMenuWrapper}
                    >
                        <SmallIconButton 
                            type='fixed'
                            onClick={this.toggleSettings}
                        ><FiSettings/></SmallIconButton>
                            {this.state.isMenuOpen && <ContextMenu items={this.availableSettings} onClick={this.toggleSettings}/>}
                    </div>  
                </>
                }                  
            </AppContext.Provider>
        )
    }
}
GroupView.contextType = AppContext
export default withRouter(GroupView)
