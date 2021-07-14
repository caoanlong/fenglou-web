import { useSelector } from "react-redux"
import { State } from "../store"

function FooterBar() {
    const links = useSelector((state: State) => state.friendLinks)
    return (
        <footer className="bg-white dark:bg-black text-sm sm:text-base">
            <div className="container text-gray-400 dark:text-gray-600 text-center leading-loose py-8 md:py-14">
                <div className="flex justify-center">
                    <div>友情链接：</div>
                    <ul className="text-gray-400">
                        {
                            links.map((link, i) => (
                                <li key={i} className="inline-block mr-2">
                                    <a 
                                        className="hover:text-gray-100" 
                                        target="_blank" 
                                        href={link.linkUrl}>
                                        {link.linkName}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <p>商户合作请联系 Telegram:<a className="text-gray-700 dark:text-gray-300" href="https://t.me/jyavs" target="_blank">@jyavs</a></p>
                <p>Copyright © 2021 巨硬AV</p>
            </div>
        </footer>
    )
}

export default FooterBar