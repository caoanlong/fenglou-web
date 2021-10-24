import { GetServerSideProps } from "next"
import { useSelector } from "react-redux"
import Link from "next/link"
import SEO from '../../components/SEO'
import { RootState } from "../../store"
import React from "react"
import { IoChevronForwardOutline } from "react-icons/io5"
import PostApi from "../../services/PostApi"
import Post from "../../types/Post"
import Tag from "../../types/Tag"
import PostItem from "../../components/PostItem"


type DetailProps = {
    post: Post,
    likeList: Post[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const id: number = Number(query.postId)
    const resById = await PostApi.findById({ id })
    const post: Post = resById?.data?.data
    let tagIds
    if (post.tagList && post.tagList.length) {
        tagIds = post.tagList.map((tag: Tag) => tag.id).join(',')
    }
    
    const resLike = await PostApi.findYouLike({ cityId: post.cityId, tagIds, num: 12 })
    
    return {
        props: {
            post,
            likeList: resLike?.data?.data
        }
    }
}

function Detail({ post, likeList }: DetailProps) {
    const seo = useSelector((state: RootState) => state.config.seo)

    return (
        <main>
            <SEO 
				title={`${post.title}-${seo?.seoTitle}`} 
				description={`${post.title},${seo?.seoDescription}`} 
				canonical={process.env.site_url} 
                image={{
                    url: post.image.includes('http') ? post.image : process.env.site_url + '/' + post.image,
                    alt: post.title + '-' + seo?.seoTitle
                }}
			/>
            <div className="container py-4">
                <div className="bg-white dark:bg-black shadow p-3 sm:rounded-lg lg:p-5">
                    <div className="text-xs text-gray-400 dark:text-gray-600 mb-2 sm:text-sm sm:mb-4">
                        <span>当前位置：</span>
                        <Link href="/">
                            <a className="text-gray-700 dark:text-gray-400 px-1">首页</a>
                        </Link>
                        <IoChevronForwardOutline 
                            style={{ top: '-2px' }}
                            className="text-gray-400 relative inline-block"
                        />
                        <Link href={`/list/${post.provinceId}/${post.cityId}`}>
                            <a className="text-gray-700 dark:text-gray-400 px-1">{post.cityName}</a>
                        </Link>
                        <IoChevronForwardOutline 
                            style={{ top: '-2px' }}
                            className="text-gray-400 relative inline-block"
                        />
                        <span className="pl-1">{post.title}</span>
                    </div>
                    <h1 className="text-lg sm:text-2xl my-4 dark:text-gray-400">{post.title}</h1>
                    <div 
                        dangerouslySetInnerHTML={{
                            __html: post.content
                        }} 
                    />
                </div>
                <div className="bg-white dark:bg-black shadow p-3 my-4 sm:rounded-lg">
                    <h1 className="text-lg py-2 dark:text-gray-400">猜你喜欢</h1>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {
                            likeList?.map((item: Post) => (
                                <PostItem post={item} isInShadow={true} key={item.id}></PostItem>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Detail