import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

class SearchView extends Component {
    
    state={
        usersFound: [

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
        fetch('/api/getUserByLogin', {
            method: "POST",
            body: JSON.stringify(this.state.userSearch)
        }).then(res=>{
            if(res.status===200){
                const data = res.json();
                this.setState({
                    usersFound: data,
                })
            }else{
                throw new Error(res.status);
            }
        }).catch(err=>{
            console.error(err);
        })
        //fetch from db
        //add to state
        //async -> display users when found
    }
    displayFoundUsers=()=>{

    }

    render(){
        return(
            <>
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

            {/* if usersfound.length>0 then display Listofusersfound else null */}
            </>

        )
    }
}


export default SearchView;