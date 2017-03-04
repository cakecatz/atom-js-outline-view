'use babel'

const hello = 1

export default class BabelSymbolsView {
  constructor (serializedState) {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('babel-outline')

    // Create message element
    let a = 1
    var b = 2
    const a = 1,
      b = 2
    const message = document.createElement('div')
    message.textContent = 'The BabelSymbols package is Alive! It\'s ALIVE!'
    message.classList.add('message')
    this.element.appendChild(message)
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {}

  // Tear down any state and detach
  destroy () {
    this.element.remove()
  }

  getElement () {
    return this.element
  }
}

function hell () {}
