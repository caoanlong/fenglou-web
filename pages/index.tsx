import { GetServerSideProps } from 'next'
import BannerCom from '../components/Banner'
import SEO from '../components/SEO'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Banner from '../types/Banner'
import Seo from '../types/Seo'
import React, { useEffect, useState } from 'react'
import Notice from '../types/Notice'
import PostApi, { PostFindListParams } from '../services/PostApi'
import Post from '../types/Post'
import PostItem from '../components/PostItem'

type HomeProps = {
    params: PostFindListParams,
	postList: Post[],
	pages: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params: PostFindListParams = {
        pageIndex: 1,
        pageSize: 24
    }

    const resPosts = await PostApi.findList(params)
    const postList: Post[] = resPosts.data.data.list
    const pages: number = resPosts.data.data.pages
    return {
        props: {
            params,
            postList,
			pages
        }
    }
}

function Home({ 
	postList, 
	params,
	pages 
}: HomeProps) {
	const seo: Seo = useSelector((state: RootState) => state.config.seo)
	const banners: Banner[] = useSelector((state: RootState) => state.config.banners)
	// const notices: Notice[] = useSelector((state: RootState) => state.config.notices)

    const [ list, setList ] = useState<Post[]>(postList)
    const [ totalPages, setTotalPages ] = useState<number>(pages)

    const getList = () => {
        params.pageIndex++
        PostApi.findList(params).then(res => {
            if (res.data.data) {
                if (res.data.data.list && res.data.data.list.length) {
                    setList([...list, ...res.data.data.list])
                }
                if (res.data.data.pages) {
                    setTotalPages(res.data.data.pages)
                }
            }
        })
    }
    
    useEffect(() => {
        setList(postList)
    }, [postList])

	return (
		<main>
			<SEO 
				title={`${seo?.seoTitle}`} 
				description={seo?.seoDescription as string} 
				canonical={process.env.site_url} 
			/>
			<BannerCom banners={banners}></BannerCom>
			<div className="container p-4">
				{
                    list.length > 0
                    ? <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {list.map((post: Post) => (<PostItem key={post.id} post={post}/>))}
                    </div>
                    : <div className="w-full h-64 flex justify-center items-center text-gray-400 dark:text-gray-600 text-xl">
                        暂无数据
                    </div>
                }
                {
                    params.pageIndex < totalPages ?
                    <div className="flex justify-center items-center pt-10 text-gray-700 text-sm">
                        <div 
                            onClick={() => getList()}
                            className="bg-white dark:bg-gray-900 px-10 py-2 rounded shadow-md mr-2 cursor-pointer">
                            点击加载更多
                        </div>
                    </div> : <></>
                }
			</div>
		</main>
	)
}

export default Home
