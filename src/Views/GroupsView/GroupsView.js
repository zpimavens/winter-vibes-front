import React, { Component } from 'react'
import GroupList from '../../components/GroupList/GroupList';

class GroupsView extends Component {

    state={
        groups: [
        {
            id:'asdfghjkl12345',
            name:'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate:true,
        },
        {
            id: 'asdfghjkl12345',
            name: 'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate: true,
        }, {
            id: 'asdfghjkl12345',
            name: 'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate: true,
        }, {
            id: 'asdfghjkl12345',
            name: 'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate: true,
        }, {
            id: 'asdfghjkl12345',
            name: 'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate: true,
        }, {
            id: 'asdfghjkl12345',
            name: 'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate: true,
        }, {
            id: 'asdfghjkl12345',
            name: 'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate: true,
        }, {
            id: 'asdfghjkl12345',
            name: 'Fajne świry',
            members: ['Kasiakasia', 'olalalla', 'john snow', 'smiesznyser'],
            events: 0,
            isPrivate: true,
        },
    
    ],
    }

    render(){
        return(
            <>
            <GroupList 
               groups={this.state.groups}
            />
            </>
        )
    }
}

export default GroupsView
