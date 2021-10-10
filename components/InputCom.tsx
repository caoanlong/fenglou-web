import { ChangeEventHandler, FocusEventHandler } from "react"

type InputComProps = {
    name: string,
    value: string,
    type?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onBlur?: FocusEventHandler<HTMLInputElement>,
    onFocus?: FocusEventHandler<HTMLInputElement>,
    placeholder?: string,
    tips?: JSX.Element,
    left?: JSX.Element,
    right?: JSX.Element
}

function InputCom({ 
    name, 
    value, 
    type, 
    onChange, 
    onBlur, 
    onFocus, 
    placeholder, 
    tips,
    left,
    right
}: InputComProps) {
    return (
        <>
        <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg h-12">
            {
                left ? <div className="w-20">{left}</div> : <></>
            }
            <div className="flex-1">
                <input 
                    style={{background: 'none'}}
                    className="w-full h-full outline-none px-2 text-base text-black dark:text-white"
                    name={name} 
                    value={value} 
                    type={type || 'text'} 
                    pattern={type === 'number' ? '\\d*' : '^[a-zA-Z0-9@.-]+$'}
                    placeholder={placeholder || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            </div>
            {
                right ? <div className="w-24">{right}</div> : <></>
            }
        </div>
        <div className="h-6 text-xs text-red-500">{tips}</div>
        </>
    )
}

export default InputCom