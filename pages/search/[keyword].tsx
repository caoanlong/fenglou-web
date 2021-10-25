import { GetServerSideProps } from 'next'
import SearchItem from '../../components/SearchItem'
import SEO from '../../components/SEO'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import PostApi, { PostFindListParams } from '../../services/PostApi'
import Post from '../../types/Post'
import Tag from '../../types/Tag'
import PaginationBar from '../../components/PaginationBar'


type SearchProps = {
    postList: Post[],
    pages: number,
    params: PostFindListParams
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const pageIndex: number = Number(query.pageIndex || 1)
    const pageSize: number = Number(query.pageSize || 48)
    const keyword: string = query.keyword as string
    const tag: number = query.tag ? Number(query.tag) : 0
    const params: PostFindListParams = {
        pageIndex,
        pageSize
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
    const TAG_MAP: any = {}
    for (const tag of tags) {
        TAG_MAP[tag.id] = tag.name
    }
    const title = params.tagId ? (TAG_MAP[params.tagId] || params.title) : params.title
    const baseUrl = `/search/${title + (params.tagId ? '?tag=' + params.tagId : '')}`
    
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
                            postList.map((post: Post, i: number) => (
                                <SearchItem key={post.id} post={post} index={i}></SearchItem>
                            ))
                        }
                    </div>
                </div>
                {
                    postList.length > 0
                    ? <PaginationBar 
                        pageIndex={params.pageIndex} 
                        pageSize={params.pageSize} 
                        pages={pages} 
                        baseUrl={baseUrl}/>
                    : <></>
                }
            </div>
        </main>
    )
}

export default Search