import React, { Component } from 'react'
import { requestUrls } from '../../urls'
import Routes from '../../components/SkiArea/Routes'
import Lifts from '../../components/SkiArea/Lifts'
import Conveniences from '../../components/SkiArea/Conveniences'
import Button from '../../components/Button/Button'
import Loader from '../../components/Loader/Loader';
import styles from './SkiAreaView.module.scss'
import image from '../../assets/images/skiareabg.jpg'


class SkiArea extends Component {

    state = {
        area: {
            id:  "",
            name: "",
            description: "",
            country: "",
            openHours: "",
            easyRoute: "",
            mediumRoute: "",
            hardRoute: "",
            freeride: "",
            dragLift: 0,
            chairLift: 0,
            gondolas: 0,
            snowpark: [],
            skiSchool: '',
            nightRide: false,
            skiRental: '',
        },
        website: 'https://www.skiwelt.at/en/brixen-im-thale.html',
        message: 'loading'
    }

    fetchAreaData = ()=>{
        const path = window.location.pathname.replace('/area/','')

        fetch(requestUrls.GET_AREA_BY_ID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: path }),
        })
        .then(res=>{
            if (res.status === 200) {
                return res.json()

            } else {
                const error = new Error(res.status)
                throw error
            }
        })
        .then(([data])=>{
            this.setState({
                message: '',
                area : data,
            })
        })
        .catch(err=>{
            this.setState({
                message: 'Coś poszło nie tak, spróbuj ponownie później'
            })
        })
    }

    componentDidMount(){
        this.fetchAreaData()
    }

    render() {
        const additional = {
            snowpark: this.state.area.snowpark.length>0,
            skiSchool: this.state.area.skiSchool.length>0,
            nightRide: this.state.area.nightRide,
            skiRental: this.state.area.skiRental.length>0,
        }
        const { name, country, openHours, easyRoute, mediumRoute, hardRoute, dragLift, chairLift, gondolas } = this.state.area
        return (
            this.state.message==='loading'? <Loader/> :
            <div className={styles.container}>
                <div
                    className={styles.backgroundImage}
                    >
                    <img 
                        src={image}
                        alt=''
                    />
                </div>
                <h1>{name}</h1>
                <h2>{country.toUpperCase()}</h2>
                <h3>
                    GODZINY OTWARCIA:  {openHours}
                </h3>
                <Routes
                easy={easyRoute}
                medium={mediumRoute}
                hard={hardRoute}
                />
                <Lifts 
                    dragLift={dragLift}
                    chairLift={chairLift}
                    gondolas={gondolas}
                />
                <Conveniences 
                    additional={additional}
                />
                <Button
                    onClick={()=>(window.open(this.state.website, '_blank'))}
                >
                    Strona główna areny <span>&#10230;</span>
                </Button>
        </div>
        )
    }
} 
export default SkiArea
