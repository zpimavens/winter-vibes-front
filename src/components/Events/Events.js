import React from 'react'
import AppContext from '../../context'
import EventList from './EventList'
import SmallIconButton from '../../components/Button/SmallIconButton'
import { FaPlus } from 'react-icons/fa'
import styles from './Events.module.scss'

const Events = ()=>{

    return(

        <AppContext.Consumer>
            {context=>(
                <div
                    className={styles.container}
                >
                    <div className={styles.containerTop}>
                        <h5>Nadchodzące wydarzenia:</h5>
                        <SmallIconButton 
                                type='secondary'
                                onClick={context.addEvent}
                            > 
                                <FaPlus/> 
                        </SmallIconButton>
                    </div>
                    <EventList 
                        events={context.currentEvents}
                    />
                    <h5>Przeszłe wydarzenia:</h5>
                    <EventList 
                        events={context.pastEvents}
                    />
                </div>
            )}
        </AppContext.Consumer>
    )
}

export default Events
