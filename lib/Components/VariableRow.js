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
        className='syntax--variable syntax--other syntax--constant syntax--js'
      >
        {this.props.name ? this.props.name : '{}'}
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
      {this.renderKind()}
      {this.renderName()}
    </div>
    )
  }
}
