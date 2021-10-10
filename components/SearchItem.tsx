import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import Vod from "../types/Vod"
import VipTag from './VipTag'

type SearchItemProps = {
    vod: Vod,
    index: number
}

function SearchItem({ vod, index }: SearchItemProps) {
    return (
        <div className={`flex h-36 sm:h-52 p-4 ${index !== 0 ? 'border-t border-gray-200 dark:border-gray-800' : ''}`}>
            <div className="w-32 sm:w-60 rounded-lg relative overflow-hidden">
                <VipTag permission={vod.permission} />
                <LazyLoadImage
                    className="h-full w-full object-cover"
                    src={vod.vodPic.startsWith('http') ? vod.vodPic : process.env.site_url + '/' + vod.vodPic} 
                    alt={vod.vodName}>
                </LazyLoadImage>
            </div>
            <div className="flex-1 pl-4 flex flex-col justify-between overflow-hidden">
                <h1 className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 truncate">{vod.vodName}</h1>
                <p className="text-xs sm:text-sm">
                    <span className="text-gray-400">导演：</span>
                    <span className="text-gray-600">内详</span>
                </p>
                <p className="text-xs sm:text-sm">
                    <span className="text-gray-400">主演：</span>
                    <span className="text-gray-600">内详</span>
                </p>
                <p className="text-xs sm:text-sm truncate">
                    <span className="pr-4">
                        <span className="text-gray-400">分类：</span>
                        <span className="text-gray-600">精选</span>
                    </span>
                    <span className="px-4 border-l border-r dark:border-gray-700">
                        <span className="text-gray-400">地区：</span>
                        <span className="text-gray-600">内详</span>
                    </span>
                    <span className="pl-4">
                        <span className="text-gray-400">年份：</span>
                        <span className="text-gray-600">内详</span>
                    </span>
                </p>
                <div className="flex">
                    <Link href={`/play/${vod.vodId}`}>
                        <a className="h-6 sm:h-8 rounded shadow-md flex justify-center items-center px-3 bg-purple-500 text-white text-xs sm:text-sm mr-3">
                            立即播放
                        </a>
                    </Link>
                    <Link href={`/detail/${vod.vodId}`}>
                        <a className="h-6 sm:h-8 rounded shadow-md flex justify-center items-center px-3 bg-gray-200 dark:bg-gray-500 text-xs sm:text-sm">
                            查看详情
                        </a>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default SearchItem