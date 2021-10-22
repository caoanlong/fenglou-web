import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import VipTag from './VipTag'
import Post from '../types/Post'

type PostItemProps = {
    post: Post,
    isInShadow?: boolean
}

function PostItem({ post, isInShadow }: PostItemProps) {
    return (
        <Link href={`/detail/${post.id}`}>
            <a 
                className={`bg-white block overflow-hidden rounded-lg relative ${isInShadow ? 'dark:bg-black' : 'dark:bg-gray-900 shadow-md'}`} 
                title={post.title}>
                {/* <VipTag permission={post.permission} /> */}
                <div className="aspectration" data-ratio="4:3">
                    <div 
                        className={`con overflow-hidden ${isInShadow ? 'shadow-md rounded-lg' : ''}`}>
                        <LazyLoadImage
                            className={`h-full w-full object-cover ${isInShadow ? '' : 'rounded-t-lg'}`}
                            src={post.image.startsWith('http') ? post.image : process.env.site_url + '/' + post.image} 
                            alt={post.title}>
                        </LazyLoadImage>
                    </div>
                </div>
                <div className="p-3 leading-relaxed">
                    <h3 className="text-gray-700 dark:text-gray-400 truncate text-sm sm:text-base">{post.title}</h3>
                    <p className="text-gray-400 dark:text-gray-600 text-xs sm:text-sm">{post.cityName}</p>
                </div>
            </a>
        </Link>
    )
}

export default PostItem