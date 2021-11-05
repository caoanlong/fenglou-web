const withPWA = require('next-pwa')

const config = {
    env: {
        lang: 'zh-CN',
        theme_color: '#000000',
        title: process.env.SITE_NAME,
        site_url: process.env.SITE_URL,
        api_url: process.env.API_URL,
        img_url: process.env.IMG_URL,
        description: '丝袜,白富美,美腿,美女,少女,SPA,会所,养生,绿茶',
        keywords: '丝袜,白富美,美腿,美女,spa,少女,会所,养生,绿茶'
    },
    async redirects() {
        return [
            {
                source: '/403',
                destination: '/',
                permanent: true,
            },{
                source: '/404',
                destination: '/',
                permanent: true,
            },{
                source: '/500',
                destination: '/',
                permanent: true,
            }
        ]
    }
}
if (process.env.NODE_ENV === 'production') {
    config.pwa = {
        dest: 'public'
    }
}

module.exports = process.env.NODE_ENV === 'production' ? withPWA(config) : config