import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeMenuIndex: 0,
  projectList: [],
  activeProjectId: 0
}

const appStore = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<any>) {
      state.activeMenuIndex = action.payload
    },
    setActiePorjectId(state, action: PayloadAction<any>) {
      state.activeProjectId = action.payload
    }
  }
})

export const { setActiveMenu, setActiePorjectId } = appStore.actions

export default appStore.reducer
