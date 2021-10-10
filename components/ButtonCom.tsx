import { FormEventHandler } from "react"

type ButtomComProps = {
    text: string,
    type?: string,
    disabled?: boolean,
    onClick?: FormEventHandler<HTMLButtonElement>,
}

function ButtomCom({ text, type='button', disabled=false, onClick }: ButtomComProps) {
    const btn = () => {
        if (type === 'button') {
            return <button 
                type="button" 
                className={`w-full h-12 rounded-lg bg-purple-500 text-white ${disabled ? 'bg-opacity-50' : ''}`} 
                onClick={onClick} 
                disabled={disabled}>
                {text}
            </button>
        }
        if (type === 'submit') {
            return <button 
                type="submit" 
                className={`w-full h-12 rounded-lg bg-purple-500 text-white ${disabled ? 'bg-opacity-50' : ''}`}
                disabled={disabled}>
                {text}
            </button>
        }
        return <button 
            type="button" 
            className={`w-full h-12 rounded-lg bg-purple-500 text-white ${disabled ? 'bg-opacity-50' : ''}`} 
            onClick={onClick} 
            disabled={disabled}>
            {text}
        </button>
    }
    return btn()
}

export default ButtomCom