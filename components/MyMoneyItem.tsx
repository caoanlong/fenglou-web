import Money from "../types/Money"

type MyMoneyItemProps = {
    money: Money
}

function MyMoneyItem({ money }: MyMoneyItemProps) {
    return (
        <div className="flex p-4 border border-pink-500 bg-pink-500 bg-opacity-10 rounded-lg overflow-hidden mb-3">
            <h1 className="flex-1 text-pink-500 font-bold text-xl">¥{money.price}</h1>
        </div>
    )
}

export default MyMoneyItem