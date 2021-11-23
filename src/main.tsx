import { message } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import 'antd/dist/antd.less'
import './index.css'
import store from './stores'

const b = '11'

message.config({
  maxCount: 1
})

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
  document.getElementById('root')
)
