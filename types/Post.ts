import Tag from "./Tag";

interface Post {
    id: number,
    title: string,
    content: string,
    image: string,
    price: number,
    contactInfo: string,
    city: number,
    province: number,
    cityName: string,
    provinceName: string,
    tags: number[],
    tagList: Tag[]
    createTime: Date,
    updateTime: Date
}

export default Post