import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import SEO from '../components/SEO'
import { RootState } from "../store"

function Custom404() {
    const seo = useSelector((state: RootState) => state.config.seo)
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    }, [])
    return (
        <main className="flex justify-center items-center text-3xl text-gray-600 min-h-screen">
            <SEO 
				title={`500-${seo?.seoTitle}`} 
				description={seo?.seoDescription as string} 
				canonical={process.env.site_url} 
			/>
            <h1>
                500 - Server Error
            </h1>
        </main>
    )
}

export default Custom404