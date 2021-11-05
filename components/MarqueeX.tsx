import { AiFillSound } from "react-icons/ai"
import Marquee from 'react-fast-marquee'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Notice from '../types/Notice'

function MarqueeX() {
    const notices: Notice[] = useSelector((state: RootState) => state.config.notices)
    return (
        <div className="flex items-center h-8 sm:h-11 bg-purple-500 text-white">
            <div className="w-8 sm:w-11 flex justify-center">
                <AiFillSound />
            </div>
            <div className="flex-1 text-xs sm:text-base">
                <Marquee gradient={false}>
                    {
                        notices.map((item: Notice) => (
                            <div key={item.id}>{item.title}</div>
                        ))
                    }
                </Marquee>
            </div>
        </div>
    )
}

export default MarqueeX