import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Toast from 'light-toast'
import { RootState } from "../../store"
import Member from "../../types/Member"
import { getInfo, logout, updateMember } from "../../store/actions/userActions"
import { useRouter } from "next/router"
import ClipboardJS from 'clipboard'
import dayjs from "dayjs"
import SEO from "../../components/SEO"
import Avatar from "../../components/Avatar"
import { GetServerSideProps } from "next"
import MemberApi from "../../services/MemberApi"
import Vip from "../../types/Vip"
import Segement, { Seg } from "../../components/Segement"
import Vips from "../../components/Vips"
import MyOrders from "../../components/MyOrders"
import VipApi from "../../services/VipApi"
import Order from "../../types/Order"
import RegMembers from "../../components/RegMembers"
import { IoDuplicateOutline, IoShareOutline } from "react-icons/io5"
import Seo from "../../types/Seo"

const tabs: Seg[] = [
    { id: 1, path: '', name: '购买VIP' },
    { id: 2, path: '', name: '账单记录' },
    { id: 3, path: '', name: '注册人数' },
    { id: 4, path: '', name: '付费人数' }
]

type MineProps = {
    member: Member,
    tabList: Seg[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const token = query.token as string
    let tabList: Seg[] = []
    const res = await MemberApi.tokenInfo(token)
    const member = res.data.data
    const vips = member.vips as Vip[]
    let t = 0
    for (const vip of vips) {
        vip.endTimeTS = dayjs(dayjs(vip.startTime).valueOf() + vip.validDays * 86400000).valueOf()
        if (vip.endTimeTS > t) {
            t = vip.endTimeTS
        }
    }
    member.vipEndTime = t
    return {
        props: {
            member,
            tabList: tabs
        }
    }
}

let pageIndex = 1
function Mine({ member, tabList }: MineProps) {
    const dispatch = useDispatch()
    const router = useRouter()
    const seo: Seo = useSelector((state: RootState) => state.config.seo)
    const mem: Member = useSelector((state: RootState) => state.member)

    const [ active, setActive ] = useState<Seg>(tabList[0])
    const [ vipList, setVipList ] = useState<Vip[]>([])
    const [ orderList, setOrderList ] = useState<Order[]>([])
    const [ regNumList, setRegNumList ] = useState<Member[]>([])
    const [ regPayNumList, setRegPayNumList ] = useState<Member[]>([])
    const [ totalOrderPage, setTotalOrderPage ] = useState<number>(0)

    const [ hasShare, setHasShare ] = useState(false)

    const onOrdersMore = () => {
        pageIndex++
        getOrderList()
    }

    const Record = () => {
        if (active.id === 1) return <Vips vipList={vipList}/>
        if (active.id === 2) return <MyOrders 
            orderList={orderList} 
            hasMore={pageIndex <= totalOrderPage} 
            onMore={onOrdersMore}
        />
        if (active.id === 3) return <RegMembers list={regNumList}/>
        if (active.id === 4) return <RegMembers list={regPayNumList}/>
        return <></>
    }

    const onShare = () => {
        window.navigator.share({
            title: document.title,
            url: document.location.href,
            text: '分享推广链接'
        }).then(res => {
            window.gtag && window.gtag('event', 'share', { value: 'share' })
            console.log('Share success!')
        }).catch(err => {
            console.warn('Share failed!')
        })
    }

    
    const getVipList = () => {
        Toast.loading('加载中...')
        VipApi.findPayVips().then(res => {
            Toast.hide()
            setVipList(res.data.data)
        }).catch(() => {
            Toast.hide()
        })
    }
    

    const getOrderList = () => {
        Toast.loading('加载中...')
        MemberApi.orders({
            pageIndex,
            pageSize: 10
        }).then(res => {
            Toast.hide()
            setOrderList([...orderList, ...res.data.data.list])
            setTotalOrderPage(res.data.data.pages)
        }).catch(() => {
            Toast.hide()
        })
    }
    const getRegNumList = (pay: boolean) => {
        Toast.loading('加载中...')
        MemberApi.regNum({ pageIndex: 1, pageSize: 100, pay }).then(res => {
            Toast.hide()
            if (pay) {
                setRegPayNumList(res.data.data.list)
            } else {
                setRegNumList(res.data.data.list)
            }
        }).catch(() => {
            Toast.hide()
        })
    }
    const getList = (i: number) => {
        if (i === 1) getVipList()
        if (i === 2) getOrderList()
        if (i === 3) getRegNumList(false)
        if (i === 4) getRegNumList(true)
    }

    useEffect(() => {
        dispatch({ type: 'SET_MEMBER', payload: member })
        getList(active.id)
        setHasShare(Boolean(window.navigator.share))
    }, [])

    useEffect(() => {
        const clipboard = new ClipboardJS('#copyBtn')
        clipboard.on('success', () => {
            Toast.success('复制成功')
        })
    }, [])

    return (
        <main>
            <SEO 
				title={`我的-${seo?.seoTitle}`} 
				description={seo?.seoDescription} 
				canonical={process.env.site_url}
			/>
            <div className="container sm:w-2/3">
                <div className="px-4 my-4">
                    <div className="flex">
                        <div className="w-24 h-24">
                            <Avatar 
                                image={mem.avatar}
                                changCallback={(formData: FormData) => {
                                    dispatch(updateMember({ formData, cb: () => {
                                        dispatch(getInfo())
                                    } }))
                                }}
                            />
                        </div>
                        <div className="flex-1 pl-3 text-sm flex flex-col justify-center">
                            <div className="flex">
                                <div className="w-12 text-black dark:text-gray-100">账号：</div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {mem.memberName || '无'}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-12 text-black dark:text-gray-100">手机：</div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {mem.mobile || '无'}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-12 text-black dark:text-gray-100">邮箱：</div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {mem.email || '无'}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-12 text-black dark:text-gray-100">
                                    { mem.isAgent ? '余额：' : 'VIP：' }
                                </div>
                                <div className="flex-1 text-gray-600 dark:text-gray-400">
                                    {
                                        mem.isAgent ? (mem.balance + '元') : (mem.vipEndTime ? (dayjs(mem.vipEndTime).format('YYYY-MM-DD HH:mm:ss') + ' 到期') : '无')
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block w-28">
                            <div 
                                onClick={() => {
                                    dispatch(logout())
                                    router.push('/')
                                }}
                                className="rounded-lg py-1 bg-white dark:bg-black text-gray-600 dark:text-gray-400 border dark:border-gray-800 text-center mt-4 cursor-pointer">
                                退出
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="mt-4 px-4 sm:w-2/4 break-words">
                    <div className="py-2 sm:inline-block">
                        <span className="text-black dark:text-gray-400">推广链接：</span>
                        <span 
                            className="bg-gray-200 text-gray-700 text-sm px-4 py-1 rounded" 
                            id="copyBtn" 
                            data-clipboard-text={process.env.site_url + '/register/' + mem.randomCode}>
                            <IoDuplicateOutline 
                                style={{top: '-1px'}}
                                className="relative text-base inline-block mr-1" 
                            />
                            <span>复制</span>
                        </span>
                        {
                            hasShare ?
                            <span 
                                className="bg-gray-200 text-gray-700 text-sm px-4 py-1 ml-2 rounded"
                                onClick={onShare}>
                                <IoShareOutline 
                                    style={{top: '-1px'}}
                                    className="relative text-base inline-block mr-1" 
                                />
                                <span>分享</span>
                            </span> : <></>
                        }
                        
                    </div>
                    <p 
                        className="text-pink-500 sm:inline-block sm:ml-3">
                        {process.env.site_url + '/register/' + mem.randomCode}
                    </p>
                </div>
                <div className="px-4 mt-3">
                    <p className="text-xs text-gray-400 dark:text-gray-600 pb-2">
                        注：注册人数和付费人数均为通过您的推广链接注册的用户
                    </p>
                    <Segement 
                        list={tabList} 
                        active={active} 
                        onChange={(item: Seg) => {
                            setActive(item)
                            getList(item.id)
                        }} 
                    />
                    <div className="mt-3">
                        <Record />
                    </div>
                </div>
                <div className="px-4 mt-20 mb-6 sm:hidden">
                    <div 
                        onClick={() => {
                            dispatch(logout())
                            router.push('/')
                        }}
                        style={{height: '48px', lineHeight: '48px'}}
                        className="w-full rounded-lg bg-white dark:bg-black text-gray-600 dark:text-gray-400 border dark:border-gray-800 text-center mt-4 cursor-pointer">
                        退出
                    </div>
                </div>
            </div>
            
        </main>
    )
}

export default Mine