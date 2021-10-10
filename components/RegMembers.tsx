import React from "react"
import Member from "../types/Member"
import Empty from "./Empty"
import MemberItem from "./MemberItem"

type RegMembersProps = {
    list: Member[]
}

function RegMembers({ list }: RegMembersProps) {
    return (
        <>
            { 
                list && list.length
                    ? list.map((member: Member) => <MemberItem key={member.memberId} member={member} />)
                    : <Empty />
            }
        </>
    )
}

export default RegMembers