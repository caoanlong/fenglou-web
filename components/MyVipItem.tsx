import dayjs from "dayjs"
import Vip from "../types/Vip"

type MyVipItemProps = {
    vip: Vip
}

function MyVipItem({ vip }: MyVipItemProps) {
    return (
        <div className="flex p-4 border border-pink-500 bg-pink-500 bg-opacity-10 rounded-lg overflow-hidden mb-3">
            <h1 className="flex-1 text-pink-500 font-bold text-xl">{vip.validDays}天VIP</h1>
            <p className="flex-2 text-pink-400 text-right text-base">
                {dayjs(dayjs(vip.startTime).valueOf() + vip.validDays * 86400000).format('YYYY-MM-DD HH:mm:ss')} 到期
            </p>
        </div>
    )
}

export default MyVipItem