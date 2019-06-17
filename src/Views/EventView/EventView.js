import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AppContext from '../../context'
import { appUrls, requestUrls } from '../../urls'
import ContextMenu from '../../components/ContextMenu/MenuItemList'
import Members from '../../components/Members/Members'
import EventHeader from '../../components/EventHeader/EventHeader';
import SmallIconButton from '../../components/Button/SmallIconButton'
import { FiSettings } from 'react-icons/fi'
import Page404 from '../Page404/Page404';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import AddUser from '../../components/AddUser/AddUser';


class EventView extends Component {
    state={
        isAddMemberOpen: false,
        isMenuOpen: false,
        name: '',
        group: '',
        description: '',
        skiArena: '',
        isCurrent: false,
        startDate: '',
        endDate: '',
        members: [
            //{ name: 'madoranges', image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'} , 
        ],
        eventFound: true,
        isLoading: false,
        isMember: false,
        isOwner: false,
    }

    eventData={
        id: window.location.pathname.replace(appUrls.EVENT, ''),
        owner: '',
    }

    availableSettings=[]

    setAvailableSettings = () => {
        if (this.state.isOwner) {
            this.availableSettings = [
                {
                    name: 'Usuń wydarzenie',
                    onClick: this.deleteEvent
                },
                {
                    name: 'Edytuj dane wydarzenia',
                    onClick: this.toggleEditEventModal
                }
            ]
        } else if (!this.state.isMember) {
            this.availableSettings = [
                {
                    name: 'Dołącz do wydarzenia',
                    onClick: this.joinEvent
                }
            ]
        }
        else {
            this.availableSettings = [
                {
                    name: 'Opuść wydarzenie',
                    onClick: this.leaveEvent
                }
            ]
        }
    }

    joinEvent = () => {
        fetch('/api/addMemberToEvent', {
            method: "POST",
            body: JSON.stringify({
                event: this.eventData.id,
                person: this.context.user.username,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.updateEventData()
                } else {
                    alert('coś poszło nie tak')
                }
            })
    }

    leaveEvent = () => {
        fetch('/api/removeMemberFromEvent',{
            method: "POST",
            body: JSON.stringify({
                event: this.eventData.id,
                person: this.context.user.username,
            }),
            headers:{
                "Content-Type": "application/json",
            }
        })
            .then(res=>{
                if (res.status===200){
                    this.props.history.push('/group/'+this.state.group)
                }else{
                    alert('coś poszło nie tak')
                }
            })
    }

    toggleSettings = () => {
        this.setAvailableSettings()
        this.setState(prev => ({
            isMenuOpen: !prev.isMenuOpen,
        }))
    }

    toggleAddMemberModal = () => {
        this.setState(prev => ({
            isAddMemberOpen: !prev.isAddMemberOpen,
        }))
    }
    toggleEditEventModal = () => {

    }

    deleteEvent = () => {
        var result = window.confirm('Na pewno chcesz usunąć wydarzenie?')
        if (result) {
            fetch(requestUrls.DELETE_EVENT, {
                method: "POST",
                body: JSON.stringify({ eventId: this.eventData.id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        alert('Usunęliśmy Twoje wydarzenie')
                        this.props.history.push(appUrls.ROOT)
                    }
                    else {
                        alert('Wystąpił błąd, spróbuj ponownie później')
                    }
                })
        }
    }

    deleteUser = (username) => {
        fetch(requestUrls.DELETE_FROM_EVENT, {
            method: "POST",
            body: JSON.stringify({
                event: this.eventData.id,
                person: username

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.updateEventData()
                } else {
                    alert('cos poszło nie tak, spróbuj ponownie później')
                }
            })
    }

    updateEventData = () => {
        this.setState({
            isLoading: true
        })
        fetch(requestUrls.GET_EVENT_ID,{
            method: "POST",
            body: JSON.stringify({eventId: this.eventData.id}),
        headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res=>{
            this.setState({
                isLoading: false
            })
            if(res.status===200){
                
                return res.json()
            }else{
                this.setState({
                    eventFound: false 
                })
                throw new Error('Not Found')
            }
        })
        .then(([data])=>{
            
            let members = []
            for (let i = 0; i < data.members.length; i++) {
                members = [...members, { name: data.members[i], image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9' }]
            }
            this.eventData.owner=data.owner
            
            this.setState({
                name: data.name,
                group: data.group,
                description: data.description,
                skiArena: data.skiArena,
                isCurrent: data.isCurrent,
                startDate: data.startDate,
                endDate: data.endDate,
                members: members,
                isOwner: this.eventData.owner === this.context.user.username,
                isMember: !!members.filter(el => el.name === this.context.user.username).length
                
            })
        })
        .catch(err=>null)
        // console.log(this.eventData.id)
    }

    componentDidMount(){
        this.updateEventData()
        this.setAvailableSettings()
    }
    //join event
    //leave event
    //delete member
    //toggle setings
    //edit data modal

    render(){
        const context = {
            otherMembers: this.state.members,
            name: this.state.name,
            owner: this.eventData.owner,
            isOwner: this.state.isOwner,
            isPrivate: this.state.isPrivate,
            description: this.state.description,
            addMember: this.toggleAddMemberModal,
            username: this.context.user.username,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            updateEventData: this.updateEventData
        }
        return(
            this.state.isLoading ? <Loader /> :
            (!this.state.eventFound) ?
                (<Page404 />
                ) : (
                <AppContext.Provider value={context}>
                    <EventHeader />
                    <Members 
                        title='Wezmą udział:'
                    />
                    <SmallIconButton
                        type='fixed'
                        onClick={this.toggleSettings}
                    ><FiSettings /></SmallIconButton>
                    {this.state.isAddMemberOpen && <Modal eventId={this.eventData.id} closeModalFn={this.toggleAddMemberModal} render={AddUser} />}
                    {this.state.isMenuOpen && <ContextMenu items={this.availableSettings} onClick={this.toggleSettings} />}
                </AppContext.Provider>
        ))
    }
}
//props?
EventView.contextType=AppContext
export default withRouter(EventView)
