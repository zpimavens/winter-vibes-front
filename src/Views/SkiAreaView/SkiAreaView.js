import React, { Component } from 'react'
import { requestUrls } from '../../urls'
import Routes from '../../components/SkiArea/Routes'
import Lifts from '../../components/SkiArea/Lifts'
import Conveniences from '../../components/SkiArea/Conveniences'
import Loader from '../../components/Loader/Loader'
import styles from './SkiAreaView.module.scss'
import image from '../../assets/images/skiareabg.jpg'
import Button from '../../components/Button/Button';


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
                this.setState({
                message: 'Coś poszło nie tak, spróbuj ponownie później.'
            })
            }
        })
        .then(([data])=>{
            if(data)
            this.setState({
                message: '',
                area : data,
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
                <h2>{name}</h2>
                <h3>{country.toUpperCase()}</h3>
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
                    onClick={()=>alert('Coming soon!')}
                >
                    UTWÓRZ WYDARZENIE Z TĄ ARENĄ
                </Button>
        </div>
        )
    }
} 
export default SkiArea
