const withPWA = require('next-pwa')

const config = {
    env: {
        lang: 'zh-CN',
        theme_color: '#000000',
        title: process.env.SITE_NAME,
        site_url: process.env.SITE_URL,
        api_url: process.env.API_URL,
        img_url: process.env.IMG_URL,
        description: '搞笑的免费在线短视频预告片分享,最新免费成人影片',
        keywords: '短视频,搞笑视频,视频分享,免费视频,在线视频,预告片'
    },
    async redirects() {
        return [
            {
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