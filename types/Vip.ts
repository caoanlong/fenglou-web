interface Vip {
    vipId: number,
    validDays: number,
    price: number,
    createTime: Date,
    updateTime: Date,
    startTime?: Date,
    endTimeTS?: number
}

export default Vip