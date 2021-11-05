import { GetServerSideProps } from 'next'
import React from 'react'
import BannerCom from '../components/Banner'
import SEO from '../components/SEO'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Banner from '../types/Banner'
import Seo from '../types/Seo'
import PostApi, { PostFindListParams } from '../services/PostApi'
import Post from '../types/Post'
import PostItem from '../components/PostItem'
import PaginationBar from '../components/PaginationBar'
import MarqueeX from '../components/MarqueeX'

type HomeProps = {
    params: PostFindListParams,
	postList: Post[],
	pages: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const pageIndex: number = Number(query.pageIndex || 1)
    const pageSize: number = Number(query.pageSize || 48)
    const params: PostFindListParams = {
        pageIndex,
        pageSize
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
    
	return (
		<main>
			<SEO 
				title={`${seo?.seoTitle}`} 
				description={seo?.seoDescription as string} 
				canonical={process.env.site_url} 
			/>
			<BannerCom banners={banners}></BannerCom>
            <MarqueeX />
			<div className="container p-4">
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
                        pageIndex={params.pageIndex} 
                        pageSize={params.pageSize} 
                        pages={pages} 
                        baseUrl={`/`}/>
                    : <></>
                }
			</div>
		</main>
	)
}

export default Home
