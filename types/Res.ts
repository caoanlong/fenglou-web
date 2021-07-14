interface Res<T> {
    code: number,
    msg: string,
    data?: T
}

export default Res