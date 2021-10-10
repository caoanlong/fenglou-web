import {createStore, applyMiddleware, Middleware} from 'redux'
import thunk from 'redux-thunk'
import {createWrapper} from 'next-redux-wrapper'
import reducers from './reducers'


const bindMiddleware = (middleware: Middleware<any, any, any>[]) => {
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension")
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const makeStore = () => {
    return createStore(reducers, bindMiddleware([thunk]))
}

export type RootState = ReturnType<typeof reducers>

export const wrapper = createWrapper(makeStore)

