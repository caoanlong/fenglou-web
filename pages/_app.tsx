import '../styles/globals.css'
import React from 'react'
import type { AppContext, AppProps } from 'next/app'
import { wrapper } from '../store'
import Layout from '../components/Layout'
import TermApi from '../services/TermApi'


const WrappedApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Component { ...pageProps} />
		</Layout>
	)
}

WrappedApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }: AppContext): Promise<any> => {
	const { data } = await TermApi.categorys()
	if (data.code === 200) {
		store.dispatch({ type: 'SET_AREAS', payload: data.data })
	}
	
})

// WrappedApp.getServerSideProps = wrapper.getServerSideProps(() => {
// 	console.log('初始化...')
// })


export default wrapper.withRedux(WrappedApp)
