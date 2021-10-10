import React from "react"
import Vip from "../types/Vip"
import Empty from "./Empty"
import MyVipItem from "./MyVipItem"

type MyVipsProps = {
    vips?: Vip[]
}

function MyVips({ vips }: MyVipsProps) {
    return (
        <>
            { 
                vips 
                ? vips.map((vip: Vip) => <MyVipItem key={vip.vipId} vip={vip}/>)
                : <Empty />
            }
        </>
    )
}

export default MyVips