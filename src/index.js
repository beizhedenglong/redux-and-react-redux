import React from 'react'
import ReactDOM from 'react-dom'
import createStore from '../lib/redux'
import { Provider, connect } from '../lib/react-redux'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counterReducer, 0)

const Counter = ({ count, inc, dec }) => (
  <div>
    <span>
      count:
      {count}
    </span>
    <button onClick={inc}>+1</button>
    <button onClick={dec}>-1</button>
  </div>
)

const CounterContainer = connect(
  state => ({ count: state }),
  dispatch => ({
    inc: () => dispatch({ type: 'INCREMENT' }),
    dec: () => dispatch({ type: 'DECREMENT' }),
  }),
)(Counter)


ReactDOM.render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('app'),
)
