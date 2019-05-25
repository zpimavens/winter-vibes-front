import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { appUrls } from '../../urls'
import AppContext from '../../context';
// import Button from '../../components/Button/Button';
import MemberList from '../../components/MemberList/MemberList'
import EventList from '../../components/EventList/EventList'
import SmallIconButton from '../../components/Button/SmallIconButton'
import { FiSettings } from 'react-icons/fi'

class GroupView extends Component{


    groupData = {
        id : window.location.pathname.replace(appUrls.GROUP, ''),
        name: 'Janusze cebularze',
        description: 'Jeździmy po taniości i skąpimy kasy na wszystko',
        owner: 'madoranges',
        isPrivate: false,
        otherMembers: [
            {
                name: 'ola2323',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
            {
                name: 'moniczka3425',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
            {
                name: 'xerw4555',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
            {
                name: 'destroyer21',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
            {
                name: 'sprobujzgadnackto',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
            {
                name: 'szukamdziewczyny33',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
            {
                name: 'tosix23',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
            {
                name: 'karrrambaa',
                image: 'https://images.unsplash.com/photo-1556780547-25b93bd93f38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9'
            },
        ],
        currentEvents: [
            {
                id: 'wfnoifenwoi34isefgtrh',
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

    showSettings=()=>{
        //delete group
        //change admin
        //modify group data
    }

    addMember=()=>{

    }

    deleteMember=(e)=>{
        // e.target.name, on hold or rightclick
    }

    addEvent=()=>{
        
    }

    removeEvent=()=>{
        //only if u r owner of the group
    }

    deleteGroup=()=>{
        var result = window.confirm('Na pewno chcesz usunąć grupę?')
        if(result){
            //delete group
            alert('Usunęliśmy Twoją grupę')
            this.props.history.push(appUrls.ROOT)
        }
    }

    componentDidMount(){
        //fetch data from db
    }

    render(){
        return(
            <AppContext.Consumer >
                {(context)=>(
                    <>
                    <h3>{this.groupData.name}</h3>
                    <p>{this.groupData.description}</p>
                    <p>Właściciel: {this.groupData.owner}</p>
                    <p>Grupa{ this.groupData.isPrivate ? ' zamknięta' : ' otwarta'}</p>
                    <MemberList
                        members={this.groupData.otherMembers}
                    />
                    <EventList 
                        type='current'
                        events={this.groupData.currentEvents}
                    />
                    <EventList 
                        type='past'
                        events={this.groupData.pastEvents}
                    />
                    <SmallIconButton ><FiSettings/></SmallIconButton>
                    {/* {context.user.username === this.groupData.owner && <Button onClick={this.deleteGroup}>usun grupke</Button>} */}
                    
                    </>
                )}
            </AppContext.Consumer>
        )
    }
}

export default withRouter(GroupView)
