import { GetServerSideProps } from "next"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faShare, faShareSquare, faShareAlt, faShareAltSquare } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useStore } from "react-redux"
import Hls from 'hls.js'
import VodApi from "../../services/VodApi"
import Vod from "../../types/Vod"
import VodType from "../../types/VodType"
import VodItem from "../../components/VodItem"
import SEO from '../../components/SEO'
import { RefObject, useEffect, useRef, useState } from "react"
import { State } from "../../store"

type PlayProps = {
    vod: Vod,
    likeList: Array<Vod>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const vodId: number = Number(query.vodId)

    const resById = await VodApi.findById({ vodId })
    const vod: Vod = resById?.data?.data
    const resLike = await VodApi.findYouLike({ typeId: vod.typeId, vodClass: vod.vodClass, num: 12 })

    return {
        props: {
            vod,
            likeList: resLike?.data?.data
        }
    }
}


function Play({ vod, likeList }: PlayProps) {
    const store = useStore()
    const state = store.getState()
    const typeList = state.typeList
    const seo = useSelector((s: State) => s.seo)
    const currentType: VodType = typeList.find((vodType: VodType) => vodType.typeId === vod.typeId)
    const videoRef = useRef() as RefObject<HTMLVideoElement>
    const [ hasShare, setHasShare ] = useState(true)
    let hls: Hls

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

    useEffect(() => {
        const videoEle = videoRef.current as HTMLVideoElement
        const URL = "http" + vod.vodPlayUrl?.split("http")[1]
        setHasShare(Boolean(window.navigator.share))

        if (Hls.isSupported()) {
            hls = new Hls()
            hls.loadSource(URL)
            hls.attachMedia(videoEle)
        } else if (videoEle?.canPlayType("application/vnd.apple.mpegurl")) {
            videoEle.setAttribute('src', URL)
        }
        return () => {
            hls.detachMedia()
            hls.destroy()
        }
    }, [])
    
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
                        <FontAwesomeIcon 
                            style={{top: '-2px'}}
                            className="w-2 h-2 text-gray-400 relative inline-block" 
                            icon={faChevronRight}/>
                        <Link href={`/list/${currentType.typeId}/全部`}>
                            <a className="text-gray-700 dark:text-gray-400 px-1">{currentType.typeName}</a>
                        </Link>
                        <FontAwesomeIcon 
                            style={{top: '-2px'}}
                            className="w-2 h-2 text-gray-400 relative inline-block" 
                            icon={faChevronRight}/>
                        <span className="pl-1">{vod.vodName}</span>
                    </div>
                    <div className="w-full">
                        <div className="aspectration" data-ratio="16:9">
                            <div className="con overflow-hidden">
                                <video 
                                    ref={videoRef}
                                    className="w-full h-full"
                                    autoPlay
                                    controls>
                                </video>
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
                                    className="bg-gray-500 text-gray-800 px-3 rounded cursor-pointer hover:text-gray-100" onClick={onShare}>
                                    <FontAwesomeIcon 
                                    style={{top: '-1px'}}
                                    className="w-3 h-3 relative inline-block mr-1" 
                                    icon={faShareSquare}/>
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