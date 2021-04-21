import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeMenuIndex: 0,
  projectList: [],
  monitorId: ''
}

const appStore = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<any>) {
      state.activeMenuIndex = action.payload
    },
    setMonitorId(state, action: PayloadAction<any>) {
      state.monitorId = action.payload
    },
    setProjectList(state, action: PayloadAction<any>) {
      state.projectList = action.payload
    }
  }
})

export const { setActiveMenu, setMonitorId, setProjectList } = appStore.actions

export default appStore.reducer
