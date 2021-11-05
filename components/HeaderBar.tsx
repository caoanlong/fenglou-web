import React, { useState, MouseEvent, KeyboardEvent, FormEvent, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { IoClose, IoMenu, IoPerson, IoSearch } from 'react-icons/io5'
import City from '../types/City'
import Province from '../types/Province'
import Tag from '../types/Tag'

function HeaderBar() {
    const router = useRouter()
    const dispatch = useDispatch()
    const hotCities: City[] = useSelector((state: RootState) => state.config.hotCities)
    const provinces: Province[] = useSelector((state: RootState) => state.config.provinces)
    const tags: Tag[] = useSelector((state: RootState) => state.config.tags)
    const theme: string = useSelector((state: RootState) => state.config.theme)
    const token = useSelector((state: RootState) => state.member?.token)

    const [ showNavs, setShowNavs ] = useState(false)
    const [ showMobileSearch, setShowMobileSearch ] = useState(false)
    const [ showProvinces, setShowProvinces ] = useState(false)
    const [ showHotList, setShowHotList ] = useState(false)
    const keywordsRef = useRef<HTMLInputElement>(null)
    
    const changePage = (e: MouseEvent<HTMLDivElement>, city: City) => {
        e.stopPropagation()
        setShowNavs(false)
        router.push(`/list/${city.pId}/${city.id}`)
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
    const handleSelectSearch = (tag: Tag) => {
        setShowHotList(false)
        router.push(`/search/${tag.name}?tag=${tag.id}`)
    }

    const isCityActive = (cityId: number) => {
        return (router.pathname.includes('/list') && router.query.cityId === String(cityId))
    }
    const isProvinceActive = (provinceId: number) => {
        return (router.pathname.includes('/list') && router.query.provinceId === String(provinceId))
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
                        <img 
                            className="h-full" 
                            src={`/images/logo.svg`} 
                            alt="LOGO" 
                        />
                    </a>
                </Link>
                
                <ul className="flex-1 h-full clear-both hidden lg:block">
                    <li className={`float-left h-full px-4 flex items-center ${router.asPath === '/' ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}>
                        <Link href="/">
                            <a className="block">首页</a>
                        </Link>
                    </li>
                    {
                        hotCities.map((city: City) => (
                            <li 
                                className={`float-left h-full px-4 flex items-center ${isCityActive(city.id) ? 'text-pink-500' : 'text-gray-600 dark:text-gray-500 hover:text-pink-500'}`} 
                                key={city.id}>
                                <Link href={`/list/${city.pId}/${city.id}`}>
                                    <a>{city.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                    <div 
                        onMouseEnter={() => setShowProvinces(true)}
                        onMouseLeave={() => setShowProvinces(false)}
                        className="float-left h-full px-4 flex items-center text-gray-600 dark:text-gray-500 hover:text-pink-500 relative cursor-pointer">
                        更多
                        {
                            showProvinces ? 
                            <div className="absolute z-10 top-14 left-0 w-96 bg-white dark:bg-gray-900 shadow-lg rounded p-4 clearfix">
                                {
                                    provinces.map((province: Province) => (
                                        <div 
                                            key={province.id} 
                                            className={`float-left px-4 py-2 ${isProvinceActive(province.id) ? 'text-pink-500' : 'text-gray-600 dark:text-gray-500'} hover:text-pink-500 cursor-pointer`}>
                                            <Link href={`/list/${province.id}/0`}>
                                                <a>{province.name}</a>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                            : <></>
                        }
                    </div>
                    
                </ul>
                {
                    showNavs ? 
                    <div 
                        className="w-full fixed left-0 top-12 sm:top-16 right-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur lg:hidden" 
                        onClick={() => setShowNavs(false)}>
                        <div 
                            className="w-full p-4 absolute left-0 top-0 bg-white dark:bg-black shadow-md">
                            {
                                hotCities.length ?
                                <div className="font-bold text-pink-500 text-sm">热门城市</div> : <></>
                            }
                            <div className="clearfix">
                                {
                                    hotCities.map((city: City) => (
                                        <div 
                                            className={`float-left h-12 px-4 flex items-center ${isCityActive(city.id) ? 'text-pink-500' : 'text-gray-600 dark:text-gray-500'}`} 
                                            key={city.id} 
                                            onClick={(e: MouseEvent<HTMLDivElement>) => changePage(e, city)}>
                                            {city.name}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-2 font-bold text-pink-500 text-sm">更多地区</div>
                            <div className="clearfix">
                                {
                                    provinces.map((province: Province) => (
                                        <div 
                                            key={province.id}
                                            className={`float-left h-12 px-4 flex items-center ${isProvinceActive(province.id) ? 'text-pink-500' : 'text-gray-600 dark:text-gray-500'}`} >
                                            <Link href={`/list/${province.id}/0`}>
                                                <a>{province.name}</a>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    : <></>
                }
                
                <div 
                    className="w-64 h-full hidden sm:flex items-center relative">
                    <div 
                        className="w-auto h-8 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-900 border rounded-3xl flex ring-pink-200 focus-within:ring-2 focus-within:border-pink-600">
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
                                    tags.map((tag: Tag, i: number) => (
                                        <li 
                                            key={i} 
                                            onClick={() => handleSelectSearch(tag)}
                                            className="block py-2 text-gray-700 dark:text-gray-400 cursor-pointer">
                                            <span 
                                                className={`inline-block w-5 h-5 text-center text-xs rounded-sm mr-2 ${i === 0 ? 'bg-red-500 text-white' : i === 1 ? 'bg-yellow-500 text-white' : i === 2 ? 'bg-yellow-300 text-white' : 'bg-gray-300 text-gray-600'}`} 
                                                style={{lineHeight: '20px'}}>
                                                {i+1}
                                            </span>
                                            <span>{tag.name}</span>
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
                            className="w-full h-8 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-900 border rounded-3xl flex focus-within:ring-2 focus-within:border-pink-600">
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
                                        tags.map((tag: Tag, i: number) => (
                                            <li 
                                                key={i} 
                                                className="block py-2 text-gray-700 dark:text-gray-400" 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setShowMobileSearch(false)
                                                    handleSelectSearch(tag)
                                                }}>
                                                <span 
                                                    className={`inline-block w-5 h-5 text-center text-xs rounded-sm mr-2 ${i === 0 ? 'bg-red-500 text-white' : i === 1 ? 'bg-yellow-500 text-white' : i === 2 ? 'bg-yellow-300 text-white' : 'bg-gray-300 text-gray-600'}`} 
                                                    style={{lineHeight: '20px'}}>
                                                    {i+1}
                                                </span>
                                                <span>{tag.name}</span>
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
                                className="bg-pink-500 py-1 sm:py-2 px-4 sm:px-10 text-center text-white rounded shadow-lg cursor-pointer">
                                登录
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderBar