import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import Post from '../types/Post'
import Tag from '../types/Tag'

type PostItemProps = {
    post: Post,
    isInShadow?: boolean
}

function PostItem({ post, isInShadow }: PostItemProps) {
    const tags: Tag[] = []
    if (post.tagNames) {
        const list = post.tagNames.split(',')
        list.forEach((item: string) => {
            const [ tagId, tagName ] = item.split(':')
            tags.push({ id: +tagId, name: tagName })
        })
        post.tagList = tags
    }
    return (
        <Link href={`/detail/${post.id}`}>
            <a 
                className={`bg-white block overflow-hidden rounded-lg relative ${isInShadow ? 'dark:bg-black' : 'dark:bg-gray-900 shadow-md'}`} 
                title={post.title}>
                <div className="aspectration" data-ratio="4:3">
                    <div 
                        className={`con overflow-hidden ${isInShadow ? 'shadow-md rounded-lg' : ''}`}>
                        <LazyLoadImage
                            className={`h-full w-full object-cover ${isInShadow ? '' : 'rounded-t-lg'}`}
                            src={post.image.startsWith('http') ? post.image : process.env.site_url + post.image} 
                            alt={post.title}>
                        </LazyLoadImage>
                    </div>
                </div>
                <div className="p-3 leading-relaxed">
                    <h3 className="text-gray-700 dark:text-gray-400 truncate text-sm sm:text-base">
                        {post.title}
                    </h3>
                    <p className="mt-1 text-gray-400 dark:text-gray-600 text-xs sm:text-sm">
                        {post.cityName}
                    </p>
                    <div className="clearfix">
                        {
                            post.tagList.map((tag: Tag) => (
                                <div 
                                    key={tag.id}
                                    className="mt-2 float-left text-xs text-pink-500 dark:text-pink-300 border border-pink-500 dark:border-pink-400 bg-pink-100 dark:bg-pink-700 px-1 mr-2 rounded">
                                    {tag.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default PostItem