
import { AnyAction } from "redux";
import Banner from "../../types/Banner";
import FriendLink from "../../types/FriendLink";
import Seo from "../../types/Seo";
import Vip from "../../types/Vip";
import VodType from "../../types/VodType";

export interface ConfigState {
    theme: string,
    typeList: VodType[],
    seo?: Seo,
    friendLinks: FriendLink[],
    banners: Banner[],
    showLogin: boolean,
    showBuyVip: boolean,
    currentBuyVip?: Vip
}

const initState: ConfigState = {
    theme: 'dark',
    typeList: [],
    seo: undefined,
    friendLinks: [],
    banners: [],
    showLogin: false,
    showBuyVip: false,
    currentBuyVip: undefined
}

const reducer = (state: ConfigState = initState, action: AnyAction) => {
    switch (action.type) {
        case 'SET_THEME':
            return { ...state, theme: action.payload }
        case 'SET_TYPES':
            return { ...state, typeList: action.payload }
        case 'SET_SEO':
            return { ...state, seo: action.payload }
        case 'SET_LINKS':
            return { ...state, friendLinks: action.payload }
        case 'SET_BANNERS':
            return { ...state, banners: action.payload }
        case 'SET_LOGIN_MODAL':
            return { ...state, showLogin: action.payload }
        case 'SET_BUY_VIP_MODAL':
            const { showBuyVip, vip } = action.payload
            return { 
                ...state, 
                showBuyVip,
                currentBuyVip: showBuyVip ? vip : undefined
            }
        default:
            return state
    }
}

export default reducer