import { Dispatch } from "react"
import { AnyAction } from "redux"
import { RootState } from ".."
import Toast from 'light-toast'
import MemberApi from "../../services/MemberApi"
import dayjs from "dayjs"

export type LoginProps = {
    mobile?: string,
    email?: string,
    memberName?: string,
    platform?: number,
    password: string
}

export type RegisterProps = LoginProps & {
    randomCode?: string,
    code: string
}

export type UpdateProps = {
    formData: FormData
}


export const login = ({ mobile, email, memberName, password, cb }: LoginProps & { cb?: () => void }) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        Toast.loading('加载中...')
        MemberApi.login({ mobile, email, memberName, password, platform: 1 }).then(res => {
            Toast.hide()
            process.browser && localStorage.setItem('_t', res.headers['authorization'])
            dispatch({
                type: 'SET_TOKEN',
                payload: res.headers['authorization']
            })
            cb && cb()
        }).catch(() => {
            Toast.hide()
        })
    }
}

export const register = ({ randomCode, mobile, email, password, code, cb }: RegisterProps & { cb?: () => void }) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        Toast.loading('加载中...')
        MemberApi.register({ randomCode, mobile, email, password, code, platform: 1 }).then(res => {
            Toast.hide()
            process.browser && localStorage.setItem('_t', res.headers['authorization'])
            dispatch({
                type: 'SET_TOKEN',
                payload: res.headers['authorization']
            })
            cb && cb()
        }).catch(() => {
            Toast.hide()
        })
    }
}

export const updateMember = ({ formData, cb }: UpdateProps & { cb?: () => void }) => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        Toast.loading('加载中...')
        MemberApi.update(formData).then(res => {
            Toast.hide()
            cb && cb()
        }).catch(() => {
            Toast.hide()
        })
    }
}

export const getInfo = () => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        MemberApi.info().then(res => {
            const vips = res.data.data.vips
            let t = 0
            for (const vip of vips) {
                vip.endTimeTS = dayjs(dayjs(vip.startTime).valueOf() + vip.validDays * 86400000).valueOf()
                if (vip.endTimeTS > t) {
                    t = vip.endTimeTS
                }
            }
            dispatch({
                type: 'SET_MEMBER',
                payload: {
                    ...res.data.data, 
                    vipEndTime: t
                }
            })
        }).catch(err => {
            if (err.data && err.data.code === 403) {
                localStorage.removeItem('_t')
                dispatch({ type: 'DEL_MEMBER' })
            }
        })
    }
}

export const logout = () => {
    return function(dispatch: Dispatch<AnyAction>, getState: RootState) {
        dispatch({ type: 'DEL_MEMBER' })
        localStorage.removeItem('_t')
    }
}