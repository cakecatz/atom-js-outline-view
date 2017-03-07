'use babel'

/** @jsx */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateOutline } from './ducks/outlines'
import VariableRow from './Components/VariableRow'
import ClassRow from './Components/ClassRow'
import MethodRow from './Components/MethodRow'
import FunctionRow from './Components/FunctionRow'

class App extends Component {
  componentWillReceiveProps (nextProps) {
    if (!nextProps.outline) {
      this.props.updateOutline(nextProps.currentFilePath)
    }
  }

  renderContent () {
    if (this.props.outline) {
      return this.props.outline.map((item) => {
        switch (item.type) {
          case 'variable':
            return <VariableRow {...item} />
          case 'class':
            return <ClassRow {...item} />
          case 'method':
            return <MethodRow {...item} />
          case 'function':
            return <FunctionRow {...item} />
        }
        return null
      })
    }

    return 'Loading outline'
  }

  render () {
    return (
      <div
        className="babel-outline-panel"
        style={{
          padding: '20px',
          flex: 1,
          width: '400px'
        }}
      >
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
  return {
    updateOutline: (filePath) => {
      dispatch(updateOutline(filePath))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
