interface Seo {
    seoId: number,
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    seoTime: Date,
    seoScript?: string
}

export default Seo