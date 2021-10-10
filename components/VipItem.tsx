import Vip from "../types/Vip"

type VipItemProps = {
    vip: Vip,
    onClick: () => void
}

function VipItem({ vip, onClick }: VipItemProps) {
    return (
        <div className="flex border border-pink-500 bg-pink-500 bg-opacity-10 shadow-md rounded-lg overflow-hidden mb-3">
            <div className="flex-1 p-3">
                <h1 className="text-pink-500 font-bold text-2xl">{vip.validDays}天VIP</h1>
                <p className="text-pink-400">¥{vip.price}</p>
            </div>
            <div 
                onClick={() => onClick()}
                className="w-24 bg-pink-500 text-white text-xl flex justify-center items-center cursor-pointer">
                购买
            </div>
        </div>
    )
}

export default VipItem