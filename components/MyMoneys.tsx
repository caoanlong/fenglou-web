import React from "react"
import Money from "../types/Money"
import Empty from "./Empty"
import MyMoneyItem from "./MyMoneyItem"

type MyMoneysProps = {
    moneys?: Money[]
}

function MyMoneys({ moneys }: MyMoneysProps) {
    return (
        <>
            { 
                moneys 
                ? moneys.map((money: Money) => <MyMoneyItem key={money.id} money={money}/>)
                : <Empty />
            }
        </>
    )
}

export default MyMoneys