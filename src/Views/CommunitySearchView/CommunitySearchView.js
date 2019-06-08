import React, { Component } from 'react'
import { requestUrls } from '../../urls'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Button/Button'
import UsersList from '../../components/UsersList/UsersList'
import Loader from '../../components/Loader/Loader'
import Tabs from '../../components/SelectTabs/Tabs';
import styles from './CommunitySearchView.module.scss'
import GroupList from '../../components/GroupList/GroupList';

class CommunitySearchView extends Component {
    state={
        dataFound: [],
        name: '',
        message: 'Wpisz nazwę i wciśnij "Szukaj"',
        searchType: 'user',
    }

    handleInputChange = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value   
        })
    }

    clearPreviousData=()=>{
        this.setState({
            message: 'Wpisz nazwę i wciśnij "Szukaj"',
            dataFound: []
        })
    }
    
    changeSearchType=(type)=>{
        this.setState({
            searchType: type
        })
        this.clearPreviousData()
    }

    getSearchedUsers = (url)=>{
         
        this.clearPreviousData()

        fetch(url)
        .then(response => {
            if (response.status === 200){
                return response.json()
            }
            else if(response.status === 404){
                this.setState({
                    message: 'Nic nie znaleźliśmy. Zmień parametry i spróbuj ponownie.'
                })
            }
            else{
                this.setState({
                    message: 'Coś poszło nie tak. Spróbuj ponownie później.'
                })
            }
        })
        .then((data) => {
            if( data && data.length > 0 )
                this.setState({
                    dataFound: data
                })
            else
                this.setState({
                    message: 'Nic nie znaleźliśmy. Zmień parametry i spróbuj ponownie.',
                })
        })
        }


    handleSearch=(e)=>{
        e.preventDefault()
        const name = this.state.name
        if(this.state.searchType==='user'){
            this.getSearchedUsers(requestUrls.SEARCH_USER+name)
        }
        else
            this.getSearchedUsers(requestUrls.SEARCH_GROUP+name)
    }

    renderForm(type){
        return(
            <form className={styles.form}>
                <Input
                    name='name'
                    placeholder={type==='user' ? 'Szukaj użytkowników...' : 'Szukaj grup...'}
                    value={this.state.name}
                    onChange={this.handleInputChange}
                />
                <Button
                    onClick={this.handleSearch}
                >Szukaj</Button>
            </form>
        )
    }
    renderOutput(){
        if (!this.state.dataFound || this.state.dataFound.length <= 0) {
            return this.state.message === '' ? <Loader /> : <p>{this.state.message}</p>
        } else {
            switch(this.state.searchType){
                case 'user':
                    return <UsersList users={this.state.dataFound} />
                case 'group':
                    return <GroupList groups={this.state.dataFound} />
                default:
                    break;
        }
        }
    }

    render(){
        return(
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <Tabs>
                        <div label="UŻYTKOWNICY" setType={()=>this.changeSearchType('user')}>
                            {this.renderForm('user')}
                        </div>

                        <div label="GRUPY" setType={() => this.changeSearchType('group')}>
                            {this.renderForm('group')}
                        </div>
                    </Tabs>
                </div>
                {this.renderOutput()}
            </div>
        )
    }
}
export default CommunitySearchView
