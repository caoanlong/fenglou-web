import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'


class Mydocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang={process.env.lang}>
                <Head>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2XV487XEMB"></script>
                    <script
                        dangerouslySetInnerHTML={{
                        __html: `
                            if (navigator.userAgent.indexOf('iPhone') > -1) {
                                document.addEventListener('touchstart', function(event) {
                                  if (event.touches.length > 1) {
                                    event.preventDefault()
                                  }
                                })
                                var lastTouchEnd = 0
                                document.addEventListener('touchend', function(event) {
                                  var now = new Date().getTime()
                                  if (now - lastTouchEnd <= 300) {
                                    event.preventDefault()
                                  }
                                  lastTouchEnd = now
                                }, false)
                              }
                              // disable ios scale
                              document.addEventListener('gesturestart', function (event) {
                                event.preventDefault()
                              })

                              window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', 'G-2XV487XEMB');
                        `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Mydocument