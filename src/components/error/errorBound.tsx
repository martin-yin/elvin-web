import React from 'react'

class ErrorBound extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError ? '哥我来了' : this.props.children
  }
}

export default ErrorBound
