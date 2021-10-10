export const checkName = (value: string) => {
    if (!value) return true
    const reg = /^[\u4E00-\u9FA5]{2,15}$/
    return reg.test(value)
}

export const checkUserName = (value: string) => {
    if (!value) return true
    const reg = /^[a-zA-Z]\w{5,14}$/
    return reg.test(value)
}

export const checkPassword = (value: string) => {
    if (!value) return true
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    return reg.test(value)
}

export const checkBankNo = (value: string) => {
    if (!value) return true
    const reg = /^[0-9]{14,20}$/
    return reg.test(value)
}

export const checkEmail = (value: string) => {
    if (!value) return true
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
    return reg.test(value)
}

export const checkQQ = (value: string) => {
    if (!value) return true
    const reg = /^[1-9][0-9]{4,11}$/gim
    return reg.test(value)
}

export const checkMobile = (value: string) => {
    if (!value) return true
    const reg = /^[1][3-9][0-9]{9}$/
    return reg.test(value)
}

export const checkAlipay = (value: string) => {
    return checkMobile(value) || checkEmail(value)
}