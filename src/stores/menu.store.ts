import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeMenuId: 0,
  title: '首页',
  path: '/'
}

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<any>) {
      Object.assign(state, action.payload)
    }
  }
})

export const { setActiveMenu } = menu.actions

export default menu.reducer
