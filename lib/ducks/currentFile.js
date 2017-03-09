'use babel'

const CHANGED_FILE = 'CHANGE_FILE'

const initialState = ''

export const changeActiveFile = (filePath) => {
  return {
    type: CHANGED_FILE,
    filePath
  }
}

export default function reducer (state = initialState, { type, filePath }) {
  if (type === CHANGED_FILE) {
    return filePath
  }

  return state
}
