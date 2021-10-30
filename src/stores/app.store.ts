import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  menuKeys: {
    selectKeys: [],
    openKeys: []
  },
  projects: [],
  monitorId: '',
  userInfo: {
    nick_name: ''
  }
}

const appStore = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuKeys(state, action: PayloadAction<any>) {
      state.menuKeys = action.payload
    },
    setMonitorId(state, action: PayloadAction<any>) {
      localStorage.setItem('monitor_id', action.payload)
      state.monitorId = action.payload
    },
    setMonitorIdAndProject(state, action: PayloadAction<any>) {
      localStorage.setItem('monitor_id', action.payload.monitor_id)
      state.monitorId = action.payload.monitor_id
      state.projects = action.payload.projects
    },
    setProjects(state, action: PayloadAction<any>) {
      state.projects = action.payload
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload
    }
  }
})

export const { setMenuKeys, setMonitorIdAndProject, setMonitorId, setProjects, setUserInfo } = appStore.actions

export default appStore.reducer
