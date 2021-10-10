import React, { useState, MouseEvent, KeyboardEvent, FormEvent, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import VodType from '../types/VodType'
import { RootState } from '../store'
import { IoClose, IoMenu, IoPerson, IoSearch } from 'react-icons/io5'

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
    const dispatch = useDispatch()
    const vodTypes = useSelector((state: RootState) => state.config.typeList)
    const token = useSelector((state: RootState) => state.member.token)

    const [ showNavs, setShowNavs ] = useState(false)
    const [ showMobileSearch, setShowMobileSearch ] = useState(false)
    const [ showHotList, setShowHotList ] = useState(false)
    const keywordsRef = useRef<HTMLInputElement>(null)
    
    const changePage = (e: MouseEvent<HTMLLIElement>, tId: number) => {
        e.stopPropagation()
        setShowNavs(false)
        router.push(`/list/${tId}/全部?orderBy=time`)
    }

    const handleSearch = () => {
        const keyword = keywordsRef.current?.value
        if (keyword) {
            router.push(`/search/${keyword}`)
        }
        setTimeout(() => {
            setShowMobileSearch(false)
        }, 100)
    }
    const handleEnter = (e: KeyboardEvent) => {
        if (e.keyCode === 13 || e.key === 'Enter') {
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

    return (
        <div className="w-full h-12 sm:h-16 fixed z-50 shadow bg-white dark:bg-black">
            <div className="container h-full flex">
                <div 
                    className="w-16 h-full flex justify-center items-center text-gray-600 text-3xl cursor-pointer lg:hidden" 
                    onClick={() => setShowNavs(!showNavs)}>
                    <IoMenu />
                </div>
                <Link href={'/'}>
                    <a className="h-full py-2" style={{width: '160px'}}>
                        <img className="h-full" src="/images/logo.svg" alt="LOGO" />
                    </a>
                </Link>
                
                <ul className="flex-1 h-full clear-both hidden lg:block">
                    <li className={`float-left h-full px-4 flex items-center ${router.asPath === '/' ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'}`}>
                        <Link href="/">
                            <a className="block">首页</a>
                        </Link>
                    </li>
                    {
                        vodTypes.map((nav: VodType) => (
                            <li 
                                className={`float-left h-full px-4 flex items-center ${isActive(nav.typeId) ? 'text-purple-500' : 'text-gray-600 dark:text-gray-500 hover:text-purple-500'}`} 
                                key={nav.typeId}>
                                <Link href={`/list/${nav.typeId}/全部?orderBy=time`}>
                                    <a>{nav.typeName}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    showNavs ? 
                    <div 
                        className="w-full fixed left-0 top-12 sm:top-16 right-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur lg:hidden" 
                        onClick={() => setShowNavs(false)}>
                        <ul 
                            className="w-full absolute left-0 top-0 bg-white dark:bg-black shadow-md">
                            <li 
                                onClick={() => router.push('/')}
                                className={`container h-14 px-4 flex items-center ${router.asPath === '/' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-500'}`}>
                                首页
                            </li>
                            {
                                vodTypes.map((nav: VodType) => (
                                    <li 
                                        className={`container h-14 px-4 flex items-center ${isActive(nav.typeId) ? 'text-purple-500' : 'text-gray-600 dark:text-gray-500'}`} 
                                        key={nav.typeId} 
                                        onClick={(e: MouseEvent<HTMLLIElement>) => changePage(e, nav.typeId)}>
                                        {nav.typeName}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    : <></>
                }
                
                <div 
                    className="w-64 h-full hidden sm:flex items-center relative">
                    <div 
                        className="w-auto h-8 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-900 border rounded-3xl flex focus-within:ring-2 focus-within:border-purple-600">
                        <input 
                            ref={keywordsRef} 
                            className="flex-1 h-full px-3 bg-transparent outline-none dark:text-white" 
                            type="search" 
                            placeholder="请输入关键字" 
                            onKeyDown={handleEnter}
                            onFocus={() => setShowHotList(true)} 
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowHotList(false)
                                }, 200)
                            }}/>
                        <div 
                            className="w-8 h-full text-gray-400 flex justify-center items-center cursor-pointer" 
                            onClick={handleSearch}>
                            <IoSearch />
                        </div>
                    </div>
                    {
                        showHotList ? 
                        <div className="absolute z-10 top-14 left-0 right-6 bg-white dark:bg-gray-900 shadow-lg rounded p-4">
                            <p className="text-xs text-gray-400 pb-2">热门搜索</p>
                            <ul className="text-sm">
                                {
                                    HOT_LIST.map((hot: string, i: number) => (
                                        <li 
                                            key={i} 
                                            className="block py-2 text-gray-700 dark:text-gray-400 cursor-pointer" 
                                            onClick={() => handleSelectSearch(hot)}>
                                            <span 
                                                className={`inline-block w-5 h-5 text-center text-xs rounded-sm mr-2 ${i === 0 ? 'bg-red-500 text-white' : i === 1 ? 'bg-yellow-500 text-white' : i === 2 ? 'bg-yellow-300 text-white' : 'bg-gray-300 text-gray-600'}`} 
                                                style={{lineHeight: '20px'}}>
                                                {i+1}
                                            </span>
                                            <span>{hot}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        : <></>
                    }
                </div>
                {
                    showMobileSearch ? 
                    <div 
                        className="w-full h-full items-center flex sm:w-64 absolute z-10 sm:hidden px-3 bg-white dark:bg-black">
                        <div 
                            className="w-full h-8 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-900 border rounded-3xl flex focus-within:ring-2 focus-within:border-purple-600">
                            <form 
                                className="flex-1 h-full"
                                action="javascript:return true">
                                <input 
                                    ref={keywordsRef} 
                                    className="w-full h-full px-3 bg-transparent outline-none dark:text-white" 
                                    type="search" 
                                    placeholder="请输入关键字" 
                                    onFocus={() => setShowHotList(true)}
                                    onKeyDown={handleEnter}
                                />
                            </form>
                            
                            <div 
                                className="w-8 h-full text-gray-400 flex justify-center items-center cursor-pointer" 
                                onClick={handleSearch}>
                                <IoSearch />
                            </div>
                        </div>
                        <div 
                            className="w-10 flex justify-center text-gray-600 text-2xl cursor-pointer" 
                            onClick={() => setShowMobileSearch(false)}>
                            <IoClose />
                        </div>
                        <div 
                            className="fixed top-12 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur" onClick={() => setShowMobileSearch(false)}>
                            <div className="bg-white dark:bg-black p-4">
                                <p className="text-xs text-gray-400 pb-2">热门搜索</p>
                                <ul className="text-sm">
                                    {
                                        HOT_LIST.map((hot: string, i: number) => (
                                            <li 
                                                key={i} 
                                                className="block py-2 text-gray-700 dark:text-gray-400" 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setShowMobileSearch(false)
                                                    handleSelectSearch(hot)
                                                }}>
                                                <span 
                                                    className={`inline-block w-5 h-5 text-center text-xs rounded-sm mr-2 ${i === 0 ? 'bg-red-500 text-white' : i === 1 ? 'bg-yellow-500 text-white' : i === 2 ? 'bg-yellow-300 text-white' : 'bg-gray-300 text-gray-600'}`} 
                                                    style={{lineHeight: '20px'}}>
                                                    {i+1}
                                                </span>
                                                <span>{hot}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    : <></>
                }
                <div className="flex-1 lg:flex-none lg:w-40 h-full flex justify-end items-center px-4">
                    <IoSearch 
                        className="text-xl text-gray-600 mx-4 sm:hidden" 
                        onClick={() => setShowMobileSearch(true)} 
                    />
                    {
                        token ? 
                            <Link href={'/mine/' + token}>
                                <a className="text-gray-600 text-xl">
                                    <IoPerson />
                                </a>
                            </Link> :
                            <div 
                                onClick={() => dispatch({ type: 'SET_LOGIN_MODAL', payload: true })}
                                className="bg-purple-500 py-1 sm:py-2 px-4 sm:px-10 text-center text-white rounded shadow-lg cursor-pointer">
                                登录
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderBar