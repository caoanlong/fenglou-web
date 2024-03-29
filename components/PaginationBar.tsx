import Link from 'next/link'

type PaginationProps = {
    pageIndex: number, 
    pageSize: number, 
    pages: number, 
    baseUrl: string
}

function PaginationBar({ 
    pageIndex, 
    pageSize, 
    pages, 
    baseUrl
}: PaginationProps) {
    const url = baseUrl + (baseUrl.includes('?') ? '&' : '?')
    const first = `${url}pageIndex=1&pageSize=${pageSize}`
    const last = `${url}pageIndex=${pages}&pageSize=${pageSize}`
    const prev = `${url}pageIndex=${pageIndex-1}&pageSize=${pageSize}`
    const next = `${url}pageIndex=${pageIndex+1}&pageSize=${pageSize}`
    let list = []
    if (pages <= 5) {
        for (let i = 1; i < pages + 1; i++) {
            list.push(i)
        }
    } else {
        if (pageIndex < 3) {
            list = [1, 2, 3, 4, 5]
        } else if (pageIndex > pages - 3) {
            list = [pages - 4, pages - 3, pages - 2, pages - 1, pages]
        } else {
            for (let i = pageIndex - 2; i < pageIndex + 3; i++) {
                list.push(i)
            }
        }
    }
    return (
        <div className="flex py-6 justify-center text-xs text-gray-700 dark:text-gray-400">
            <Link href={first}>
                <a 
                    className={`bg-white dark:bg-gray-900 px-3 py-2 rounded shadow-md mr-2 ${pageIndex === 1 && 'pointer-events-none cursor-not-allowed'}`}>
                    首页
                </a>
            </Link>
            <Link href={prev}>
                <a 
                    className={`bg-white dark:bg-gray-900 px-4 py-2 rounded shadow-md mr-2 ${pageIndex === 1 && 'pointer-events-none cursor-not-allowed'}`}>
                    上一页
                </a>
            </Link>
            
            <div className="md:hidden bg-pink-500 text-white px-4 py-2 rounded shadow-md mr-2">
                {pageIndex}/{pages}
            </div>
            {
                list.map((item: number) => (
                    <Link 
                        href={`${url}pageIndex=${item}&pageSize=${pageSize}`} 
                        key={item}>
                        <a className={`hidden md:block px-4 py-2 rounded shadow-md mr-2 ${pageIndex === item ? 'bg-pink-500 text-white' : 'bg-white dark:bg-gray-900'}`}>
                            {item}
                        </a>
                    </Link>
                ))
            }
            <Link href={next}>
                <a 
                    className={`bg-white dark:bg-gray-900 px-4 py-2 rounded shadow-md mr-2 ${pageIndex === pages && 'pointer-events-none cursor-not-allowed'}`}>
                    下一页
                </a>
            </Link>
            <Link href={last}>
                <a 
                    className={`bg-white dark:bg-gray-900 px-3 py-2 rounded shadow-md ${pageIndex === pages && 'pointer-events-none cursor-not-allowed'}`}>
                    尾页
                </a>
            </Link>
        </div>
    )
}

export default PaginationBar