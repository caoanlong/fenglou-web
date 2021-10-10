import Vip from "./Vip";

interface Member {
    memberId: number,
    memberName: string,
    mobile: string,
    email: string,
    avatar: string,
    isAgent: number, // 0: 普通玩家， 1：代理
    regType: number, // 1: mobile, 2: email
    referrerId: number, // 推荐人ID
    password: string,
    status: number, // 0: 禁用， 1： 正常
    randomCode: string, // 推广链接随机码
    totalRecharge: number,  // 充值总额（玩家），默认为0未充值
    balance: number,  // 余额（代理），默认为0
    loginIp?: number, 
    loginNum: number,
    lastLoginIp?: number,
    loginTime?: Date,
    lastLoginTime?: Date,
    createTime?: Date,
    updateTime?: Date,
    vipEndTime?: number,
    platform?: number,
    vips?: Vip[]
}

export default Member