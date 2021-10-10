import { GetServerSideProps } from 'next'
import SearchItem from '../../components/SearchItem'
import PaginationBar from '../../components/PaginationBar'
import SEO from '../../components/SEO'
import VodApi from '../../services/VodApi'
import Vod from '../../types/Vod'
import VodType from '../../types/VodType'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


type SearchProps = {
    vodTypes: Array<VodType>,
    keyword: string,
    vodList: Array<Vod>,
    pageIndex: number,
    pageSize: number,
    total: number,
    pages: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const pageIndex: number = Number(query.pageIndex ?? 1)
    const pageSize: number = Number(query.pageSize ?? 24)
    const keyword: string = query.keyword as string
    const params = {
        pageIndex,
        pageSize,
        keyword
    }
    const { data } = await VodApi.search(params)
    const vodList: Array<Vod> = data.data.list
    const pages: number = data.data.pages

    return {
        props: {
            keyword,
            vodList,
            pageIndex,
            pageSize,
            pages
        }
    }
}

function Search({ keyword, vodList, pageIndex, pageSize, pages }: SearchProps) {
    const seo = useSelector((s: RootState) => s.config.seo)
    return (
        <main className="px-4">
            <SEO 
				title={`${keyword}搜索结果-${seo?.seoTitle}`} 
				description={`${keyword},${seo?.seoDescription}`} 
				canonical={process.env.site_url} 
			/>
            <div className="container py-4">
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg pb-5">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg text-gray-700 dark:text-gray-400 inline-block">
                            与 <span className="text-red-500">“{keyword}”</span> 相关的结果
                        </h2>
                    </div>
                    <div>
                        {
                            vodList.map((vod: Vod, i: number) => (
                                <SearchItem key={vod.vodId} vod={vod} index={i}></SearchItem>
                            ))
                        }
                    </div>
                </div>
                <PaginationBar 
                    pageIndex={pageIndex} 
                    pageSize={pageSize} 
                    pages={pages} 
                    baseUrl={`/search/${keyword}?a=1`}/>
            </div>
        </main>
    )
}

export default Search