import { NextSeo } from 'next-seo'
import { OpenGraphImages } from 'next-seo/lib/types'
import { useSelector } from 'react-redux'
import { State } from '../store'

type SEOProps = {
    title: string,
    description: string,
    canonical?: string,
    type?: string,
    image?: OpenGraphImages,
    tCardType?: string
}

function SEO({ 
    title, 
    description, 
    canonical, 
    type='website', 
    image, 
    tCardType='summary' 
}: SEOProps) {
    const seo = useSelector((state: State) => state.seo)
    const images: Array<OpenGraphImages> = [
        {
            url: '/icons/og-image.png',
            width: 512,
            height: 512,
            alt: seo?.seoTitle,
        }
    ]
    if (image) {
        images.push(image)
    }
    return (
        <>
            <NextSeo 
                title={title} 
                description={description} 
                canonical={canonical} 
                openGraph={{
                    title,
                    description,
                    url: canonical,
                    locale: process.env.lang,
                    site_name: seo?.seoTitle,
                    type,
                    images
                }} 
                twitter={{
                    site: '@jyavscom',
                    cardType: tCardType
                }}>
            </NextSeo>
        </>
    )
}

export default SEO