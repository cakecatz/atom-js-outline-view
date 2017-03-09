/** @babel */
/** @flow */

import React, { Component } from 'react'

export default class MethodRow extends Component {
  renderName () {
    return (
      <span
        className='syntax--entity syntax--name syntax--function syntax--method syntax--js'
        style={{
          paddingRight: '5px'
        }}
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
      {this.renderName()}{`( )`}
    </div>
    )
  }
}
