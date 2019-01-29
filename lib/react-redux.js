import React, { createContext, useEffect, useState } from 'react'

const Context = createContext(null)

export const Provider = (props) => {
  let unsubscribe = null
  const { store } = props
  const [storeState, setState] = useState(store.getState())

  useEffect(() => {
    unsubscribe = store.subscribe(() => {
      const newState = store.getState()
      setState(prevState => (prevState === newState ? prevState : newState))
    })
    return () => unsubscribe && unsubscribe()
  }, [props.store])

  return (
    <Context.Provider value={{
      storeState,
      store,
    }}
    >
      {props.children}
    </Context.Provider>
  )
}
const empty = () => ({})
export const connect = (
  mapStateToProps = empty,
  mapDispatchToProps = empty,
) => BaseComponent => props => (
  <Context.Consumer>
    {({ storeState, store }) => (
      <BaseComponent
        {...mapStateToProps(storeState, props)}
        {...mapDispatchToProps(store.dispatch, props)}
      />
    )}
  </Context.Consumer>
)
