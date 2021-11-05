
import { AnyAction } from "redux";
import Banner from "../../types/Banner";
import City from "../../types/City";
import FriendLink from "../../types/FriendLink";
import Notice from "../../types/Notice";
import Province from "../../types/Province";
import Seo from "../../types/Seo";
import Tag from "../../types/Tag";
import Money from "../../types/Money";
import VodType from "../../types/VodType";

export interface ConfigState {
    theme: string,
    typeList: VodType[],
    seo?: Seo,
    friendLinks: FriendLink[],
    banners: Banner[],
    notices: Notice[],
    provinces: Province[],
    cities: City[],
    hotCities: City[],
    tags: Tag[],
    showLogin: boolean,
    showBuyMoney: boolean,
    currentBuyMoney?: Money
}

const initState: ConfigState = {
    theme: 'dark',
    typeList: [],
    seo: undefined,
    friendLinks: [],
    banners: [],
    notices: [],
    provinces: [],
    cities: [],
    hotCities: [],
    tags: [],
    showLogin: false,
    showBuyMoney: false,
    currentBuyMoney: undefined
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
        case 'SET_NOTICES':
            return { ...state, notices: action.payload }
        case 'SET_PROVINCES':
            return { ...state, provinces: action.payload }
        case 'SET_CITIES':
            return { ...state, cities: action.payload }
        case 'SET_HOTCITIES':
            return { ...state, hotCities: action.payload }
        case 'SET_TAGS':
            return { ...state, tags: action.payload }
        case 'SET_LOGIN_MODAL':
            return { ...state, showLogin: action.payload }
        case 'SET_BUY_MONEY_MODAL':
            const { showBuyMoney, money } = action.payload
            return { 
                ...state, 
                showBuyMoney,
                currentBuyMoney: showBuyMoney ? money : undefined
            }
        default:
            return state
    }
}

export default reducer