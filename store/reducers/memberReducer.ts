
import { AnyAction } from "redux";
import Member from "../../types/Member";

export interface MemberState extends Member {
    token: string
}

const initState: MemberState = {
    memberId: 0,
    memberName: '',
    token: '',
    mobile: '',
    email: '',
    avatar: '',
    isAgent: 0, // 0: 普通玩家， 1：代理
    regType: 1, // 1: mobile, 2: email
    referrerId: 0, // 推荐人ID
    password: '',
    status: 1, // 0: 禁用， 1： 正常
    randomCode: '', // 推广链接随机码
    totalRecharge: 0,  // 充值总额，默认为0未充值
    balance: 0,  // 总金额，默认为0
    loginIp: 0, 
    loginNum: 0,
    lastLoginIp: 0,
    loginTime: undefined,
    lastLoginTime: undefined,
    createTime: undefined,
    updateTime: undefined,
    vipEndTime: 0
}

const reducer = (state: MemberState = initState, action: AnyAction) => {
    switch (action.type) {
        case 'SET_MEMBER':
            const token = localStorage.getItem('_t') || ''
            return { ...state, ...action.payload, token }
        case 'DEL_MEMBER':
            return { ...initState }
        case 'SET_TOKEN':
            return { ...state, token: action.payload }
        default:
            return state
    }
}

export default reducer