import React from 'react'

export default class Counter extends React.Component {
  state = {
    count: 0,
  }

  render() {
    return <div>{this.state.count}</div>
  }
}
