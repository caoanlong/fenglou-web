import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, MouseEvent, createRef, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../store'
import VodType from '../types/VodType'
import Area from '../types/Area'

const HOT_LIST = [
    '三上悠亚',
    '桥本有菜',
    '明日花绮罗',
    '吉泽明步',
    '篠田优',
    '佐佐木明希',
    '古川伊织',
    '桃乃木香奈',
    '山岸逢花',
    '明里紬'
]

function HeaderBar() {
    const router = useRouter()

    const areas = useSelector((state: State) => state.areas)

    const [ showNavs, setShowNavs ] = useState(false)
    const [ showMobileSearch, setShowMobileSearch ] = useState(false)
    const [ showHotList, setShowHotList ] = useState(false)
    const keywordsRef = createRef<HTMLInputElement>()
    
    const changePage = (e: MouseEvent<HTMLLIElement>, tId: number) => {
        e.stopPropagation()
        setShowNavs(false)
        router.push(`/list/${tId}/全部?orderBy=time`)
    }

    const handleSearch = () => {
        const searchIpt = showMobileSearch ? document.getElementById('searchIptMobile') as HTMLInputElement : document.getElementById('searchIpt') as HTMLInputElement
        const keyword = searchIpt?.value
        if (keyword) {
            router.push(`/search/${keyword}`)
        }
        setTimeout(() => {
            setShowMobileSearch(false)
        }, 100)
    }
    const handleEnter = (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
            handleSearch()
        }
    }
    const handleSelectSearch = (keyword: string) => {
        setShowHotList(false)
        router.push(`/search/${keyword}`)
    }

    const isActive = (typeId: number) => {
        return (router.pathname.includes('/list') && router.query.typeId === String(typeId))
    }

    useEffect(() => {
        keywordsRef.current?.addEventListener('keydown', handleEnter)
        return () => {
            keywordsRef.current?.removeEventListener('keydown', handleEnter)
        }
    }, [])

    return (
        <div className="w-full h-12 sm:h-16 fixed z-50 shadow bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 backdrop-filter backdrop-blur">
            <div className="container h-full flex">
                <div 
                    className="w-16 h-full flex justify-center items-center lg:hidden" 
                    onClick={() => setShowNavs(!showNavs)}>
                    <FontAwesomeIcon className="w-5 h-5 text-gray-600 cursor-pointer" icon={faBars}/>
                </div>
                <a className="h-full py-2 text-gray-400" href="/">
                    上林仙馆
                </a>
                <ul className="flex-1 h-full clear-both hidden lg:block">
                    <li className={`float-left h-full px-4 flex items-center ${router.asPath === '/' ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'}`}>
                        <Link href="/">
                            <a className="block">首页</a>
                        </Link>
                    </li>
                    {
                        areas.map((area: Area) => (
                            <li 
                                className={`float-left h-full px-4 flex items-center ${isActive(area.termId) ? 'text-purple-500' : 'text-gray-600 dark:text-gray-500 hover:text-purple-500'}`} 
                                key={area.termId}>
                                <Link href={`/list/${area.termId}/全部?orderBy=time`}>
                                    <a>{area.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex-1 lg:flex-none lg:w-40 h-full flex justify-end items-center px-4">
                    <FontAwesomeIcon 
                        className="w-4 h-8 text-gray-600 mx-4 sm:hidden" 
                        icon={faSearch} onClick={() => setShowMobileSearch(true)}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderBar