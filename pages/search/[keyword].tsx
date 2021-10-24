import { GetServerSideProps } from 'next'
import SearchItem from '../../components/SearchItem'
import SEO from '../../components/SEO'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import PostApi, { PostFindListParams } from '../../services/PostApi'
import Post from '../../types/Post'
import { useEffect, useState } from 'react'
import Tag from '../../types/Tag'


type SearchProps = {
    postList: Post[],
    pages: number,
    params: PostFindListParams
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const keyword: string = query.keyword as string
    const tag: number = query.tag ? Number(query.tag) : 0
    const params: PostFindListParams = {
        pageIndex: 1,
        pageSize: 24
    }
    if (tag) {
        params.tagId = tag
    } else {
        params.title = keyword
    }

    const { data } = await PostApi.findList(params)
    const postList: Post[] = data.data.list
    const pages: number = data.data.pages

    return {
        props: {
            postList,
            pages,
            params
        }
    }
}

function Search({ postList, pages, params }: SearchProps) {
    const seo = useSelector((s: RootState) => s.config.seo)
    const tags: Tag[] = useSelector((state: RootState) => state.config.tags)
    const TAG_MAP: {[key:number]:string} = {}
    for (const tag of tags) {
        TAG_MAP[tag.id] = tag.name
    }
    const [ list, setList ] = useState<Post[]>(postList)
    const [ totalPages, setTotalPages ] = useState<number>(pages)
    const title = params.tagId ? (TAG_MAP[params.tagId] || params.title) : params.title

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
				title={`${title}搜索结果-${seo?.seoTitle}`} 
				description={`${title},${seo?.seoDescription}`} 
				canonical={process.env.site_url} 
			/>
            <div className="container py-4">
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg pb-5">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg text-gray-700 dark:text-gray-400 inline-block">
                            与 <span className="text-red-500">“{title}”</span> 相关的结果
                        </h2>
                    </div>
                    <div>
                        {
                            list.map((post: Post, i: number) => (
                                <SearchItem key={post.id} post={post} index={i}></SearchItem>
                            ))
                        }
                    </div>
                </div>
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

export default Search