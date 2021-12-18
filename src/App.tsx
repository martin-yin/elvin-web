import 'moment/locale/zh-cn'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBound from './components/error/errorBound'
import { FilterHeaderProvider } from './components/filterHeader/hook/useFilterHeaderInit'
import { RenderRouter } from './router/router'

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBound>
        <FilterHeaderProvider>
          <RenderRouter />
        </FilterHeaderProvider>
      </ErrorBound>
    </BrowserRouter>
  )
}

export default App
