import Tag from "./Tag";

interface Post {
    id: number,
    title: string,
    content: string,
    image: string,
    price: number,
    contactInfo: string,
    cityId: number,
    provinceId: number,
    cityName: string,
    provinceName: string,
    tagNames: string,
    isBought: boolean,
    tags: number[],
    tagList: Tag[]
    createTime: Date,
    updateTime: Date
}

export default Post