import React, { Component } from 'react'
import styles from './SkiAreaView.module.scss'
import Routes from '../../components/SkiArea/Routes';
import Lifts from '../../components/SkiArea/Lifts';
import Conveniences from '../../components/SkiArea/Conveniences'
import image from '../../assets/images/skiareabg.jpg'
import Button from '../../components/Button/Button';


class SkiArea extends Component {

    state = {
        _id: { $oid: "5cc7b821592dbc8f51e0837c" },
        name: "Brixen im Thale - SkiWelt",
        description: "WOW! SUCH GREAT OFFERS",
        country: "Austria",
        openHours: "08:30 - 16:00",
        easyRoute: "122 km (115)",
        mediumRoute: "129 km (86)",
        hardRoute: "33 km (24)",
        freeride: "1,3 km",
        draglift: 5,
        chairlift: 15,
        gondolas: 4,
        snowpark: ["Boardercross", "Funslopes", "Funparks"],
        school: true,
        nightride: true,
        rental: true,
        website: 'https://www.skiwelt.at/en/brixen-im-thale.html',

    }

    render() {
        const additional = {
            snowpark: this.state.snowpark.length>0,
            school: this.state.school,
            nightride: this.state.nightride,
            rental: this.state.rental,
        }
        return (
            <div className={styles.container}>
                <div
                    className={styles.backgroundImage}
                    >
                    <img 
                        src={image}
                        alt=''
                        />
                </div>
                <h1>{this.state.name}</h1>
                <h2>{this.state.country.toUpperCase()}</h2>
                <h3>
                    GODZINY OTWARCIA:  {this.state.openHours}
                </h3>
                <Routes
                easy={this.state.easyRoute}
                medium={this.state.mediumRoute}
                hard={this.state.hardRoute}
                />
                <Lifts 
                    draglift={this.state.draglift}
                    chairlift={this.state.chairlift}
                    gondolas={this.state.gondolas}
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
        );
    }
} 
export default SkiArea
