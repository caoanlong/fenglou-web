import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Banner from '../components/Banner'
import VodItem from '../components/VodItem'
import SEO from '../components/SEO'
import VodType from '../types/VodType'
import Vod from '../types/Vod'
import CommonApi from '../services/CommonApi'
import { State } from '../store'
import { useSelector } from 'react-redux'


function Home() {
	const seo = useSelector((state: State) => state.seo)
	return (
		<main>
			<SEO 
				title={`${seo?.seoTitle} - 好色有品，博学有识`} 
				description={seo?.seoDescription as string} 
				canonical={process.env.site_url} 
			/>
			<div className="container pt-4">
			</div>
		</main>
	)
}

export default Home
