/** @babel */
/** @flow */

import { CompositeDisposable } from 'atom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import reducer from './ducks'
import {
  clearOutlines,
  updateOutline
} from './ducks/outlines'
import {
  changeActiveFile
} from './ducks/currentFile'
import path from 'path'

import App from './App'

export default {

  outlinePanel: null,
  subscriptions: null,
  editors: [],

  activate (state) {
    const composeEnhancers = composeWithDevTools({
      realtime: true,
      port: 23456
    })
    this.store = createStore(reducer, state, composeEnhancers(
      applyMiddleware(thunk),
    ))

    this.subscriptions = new CompositeDisposable()

    this.initCommands()
    this.initView()
    this.initHandlers()

    const activeItem = atom.workspace.getActivePaneItem()
    if (this.isItemJSFile(activeItem)) {
      this.store.dispatch(changeActiveFile(activeItem.getPath()))
    }
  },

  isItemJSFile (paneItem) {
    if (!atom.workspace.isTextEditor(paneItem)) {
      return false
    }

    if (['source.js.jsx', 'source.js'].includes(paneItem.getGrammar().scopeName)) {
      return true
    }

    return false
  },

  initHandlers () {
    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem((item) => {
      if (this.isItemJSFile(item)) {
        this.store.dispatch(changeActiveFile(item.getPath()))
        this.panel.show()
      } else {
        this.store.dispatch(changeActiveFile(''))
        this.panel.hide()
      }
    }))

    this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
      this.subscriptions.add(editor.onDidSave((item) => {
        if (['.jsx', '.js'].includes(path.extname(item.path))) {
          this.store.dispatch(updateOutline(item.path))
        }
      }))
    }))
  },

  initCommands () {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'js-outline:toggle': () => this.toggle()
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'js-outline:clear-outlines': () => this.store.dispatch(clearOutlines())
    }))
  },

  initView () {
    const rootElement = document.createElement('div')
    rootElement.className = 'js-outline-pane'

    this.panel = atom.workspace.addRightPanel({
      item: rootElement
    })

    ReactDOM.render(
      <Provider store={this.store}>
        <App />
      </Provider>,
      rootElement
    )
  },

  toggle () {
    if (this.panel.isVisible()) {
      this.panel.hide()
    } else {
      this.panel.show()
    }
  },

  deactivate () {
    this.store = null
    this.panel.destroy()
    this.subscriptions.dispose()
  },

  serialize () {
    return {
      ...this.store.getState(),
      currentFile: ''
    }
  }
}
