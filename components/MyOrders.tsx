import Order from "../types/Order"
import Empty from "./Empty"
import MyOrderItem from "./MyOrderItem"

type MyOrdersProps = {
    orderList: Order[],
    hasMore: boolean,
    onMore: () => void
}

function MyOrders({ orderList, hasMore, onMore }: MyOrdersProps) {

    return (
        <>
            { 
                orderList && orderList.length
                    ? orderList.map((order: Order) => <MyOrderItem key={order.orderId} order={order} />)
                    : <Empty />
            }
            {
                hasMore ?
                <div 
                    onClick={() => onMore()}
                    style={{height: '48px', lineHeight: '48px'}}
                    className="w-full rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400 text-center mt-4 cursor-pointer">
                    加载更多
                </div> : <></>
            }
        </>
    )
}

export default MyOrders