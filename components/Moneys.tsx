import { useDispatch } from "react-redux"
import Money from "../types/Money"
import Empty from "./Empty"
import MoneyItem from "./MoneyItem"

type MoneysProps = {
    list: Money[]
}

function Moneys({ list }: MoneysProps) {
    const dispatch = useDispatch()

    return (
        <>
            { 
                list && list.length
                    ? list.map((money: Money) => (
                        <MoneyItem 
                            key={money.id} 
                            money={money} 
                            onClick={() => {
                                dispatch({ type: 'SET_BUY_MONEY_MODAL', payload: {
                                    showBuyMoney: true, money
                                } })
                            }}
                        />
                    ))
                    : <Empty />
            }
        </>
    )
}

export default Moneys