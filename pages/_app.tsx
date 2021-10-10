import '../styles/globals.css'
import React from 'react'
import type { AppContext, AppProps } from 'next/app'
import { wrapper } from '../store'
import Layout from '../components/Layout'
import CommonApi from '../services/CommonApi'


const WrappedApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Component { ...pageProps} />
		</Layout>
	)
}

WrappedApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }: AppContext): Promise<any> => {
	const state = store.getState()
	// 服务端获取不到store-state
	if (!state.config.typeList || state.config.typeList.length === 0) {
		const { data } = await CommonApi.info()
		if (data.code === 200) {
			store.dispatch({ type: 'SET_TYPES', payload: data.data.vodTypes })
			store.dispatch({ type: 'SET_SEO', payload: data.data.seo })
			store.dispatch({ type: 'SET_LINKS', payload: data.data.links })
			store.dispatch({ type: 'SET_BANNERS', payload: data.data.banners })
		}
	}
	
	
})

// WrappedApp.getServerSideProps = wrapper.getServerSideProps(() => {
// 	console.log('初始化...')
// })


export default wrapper.withRedux(WrappedApp)
