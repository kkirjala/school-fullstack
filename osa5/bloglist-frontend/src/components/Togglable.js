import React from 'react'

class Togglable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible} onClick={this.toggleVisibility}>
            {this.props.buttonLabel}
          </div>
          <div style={showWhenVisible} onClick={this.toggleVisibility}>
            {this.props.children}
          </div>
        </div>
      )
    }
}

export default Togglable