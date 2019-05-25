import React from 'react'
import PropTypes from 'prop-types'
import MemberListItem from './MemberListItem'
import styles from './MemberList.module.scss'

const MemberList = ({ members })=>{

    return(
        members.length ? 
        <>
        <h5>Członkowie grupy:</h5>
        <ul
            className={styles.container}
        >
            {members.map(member=>(
                <MemberListItem 
                    name={member.name}
                    key={member.name}
                    image={member.image}
                /> 
            ))}
        </ul>
        </>
        :
        <p>nie ma innych membersow</p>
    )
}
MemberList.propTypes={
    members: PropTypes.array
}
export default MemberList
