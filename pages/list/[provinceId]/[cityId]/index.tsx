import { GetServerSideProps } from 'next'
import Link from 'next/link'
import PaginationBar from '../../../../components/PaginationBar'
import SEO from '../../../../components/SEO'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import PostApi, { PostFindListParams } from '../../../../services/PostApi'
import CityApi from '../../../../services/CityApi'
import Post from '../../../../types/Post'
import City from '../../../../types/City'
import Province from '../../../../types/Province'
import React, { useEffect, useState } from 'react'
import PostItem from '../../../../components/PostItem'

type ListProps = {
    cityList: City[],
    postList: Post[],
    pages: number,
    provinceId: number,
    params: PostFindListParams
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const provinceId: number = Number(query.provinceId)
    const cityId: number = Number(query.cityId)

    
    const resCities = await CityApi.findAll({ pId: provinceId })
    const cityList: City[] = resCities.data.data
    const params: PostFindListParams = {
        pageIndex: 1,
        pageSize: 48,
        cityId: cityId === 0 ? cityList[0].id : cityId
    }

    const resPosts = await PostApi.findList(params)
    const postList: Post[] = resPosts.data.data.list
    const pages: number = resPosts.data.data.pages
    return {
        props: {
            cityList,
            postList,
            pages,
            provinceId,
            params
        }
    }
}

function List({ 
    cityList,
    postList, 
    pages,
    provinceId,
    params
}: ListProps) {
    const seo = useSelector((state: RootState) => state.config.seo)
    const provinces: Province[] = useSelector((state: RootState) => state.config.provinces)
    const province = provinces.find((item: Province) => item.id === provinceId) as Province
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
        <main className="px-4">
            <SEO 
				title={`${seo?.seoTitle}`} 
				description={`${seo?.seoDescription}`} 
				canonical={process.env.site_url} 
			/>
            <div className="container py-4">
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg pb-5">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <h1 className="text-lg text-gray-700 dark:text-gray-300 inline-block">
                            {province.name}
                        </h1>
                    </div>
                    <div className="flex my-5">
                        <div className="w-16 text-sm text-gray-400 text-center h-8 flex justify-center items-center">城市</div>
                        <ul className="flex-1 clearfix">
                            {
                                cityList.map((city: City) => (
                                    <li 
                                        key={city.id} 
                                        className={
                                            `float-left text-xs sm:text-sm px-5 h-8 flex justify-center items-center rounded-md cursor-pointer ${params.cityId === city.id ? 'bg-pink-500 text-white shadow-lg' : 'text-gray-600 hover:text-pink-500' }`
                                        }>
                                        <Link 
                                            href={`/list/${provinceId}/${city.id}`}>
                                            <a>{city.name}</a>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
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

export default List