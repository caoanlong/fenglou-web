import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import Vod from '../types/Vod'

type VodItemProps = {
    vod: Vod,
    isInShadow?: boolean
}

function VodItem({ vod, isInShadow }: VodItemProps) {
    return (
        <Link href={`/detail/${vod.vodId}`}>
            <a 
                className={`bg-white overflow-hidden ${isInShadow ? 'dark:bg-black' : 'dark:bg-gray-900 shadow-md rounded-lg'}`} 
                title={vod.vodName}>
                <div className="aspectration" data-ratio="4:3">
                    <div className={`con overflow-hidden ${isInShadow ? 'shadow-md rounded-lg' : ''}`}>
                        <LazyLoadImage
                            className={`h-full w-full object-cover ${isInShadow ? '' : 'rounded-t-lg'}`}
                            src={vod.vodPic.startsWith('http') ? vod.vodPic : process.env.site_url + '/' + vod.vodPic} 
                            alt={vod.vodName}>
                        </LazyLoadImage>
                    </div>
                </div>
                <div className="p-3 leading-relaxed">
                    <h3 className="text-gray-700 dark:text-gray-400 truncate text-sm sm:text-base">{vod.vodName}</h3>
                    <p className="text-gray-400 dark:text-gray-600 text-xs sm:text-sm">{vod.vodClass}</p>
                </div>
            </a>
        </Link>
    )
}

export default VodItem