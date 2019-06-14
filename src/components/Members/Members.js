import React, { useContext } from 'react'
import AppContext from '../../context'
import MemberList from './MemberList'
import SmallIconButton from '../../components/Button/SmallIconButton'
import { FaPlus } from 'react-icons/fa'
import styles from './Members.module.scss'

const Members = ({ title })=>{
    const context = useContext(AppContext)
    return(
        <div
            className={styles.container}
        >
            <div
                className={styles.containerTop}
            >
                <h4>{title}</h4>
                <SmallIconButton 
                    type='secondary'
                    onClick={context.addMember}
                > 
                    <FaPlus/>
                </SmallIconButton>
            </div>
            <MemberList 
                members={context.otherMembers}
                owner={context.owner}
            />
        </div>

    )
}
export default Members
