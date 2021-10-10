import { useEffect, useRef, useState } from "react"

export type Seg = {
    id: number,
    path?: string,
    name: string
}

type SegementProps = {
    list: Seg[],
    active: Seg,
    onChange: (item: Seg) => void
}

function Segement({ list, active, onChange }: SegementProps) {
    const segContainer = useRef<HTMLDivElement>(null)
    const [ slideWidth, setSlideWidth ] = useState(0)
    const [ idx, setIdx ] = useState(0)

    useEffect(() => {
        if (segContainer.current?.offsetWidth) {
            setSlideWidth(segContainer.current?.offsetWidth / list.length - 4)
        }
    }, [])

    useEffect(() => {
        const ids = list.map(item => item.id)
        setIdx(ids.indexOf(active.id))
    }, [active])

    return (
        <div 
            ref={segContainer} 
            className="flex h-8 md:w-64 text-black dark:text-white bg-gray-100 dark:bg-gray-900 rounded-lg cursor-pointer relative">
            {
                list.map((item: Seg) => (
                    <div 
                        onClick={() => onChange(item)}
                        key={item.id}
                        className="flex-1 leading-8 text-center text-sm relative z-10">
                        {item.name}
                    </div>
                ))
            }
            <div 
                className="bg-white dark:bg-gray-600 absolute z-0 rounded-md shadow transition-all duration-300 ease-in-out" 
                style={{width: slideWidth + 'px', height: '28px', top: '2px', left: (slideWidth + 4) * idx + 2 + 'px'}}>
            </div>
        </div>
    )
}

export default Segement