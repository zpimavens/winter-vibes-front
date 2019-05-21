import React from 'react'
import GroupListItem from './GroupListItem'

const GroupList = ({ groups })=>{

    return(
        <div>
            {groups.length ? 
                groups.map(group=>(
                    <GroupListItem 
                        key={group.id}
                        {...group}
                    />

                ))
            :
                null
            }

        </div>
    )
}

export default GroupList