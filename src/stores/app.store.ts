import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeMenu: '',
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
      state.activeMenu = action.payload
    },
    setMonitorId(state, action: PayloadAction<any>) {
      localStorage.setItem('monitor_id', action.payload)
      state.monitorId = action.payload
    },
    setMonitorIdAndProject(state, action: PayloadAction<any>) {
      localStorage.setItem('monitor_id', action.payload.monitor_id)
      state.monitorId = action.payload.monitor_id
      state.projectList = action.payload.projectList
    },
    setProjectList(state, action: PayloadAction<any>) {
      state.projectList = action.payload
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload
    }
  }
})

export const { setActiveMenu, setMonitorIdAndProject, setMonitorId, setProjectList, setUserInfo } = appStore.actions

export default appStore.reducer
