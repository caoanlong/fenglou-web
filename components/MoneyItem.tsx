import Money from "../types/Money"

type MoneyItemProps = {
    money: Money,
    onClick: () => void
}

function MoneyItem({ money, onClick }: MoneyItemProps) {
    return (
        <div className="flex border border-pink-500 bg-pink-500 bg-opacity-10 shadow-md rounded-lg overflow-hidden mb-3">
            <div className="flex-1 p-3">
                <h1 className="text-pink-500 font-bold text-2xl">¥{money.price}</h1>
            </div>
            <div 
                onClick={() => onClick()}
                className="w-24 bg-pink-500 text-white text-xl flex justify-center items-center cursor-pointer">
                充值
            </div>
        </div>
    )
}

export default MoneyItem