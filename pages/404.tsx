import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import SEO from '../components/SEO'
import { State } from "../store"

function Custom404() {
    const seo = useSelector((state: State) => state.seo)
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    }, [])
    return (
        <main className="flex justify-center items-center text-3xl text-gray-600 min-h-screen">
            <SEO 
				title={`404-${seo?.seoTitle}`} 
				description={seo?.seoDescription as string} 
				canonical={process.env.site_url} 
			/>
            <h1>
                404 - Page Not Found
            </h1>
        </main>
    )
}

export default Custom404