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
    if (nextProps.currentFile !== '' && !nextProps.outline) {
      this.props.updateOutline(nextProps.currentFile)
    }
  }

  handleRowClick = ({ loc }) => {
    const textEditor = atom.workspace.getActiveTextEditor()
    if (textEditor) {
      textEditor.setCursorBufferPosition([
        loc.start.line - 1,
        loc.start.column
      ])
    }
  }

  renderContent () {
    if (this.props.outline) {
      return this.props.outline.map((item) => {
        switch (item.type) {
          case 'variable':
            return <VariableRow {...item} onRowClick={this.handleRowClick} />
          case 'class':
            return <ClassRow {...item} onRowClick={this.handleRowClick} />
          case 'method':
            return <MethodRow {...item} onRowClick={this.handleRowClick} />
          case 'function':
            return <FunctionRow {...item} onRowClick={this.handleRowClick} />
        }
        return null
      })
    }

    if (this.props.currentFile === '') {
      return 'Not Support'
    }

    return 'Loading outline'
  }

  render () {
    return (
      <div
        className="js-outline-panel"
        style={{
          padding: '20px',
          flex: 1,
          width: '300px'
        }}
      >
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = ({ outlines, currentFile }) => ({
  outline: outlines[currentFile],
  currentFile
})

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
