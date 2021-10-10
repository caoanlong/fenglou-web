import { GetServerSideProps } from "next"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import Hls from 'hls.js'
import VodApi from "../../services/VodApi"
import Vod from "../../types/Vod"
import VodType from "../../types/VodType"
import VodItem from "../../components/VodItem"
import SEO from '../../components/SEO'
import React, { Dispatch, RefObject, useEffect, useRef, useState } from "react"
import { RootState } from "../../store"
import { IoChevronForwardOutline, IoShareOutline } from "react-icons/io5"
import ButtomCom from "../../components/ButtonCom"
import dayjs from "dayjs"
import { NextRouter, useRouter } from "next/router"
import Member from "../../types/Member"
import Seo from "../../types/Seo"

type PlayProps = {
    vod: Vod,
    likeList: Array<Vod>,
    URL: string
}

type VideoPlayerProps = {
    URL: string
}


function VideoPlayer({ URL }: VideoPlayerProps) {
    let hls: Hls
    const videoRef = useRef() as RefObject<HTMLVideoElement>

    useEffect(() => {
        const videoEle = videoRef.current as HTMLVideoElement
        if (Hls.isSupported()) {
            hls = new Hls()
            hls.loadSource(URL)
            hls.attachMedia(videoEle)
        } else if (videoEle?.canPlayType("application/vnd.apple.mpegurl")) {
            videoEle.setAttribute('src', URL)
        }
        return () => {
            if (hls) {
                hls.detachMedia()
                hls.destroy()
            }
        }
    })

    return (<video 
        ref={videoRef}
        className="w-full h-full"
        autoPlay
        controls>
    </video>)
}


function LoginFirst({ token }: { token: string }) {
    const dispatch = useDispatch()
    const router = useRouter()

    return (<div 
        className="w-full h-full flex justify-center items-center bg-gray-900">
        <div className="w-1/3 sm:w-36">
            {
                token ? <ButtomCom 
                    onClick={() => router.push(`/mine/${token}`)}
                    text="成为VIP会员" 
                /> : <ButtomCom 
                    onClick={() => dispatch({ type: 'SET_LOGIN_MODAL', payload: true })}
                    text="请先登录" 
                />
            }
        </div>
    </div>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const vodId: number = Number(query.vodId)

    const resById = await VodApi.findById({ vodId })
    const vod: Vod = resById?.data?.data
    const resLike = await VodApi.findYouLike({ typeId: vod.typeId, vodClass: vod.vodClass, num: 12 })
    
    const arr = vod.vodPlayUrl?.split("http")
    const URL = "http" + arr[arr.length - 1]
    return {
        props: {
            vod,
            likeList: resLike?.data?.data,
            URL
        }
    }
}


function Play({ vod, likeList, URL }: PlayProps) {
    const typeList = useSelector((state: RootState) => state.config.typeList)
    const seo: Seo = useSelector((state: RootState) => state.config.seo)
    const member: Member = useSelector((state: RootState) => state.member)
    const token: string = useSelector((state: RootState) => state.member.token)
    const currentType: VodType = typeList.find((vodType: VodType) => vodType.typeId === vod.typeId)
    
    const [ hasShare, setHasShare ] = useState(true)

    useEffect(() => {
        setHasShare(Boolean(window.navigator.share))
    }, [])

    const onShare = () => {
        window.navigator.share({
            title: document.title,
            url: document.location.href,
            text: vod.vodName
        }).then(res => {
            window.gtag && window.gtag('event', 'share', { value: 'share' })
            console.log('Share success!')
        }).catch(err => {
            console.warn('Share failed!')
        })
    }
    
    return (
        <main>
            <SEO 
				title={`正在播放-${vod.vodName}-${seo?.seoTitle}`} 
				description={`${vod.vodName},${seo?.seoDescription}`} 
				canonical={process.env.site_url} 
                type={'video.movie'}
                image={{
                    url: vod.vodPic.includes('http') ? vod.vodPic : process.env.site_url + '/' + vod.vodPic,
                    alt: vod.vodName + '-' + seo?.seoTitle
                }}
                tCardType={'player'}
			/>
            <div className="container sm:py-4">
                <div className="bg-white dark:bg-black shadow">
                    <div className="text-xs text-gray-400 dark:text-gray-600 mb-2 sm:text-sm sm:mb-4 p-3">
                        <span>当前位置：</span>
                        <Link href="/">
                            <a className="text-gray-700 dark:text-gray-400 px-1">首页</a>
                        </Link>
                        <IoChevronForwardOutline 
                            style={{ top: '-2px' }}
                            className="text-gray-400 relative inline-block"
                        />
                        <Link href={`/list/${currentType.typeId}/全部`}>
                            <a className="text-gray-700 dark:text-gray-400 px-1">{currentType.typeName}</a>
                        </Link>
                        <IoChevronForwardOutline 
                            style={{ top: '-2px' }}
                            className="text-gray-400 relative inline-block"
                        />
                        <span className="pl-1">{vod.vodName}</span>
                    </div>
                    <div className="w-full">
                        <div className="aspectration" data-ratio="16:9">
                            <div className="con overflow-hidden">
                                {
                                    vod.permission > 0 ? (member.vipEndTime ? <VideoPlayer URL={URL}/> : <LoginFirst token={token} />) : <VideoPlayer URL={URL}/>
                                }
                            </div>
                        </div>
                    </div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl px-3 pt-3 dark:text-gray-200">{vod.vodName}</h1>
                    <div className="text-sm text-gray-500 px-3 pb-3 flex">
                        <div className="flex-1">
                            <Link href={`/list/${currentType.typeId}/全部`}>
                                <a className="mr-2">{currentType.typeName}</a>
                            </Link>
                            <Link href={`/list/${currentType.typeId}/${vod.vodClass}`}>
                                <a>{vod.vodClass}</a>
                            </Link>
                        </div>
                        <div className="flex-1 flex justify-end">
                            {
                                hasShare 
                                ? <div 
                                    className="bg-gray-200 text-gray-700 px-3 rounded cursor-pointer hover:text-purple-500" 
                                    onClick={onShare}>
                                    <IoShareOutline 
                                        style={{top: '-1px'}}
                                        className="relative text-base inline-block mr-1" 
                                    />
                                    <span>分享</span>
                                </div> 
                                : <></>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-black shadow p-3 my-4 sm:rounded-lg">
                    <h1 className="text-lg py-2 dark:text-gray-400">猜你喜欢</h1>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {
                            likeList?.map((item: Vod) => (
                                <VodItem vod={item} isInShadow={true} key={item.vodId}></VodItem>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Play