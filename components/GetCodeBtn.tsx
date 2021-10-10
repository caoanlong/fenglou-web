import { useEffect, useState } from 'react'
import Toast from 'light-toast'
import { useDispatch } from 'react-redux'
import MemberApi from '../services/MemberApi'

type GetCodeBtnProps = {
    account: string,
    isAuto?: boolean
}

let timer: any = 0

function GetCodeBtn({ account, isAuto }: GetCodeBtnProps) {
    let totalTime = 60
    const [ canClick, setCanClick ] = useState(true)
    const [ smsTitle, setSmsTitle ] = useState('获取验证码')

    const countDown = () => {
        if (!canClick) return
        setCanClick(false)
        setSmsTitle('重新获取' + totalTime + 's')
        timer = setInterval(() => {
            totalTime--
            setSmsTitle('重新获取' + totalTime + 's')
            if (totalTime < 1) {
                clearInterval(timer)
                setSmsTitle('重新获取')
                totalTime = 60
                setCanClick(true)
            }
        }, 1000)
    }
    
    const handleGetCode = () => {
        Toast.loading('加载中...')
        MemberApi.getCode({ account, platform: 1 }).then(res => {
            Toast.success('发送成功')
            countDown()
        }).catch(() => {
            Toast.hide()
        })
    }

    useEffect(() => {
        isAuto && handleGetCode()
        return () => {
            if (timer) clearInterval(timer)
        }
    }, [])
    return (
        <div 
            className={`${canClick ? 'text-purple-500' : 'text-gray-400'} cursor-pointer pl-2`}
            onClick={handleGetCode}>
            {smsTitle}
        </div>
    )
}

export default GetCodeBtn