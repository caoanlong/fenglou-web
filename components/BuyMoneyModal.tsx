import React, { MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import Money from "../types/Money"

function BuyVipModal() {
    const dispatch = useDispatch()
    const currentBuyMoney: Money = useSelector((state: RootState) => state.config.currentBuyMoney)
    const token = useSelector((state: RootState) => state.member.token)
    const href = `/app/member/recharge/${currentBuyMoney.id}/${token}`

    return (
        <div 
            onClick={() => dispatch({ type: 'SET_BUY_MONEY_MODAL', payload: { showBuyMoney: false } })}
            className="w-full h-full fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur flex justify-center items-center">
            <div 
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation()
                }}
                className="w-4/5 sm:w-96 bg-white dark:bg-black rounded-lg p-4">
                <h1 className="text-center text-lg text-black dark:text-gray-200 pb-2">购买信息</h1>
                <div className="flex py-1">
                    <div className="w-20 dark:text-gray-200">价格：</div>
                    <div className="flex-1 text-right text-gray-600">¥{currentBuyMoney.price}</div>
                </div>
                <div 
                    className="my-3 bg-gray-200 dark:bg-gray-800" 
                    style={{height: '1px'}}>
                 </div>
                <div className="flex justify-center text-lg mb-3">
                    <div className="dark:text-white">合计支付：</div>
                    <div className="text-yellow-500 font-bold">{currentBuyMoney.price}元</div>
                </div>
                <p className="text-yellow-500 text-center mb-3">更多支付方式和免费试用活动请联系在线客服获取</p>
                <p className="text-red-500 text-center mb-3">如获取订单失败，可以重新点击充值获取或者刷新充值页面</p>
                <a 
                    style={{height: '48px', lineHeight: '48px'}}
                    className="w-full block rounded-lg bg-purple-500 text-white text-center" 
                    href={href} target="_blank">
                    支付
                </a>
            </div>
        </div>
    )
}

export default BuyVipModal