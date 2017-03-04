'use babel'

import BabelSymbolsView from './babel-outline-view'
import { CompositeDisposable } from 'atom'

export default {

  panel: null,
  subscriptions: null,

  activate (state) {
    this.babelSymbolsView = new BabelSymbolsView(state.babelSymbolsViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.babelSymbolsView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'babel-outline:toggle': () => this.toggle()
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.babelSymbolsView.destroy()
  },

  serialize () {
    return {
      babelSymbolsViewState: this.babelSymbolsView.serialize()
    }
  },

  toggle () {
    console.log('BabelSymbols was toggled!')
    return (
      this.modalPanel.isVisible()
      ? this.modalPanel.hide()
      : this.modalPanel.show()
    )
  }

}
