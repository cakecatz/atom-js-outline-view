/** @babel */
/** @flow */

import React, { Component } from 'react'

type Props = {
  type: string,
  name: string,
  depth: number,
  onRowClick: () => void,
}

export default class ClassRow extends Component {
  props: Props;

  renderType () {
    return (
      <span
        className='syntax--storage syntax--type syntax--class syntax--js'
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
        className='syntax--entity syntax--name syntax--class syntax--js'
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
      onClick={() => onRowClick(this.props)}
      style={{
        marginLeft: `${depth * 10}px`
      }}
    >
      {this.renderType()}
      {this.renderName()}
    </div>
    )
  }
}
