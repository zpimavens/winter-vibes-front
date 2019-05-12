import React from 'react'
import GroupItem from './GroupItem';
import styles from './GroupList.module.scss'

const GroupList = ({ groups }) =>(

    <div>
        <ul className={styles.wrapper}>
            {groups.map(group =>
                <GroupItem
                    name={group.name}
                    key={group.id}
                    id={group.id}
                    members={group.members}
                    events={group.events}
                />
            )}
        </ul>
    </div>

)

export default GroupList