import Order from "../types/Order"

type MyOrderItemProps = {
    order: Order
}

const STAUS_MAP: { [key: number]: { style: string, text: string } } = {
    1: { style: 'text-yellow-500', text: '确认中' },
    2: { style: 'text-green-500', text: '完成' },
    3: { style: 'text-red-500', text: '失败' }
}
const TYPE_MAP: { [key: number]: string } = {
    1: '充值',
    2: '提现',
    3: '佣金'
}
function MyOrderItem({ order }: MyOrderItemProps) {
    return (
        <div className="flex p-3 bg-white dark:bg-gray-900 shadow-md rounded-lg mb-4">
            <div className="flex-1">
                <h1 className="text-black dark:text-gray-100">{order.title}</h1>
                <p className="text-sm text-gray-400">类型：{TYPE_MAP[order.type]}</p>
                <p className="text-sm text-gray-400">订单号：{order.orderNo}</p>
                <p className="text-sm text-gray-400">创建时间：{order.createTime}</p>
            </div>
            <div 
                className={`w-14 flex items-center ${STAUS_MAP[order.status].style}`}>
                {STAUS_MAP[order.status].text}
                </div>
        </div>
    )
}

export default MyOrderItem