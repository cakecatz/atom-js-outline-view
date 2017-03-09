'use babel'

import { combineReducers } from 'redux'
import outlines from './outlines'
import currentFile from './currentFile'

const babelOutline = combineReducers({
  currentFile,
  outlines
})

export default babelOutline
