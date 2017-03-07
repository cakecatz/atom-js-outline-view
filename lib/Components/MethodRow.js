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
    const { depth } = this.props
    return (
    <div
      className='babel-outline-vairable'
      style={{
        marginLeft: `${depth * 10}px`
      }}
    >
      {this.renderName()}{`( )`}
    </div>
    )
  }
}
