import { combineReducers } from '@reduxjs/toolkit'
import appStore from './app.store'

const rootReducer = combineReducers({
  appsotre: appStore
})

export default rootReducer
