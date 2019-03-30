import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import UsersList from '../../components/UsersList/UsersList';
import styles from './SearchView.module.scss';

class SearchView extends Component {
    
    state={
        usersFound: [
            {
                username: 'SiematuArek',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'supernarty',
            },
            {
                username: 'taniakapusta',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'sanki',

            },
            {
                username: 'pogromca',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'renault clio 3',

            },
            {
                username: 'tomek44',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'szybkie nartki fajne',

            },
            {
                username: 'kasia23',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'jabuszko',
            },
            {
                username: 'SiematuDarek',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'traktor',
            },
            {
                username: 'SiematuMarek',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'lime s',

            },
            {
                username: 'marekzGrabiny',
                image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                skill: '70',
                skis: 'krzesło',

            },
        ],
        userSearch: '',
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState(prevState=>({
            [name]: value,
            usersFound: prevState.usersFound,
        }));
    }

    handleSearch=(e)=>{
        e.preventDefault();
        this.setState({
            usersFound: [
                {
                    username: 'SiematuArek',
                    image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                    skill: '70',
                    skis: 'supernarty',

                },
                {
                    username: 'taniakapusta',
                    image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                    skill: '70',
                    skis: 'supernarty',

                },
                {
                    username: 'pogromca',
                    image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                    skill: '70',
                    skis: 'supernarty',

                },
                {
                    username: 'SiematuMarek',
                    image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                    skill: '70',
                    skis: 'supernarty',

                },
                {
                    username: 'marekłowcaszparek',
                    image: 'https://source.unsplash.com/_8h7TrklnHQ/200x200',
                    skill: '70',
                    skis: 'supernarty',

                },
            ],
            userSearch: '',
        })
        // fetch('/api/getUserByLogin', {
        //     method: "POST",
        //     body: JSON.stringify(this.state.userSearch)
        // }).then(res=>{
        //     if(res.status===200){
        //         const data = res.json();
        //         console.log(data);
        //         // this.setState({
        //         //     usersFound: data,
        //         // })
        //     }else{
        //         throw new Error(res.status);
        //     }
        // }).catch(err=>{
        //     console.error(err);
        // })
        //-------------------------------
        //fetch from db
        //add to state
        //async -> display users when found
    }

    render(){
        return(
            <div className={styles.wrapper}>
            <form>
                <Input
                    name='userSearch'
                    placeholder='Szukaj użytkowników...'
                    onChange={this.handleInputChange}
                />
                <Button 
                    clickFn={this.handleSearch}
                >Szukaj</Button>
            </form>
                <UsersList 
                    users={this.state.usersFound}
                />
            </div>

        )
    }
}


export default SearchView;