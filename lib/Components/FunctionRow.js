/** @babel */
/** @flow */

import React, { Component } from 'react'

export default class FunctionRow extends Component {
  renderType () {
    return (
      <span
        className='syntax--storage syntax--type syntax--function syntax--js'
        style={{
          paddingRight: '10px'
        }}
      >
        {this.props.type}
      </span>
    )
  }

  renderName () {
    return (
      <span
        className='syntax--entity syntax--name syntax--function syntax--js'
      >
        {this.props.name}
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
      {this.renderType()}
      {this.renderName()}
    </div>
    )
  }
}
