/** @babel */
/** @flow */

import { CompositeDisposable } from 'atom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import app, {
  changeActiveFile,
  clearCache
} from './ducks/outlines'

import App from './App'

export default {

  outlinePanel: null,
  subscriptions: null,

  activate (state) {
    const composeEnhancers = composeWithDevTools({ realtime: true })
    this.store = createStore(app, state, composeEnhancers(
      applyMiddleware(thunk),
    ))

    this.subscriptions = new CompositeDisposable()

    this.initCommands()
    this.initView()

    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem((item) => {
      if (atom.workspace.isTextEditor(item)) {
        if (['source.js.jsx', 'source.js'].includes(item.getGrammar().scopeName)) {
          this.store.dispatch(changeActiveFile(item.getPath()))
        }
      }
    }))
  },

  initCommands () {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'babel-outline:toggle': () => this.toggle()
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'babel-outline:clear-cache': () => this.store.dispatch(clearCache())
    }))
  },

  initView () {
    const rootElement = document.createElement('div')
    rootElement.className = 'babel-outline-pane'

    atom.workspace.addRightPanel({
      item: rootElement
    })

    ReactDOM.render(
      <Provider store={this.store}>
        <App />
      </Provider>,
      rootElement
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
    return this.store.getState()
  },

  // @todo
  toggle () {
    console.log('toggle')
  }

}
