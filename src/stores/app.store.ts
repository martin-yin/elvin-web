import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeMenuIndex: 0,
  projectList: [],
  monitorId: '',
  userInfo: {
    nick_name: ''
  }
}

const appStore = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<any>) {
      state.activeMenuIndex = action.payload
    },
    setMonitorId(state, action: PayloadAction<any>) {
      localStorage.setItem('monitor_id', action.payload)
      state.monitorId = action.payload
    },
    setProjectList(state, action: PayloadAction<any>) {
      state.projectList = action.payload
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload
    }
  }
})

export const { setActiveMenu, setMonitorId, setProjectList, setUserInfo } = appStore.actions

export default appStore.reducer
