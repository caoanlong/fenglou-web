import {createStore, AnyAction, Store, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper'
import VodType from '../types/VodType'
import Seo from '../types/Seo'
import FriendLink from '../types/FriendLink'
import Banner from '../types/Banner'
import Area from '../types/Area'

export interface State {
    theme: string,
    typeList: Array<VodType>,
    seo: Seo | undefined,
    friendLinks: Array<FriendLink>,
    banners: Array<Banner>,
    areas: Area[]
}

const initState: State = {
    theme: 'dark',
    typeList: [],
    seo: undefined,
    friendLinks: [],
    banners: [],
    areas: []
}

const reducer = (state: State = initState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload }
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
        case 'SET_AREAS':
            return { ...state, areas: action.payload }
        default:
            return state
    }
}

const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk))

export const wrapper = createWrapper<Store<State>>(makeStore)