import 'moment/locale/zh-cn'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBound from './components/error/errorBound'
import { RenderRouter } from './router/router'

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBound>
        <RenderRouter />
      </ErrorBound>
    </BrowserRouter>
  )
}

export default App
