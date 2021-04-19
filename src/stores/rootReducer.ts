import { combineReducers } from '@reduxjs/toolkit'
import menuReducer from './menu.store'

const rootReducer = combineReducers({
  menu: menuReducer
})

export default rootReducer
