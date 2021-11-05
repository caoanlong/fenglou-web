import { GetServerSideProps } from "next"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import Toast from 'light-toast'
import Link from "next/link"
import SEO from '../../components/SEO'
import { RootState } from "../../store"
import { IoChevronForwardOutline } from "react-icons/io5"
import PostApi from "../../services/PostApi"
import Post from "../../types/Post"
import Tag from "../../types/Tag"
import PostItem from "../../components/PostItem"
import ButtomCom from "../../components/ButtonCom"
import { useRouter } from "next/router"


type DetailProps = {
    post: Post,
    likeList: Post[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const id: number = Number(query.postId)
    const resById = await PostApi.findDetail({ id })
    const post: Post = resById?.data?.data
    const tags: Tag[] = []
    let tagIds
    if (post.tagNames) {
        const list = post.tagNames.split(',')
        list.forEach((item: string) => {
            const [ tagId, tagName ] = item.split(':')
            tags.push({ id: +tagId, name: tagName })
        })
        tagIds = tags.map((tag: Tag) => tag.id).join(',')
        post.tagList = tags
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
    const dispatch = useDispatch()
    const router = useRouter()
    const seo = useSelector((state: RootState) => state.config.seo)
    const t = useSelector((state: RootState) => state.member?.token)
    const balance: number = useSelector((state: RootState) => state.member?.balance)
    const [ contactInfo, setContactInfo ] = useState<string>('')
    const [ token, setToken ] = useState<string>(t)

    const getContactInfo = (isShowToast=false) => {
        PostApi.getContactInfo({ id: post.id }).then(res => {
            setContactInfo(res.data.data)
        }).catch(err => {
            isShowToast && Toast.fail(err.data.message)
        })
    }

    useEffect(() => {
        const _t = localStorage.getItem('_t')
        setToken(_t ? _t as string : '')
    }, [])

    useEffect(() => {
        setToken(t)
    }, [t])

    useEffect(() => {
        if (token && post.price === 0) {
            getContactInfo()
        }
    }, [token])
    
    return (
        <main>
            <SEO 
				title={`${post.title}-${seo?.seoTitle}`} 
				description={`${post.title},${seo?.seoDescription}`} 
				canonical={process.env.site_url} 
                image={{
                    url: post.image?.includes('http') ? post.image : process.env.site_url + '/' + post.image,
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
                        className="text-black dark:text-gray-200"
                        dangerouslySetInnerHTML={{
                            __html: post.content
                        }} 
                    />
                    <div className="py-4">
                        <h2 className="font-bold text-pink-500">联系方式</h2>
                        {
                            contactInfo ?
                            <div 
                                className="text-black dark:text-gray-200"
                                dangerouslySetInnerHTML={{
                                    __html: contactInfo
                                }} 
                            /> : (token ? 
                                <div className="w-40 mt-4">
                                    <ButtomCom 
                                        text={`支付${post.price}元查看`} 
                                        onClick={() => {
                                            if (balance >= post.price) {
                                                // 如果Balance充足，则直接调用getContactInfo
                                                getContactInfo(true)
                                            } else {
                                                router.push(`/mine/${token}`)
                                            }
                                        }}
                                    />
                                </div> : 
                                <div className="w-40 mt-4">
                                    <ButtomCom 
                                        text={'请先登录'} 
                                        onClick={() => dispatch({ type: 'SET_LOGIN_MODAL', payload: true })}
                                    />
                                </div>
                            )
                        }
                        
                    </div>
                    
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