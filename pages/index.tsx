import { GetServerSideProps } from 'next'
import Link from 'next/link'
import BannerCom from '../components/Banner'
import SEO from '../components/SEO'
import CommonApi from '../services/CommonApi'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Banner from '../types/Banner'
import Seo from '../types/Seo'
import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import Notice from '../types/Notice'
import PostApi, { PostFindListParams } from '../services/PostApi'
import Post from '../types/Post'
import PostItem from '../components/PostItem'
import PaginationBar from '../components/PaginationBar'

type HomeProps = {
	postList: Post[],
	pageIndex: number,
    pageSize: number,
	pages: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const query = context.query
    const pageIndex: number = Number(query.pageIndex ?? 1)
    const pageSize: number = Number(query.pageSize ?? 48)
    const params: PostFindListParams = {
        pageIndex,
        pageSize
    }

    const resPosts = await PostApi.findList(params)
    const postList: Post[] = resPosts.data.data.list
    const pages: number = resPosts.data.data.pages
    return {
        props: {
            postList,
			pageIndex, 
    		pageSize,
			pages
        }
    }
}

function Home({ 
	postList, 
	pageIndex, 
    pageSize,
	pages 
}: HomeProps) {
	const seo: Seo = useSelector((state: RootState) => state.config.seo)
	const banners: Banner[] = useSelector((state: RootState) => state.config.banners)
	const notices: Notice[] = useSelector((state: RootState) => state.config.notices)
	return (
		<main>
			<SEO 
				title={`${seo?.seoTitle}`} 
				description={seo?.seoDescription as string} 
				canonical={process.env.site_url} 
			/>
			<BannerCom banners={banners}></BannerCom>
			<div 
				style={{height: '44px', lineHeight: '44px'}}
				className="text-left sm:text-center text-xs sm:text-sm truncate px-3 sm:px-5 bg-yellow-50 text-yellow-500 overflow-hidden">
				{notices[0].title}
			</div>
			<div className="container pt-4">
				{
                    postList.length > 0
                    ? <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {postList.map((post: Post) => (<PostItem key={post.id} post={post}/>))}
                    </div>
                    : <div className="w-full h-64 flex justify-center items-center text-gray-400 dark:text-gray-600 text-xl">
                        暂无数据
                    </div>
                }
                {
                    postList.length > 0
                    ? <PaginationBar 
                        pageIndex={pageIndex} 
                        pageSize={pageSize} 
                        pages={pages} 
                        baseUrl={`/`}/>
                    : <></>
                }
			</div>
		</main>
	)
}

export default Home
