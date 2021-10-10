import React from "react"
import { IoChevronForwardOutline } from "react-icons/io5"

type CellItemProps = {
    label: string,
    value?: string
}

function CellItem({ label, value }: CellItemProps) {
    return (
        <div 
            className="flex" 
            style={{
                height: '50px',
                lineHeight: '50px'
            }}>
            <div className="w-16 text-black dark:text-gray-400">{label}</div>
            <div className="flex-1 text-right text-gray-400">{value || ''}</div>
            <div className="w-8 flex justify-end items-center text-gray-400">
                <IoChevronForwardOutline />
            </div>
        </div>
    )
}

export default CellItem