import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import Post from '../types/Post'
import Tag from '../types/Tag'

type SearchItemProps = {
    post: Post,
    index: number
}

function SearchItem({ post, index }: SearchItemProps) {
    return (
        <Link href={`/detail/${post.id}`}>
            <a className={`flex h-36 sm:h-52 p-4 ${index !== 0 ? 'border-t border-gray-200 dark:border-gray-800' : ''}`}>
                <div className="w-32 sm:w-60 rounded-lg relative overflow-hidden">
                    <LazyLoadImage
                        className="h-full w-full object-cover"
                        src={post.image.startsWith('http') ? post.image : process.env.site_url + post.image} 
                        alt={post.title}>
                    </LazyLoadImage>
                </div>
                <div className="flex-1 pl-4 overflow-hidden">
                    <h1 className="text-base sm:text-xl text-gray-700 dark:text-gray-300">
                        {post.title}
                    </h1>
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

export default SearchItem