/** @babel */
/** @flow */
import React, { Component } from 'react'

export default class VariableRow extends Component {
  renderKind () {
    return (
      <span
        className='syntax--storage syntax--type syntax--js'
        style={{
          paddingRight: '10px'
        }}
      >
        {this.props.kind}
      </span>
    )
  }

  renderName () {
    return (
      <span
        className='syntax--variable syntax--js'
      >
        {this.props.name ? this.props.name : '{}'}
      </span>
    )
  }

  render () {
    const { depth, onRowClick } = this.props
    return (
    <div
      className='js-outline-row'
      style={{
        marginLeft: `${depth * 10}px`
      }}
      onClick={() => onRowClick(this.props)}
    >
      {this.renderKind()}
      {this.renderName()}
    </div>
    )
  }
}
