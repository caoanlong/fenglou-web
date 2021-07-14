import { MouseEventHandler } from "react"

type SwitchProps = {
    isOpen: boolean,
    text?: string,
    handleChange: MouseEventHandler<HTMLDivElement>
}

function Switch({ text, isOpen = false, handleChange }: SwitchProps) {
    return (
        <div className="flex items-center h-8" onClick={handleChange}>
            {
                text ? <div className="text-sm text-gray-500 mr-2 hidden sm:block">{text}</div> : <></>
            }
            <div className={`w-6 h-3 rounded-xl relative cursor-pointer transition ${isOpen ? 'bg-green-500' : 'bg-gray-400'}`}>
                <div className={`w-4 h-4 bg-white absolute -top-0.5 rounded-full shadow ${isOpen ? '-right-0.5' : '-left-0.5'}`}></div>
            </div>
        </div>
    )
}

export default Switch