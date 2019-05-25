import React from 'react'
import { withRouter } from 'react-router-dom'
import { appUrls } from '../../urls'
import GroupListItem from './GroupListItem'
import styles from './GroupList.module.scss'

const GroupList = ({ groups, history })=>{

    return(
        <div
            className={styles.container}
        >
            {groups.length ? 
                groups.map(group=>(
                    <GroupListItem 
                        key={group._id}
                        {...group}
                        onClick={()=>{history.push(appUrls.GROUP+group._id)}}
                    />

                ))
            :
                null
            }

        </div>
    )
}

export default withRouter(GroupList)