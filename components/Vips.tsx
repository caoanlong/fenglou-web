import { useDispatch } from "react-redux"
import Vip from "../types/Vip"
import Empty from "./Empty"
import VipItem from "./VipItem"

type VipsProps = {
    vipList: Vip[]
}

function Vips({ vipList }: VipsProps) {
    const dispatch = useDispatch()

    return (
        <>
            { 
                vipList && vipList.length
                    ? vipList.map((vip: Vip) => (
                        <VipItem 
                            key={vip.vipId} 
                            vip={vip} 
                            onClick={() => {
                                dispatch({ type: 'SET_BUY_VIP_MODAL', payload: {
                                    showBuyVip: true, vip
                                } })
                            }}
                        />
                    ))
                    : <Empty />
            }
        </>
    )
}

export default Vips