'use babel'

import outlineParser from '../parser'

const UPDATED_OUTLINE = 'UPDATED_OUTLINE'
const CLEAR_OUTLINES = 'CLEAR_OUTLINES'

const initialState = { }

export const updateOutline = (filePath) => {
  return dispatch => {
    return outlineParser(filePath).then((value) => {
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

export const clearOutlines = () => {
  return {
    type: CLEAR_OUTLINES
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case UPDATED_OUTLINE:
      return {
        ...state,
        [action.filePath]: action.outline
      }
    case CLEAR_OUTLINES:
      return initialState
    default:
      return state
  }
}
