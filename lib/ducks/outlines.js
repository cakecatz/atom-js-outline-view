'use babel'

import outlineParser from '../parser'

const UPDATED_OUTLINE = 'UPDATED_OUTLINE'
const CHANGED_FILE = 'CHANGE_FILE'
const CLEAR_CACHE = 'CLEAR_CACHE'

const initialState = {
  currentFilePath: null,
  outline: null,
  outlines: {}
}

export const updateOutline = (filePath) => {
  return dispatch => {
    return outlineParser(filePath).then((value) => {
      console.log(value)
      dispatch({
        type: UPDATED_OUTLINE,
        outline: value,
        filePath
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

export const changeActiveFile = (filePath) => {
  return {
    type: CHANGED_FILE,
    filePath
  }
}

export const clearCache = () => {
  return {
    type: CLEAR_CACHE
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case UPDATED_OUTLINE:
      return {
        ...state,
        outline: action.outline,
        outlines: {
          ...state.outlines,
          [action.filePath]: action.outline
        }
      }
    case CHANGED_FILE:
      return {
        ...state,
        outline: state.outlines[action.filePath],
        currentFilePath: action.filePath
      }
    case CLEAR_CACHE:
      return initialState
    default:
      return state
  }
}
