import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { appUrls } from '../../urls'
import MemberListItem from './MemberListItem'
import styles from './MemberList.module.scss'

const MemberList = ({ members, owner, history })=>{

    return(
        !!members && members.length  ? 
        <>
        <ul
            className={styles.container}
        >
            {members.map(member=>(
                <MemberListItem 
                    name={member.name}
                    key={member.name}
                    image={member.image}
                    owner={owner}
                    onClick={()=>history.push(appUrls.USER+member.name)}
                /> 
            ))}
        </ul>
        </>
        :
        <p>Brak innych członków</p>
    )
}
MemberList.propTypes={
    members: PropTypes.array,
    owner: PropTypes.string,
}
export default withRouter(MemberList)
