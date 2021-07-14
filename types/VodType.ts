import Vod from './Vod'

type TypeExtend = {
    class: string,
    area: string,
    lang: string,
    year: string,
    star: string,
    director: string,
    state: string,
    version: string
}
interface VodType {
    typeId: number,
    typeName: string,
    typeEn: string,
    typeSort: number,
    typeMid: number,
    typePid: number,
    typeStatus: number,
    typeKey: string,
    typeDes: string,
    typeExtend: string,
    typeExtendJson: TypeExtend,
    vods?: Array<Vod>
}

export default VodType