export const moveIndex = (arr, indexes, newIndex) => {
  arr = [...arr]
  indexes = Array.isArray(indexes) ? [...indexes] : [indexes]

  const len = arr.length

  while (newIndex < 0) {
    newIndex += len
  }

  let i = 0
  while (indexes.length) {
    let oldIndex = indexes.splice(0, 1)[0]
    while (oldIndex < 0) {
      oldIndex += len
    }
    arr.splice(newIndex + i++, 0, arr.splice(oldIndex, 1)[0])
  }

  return arr
}

export const moveEl = (arr, els, newIndex) => {
  arr = [...arr]
  els = Array.isArray(els) ? [...els] : [els]

  let i = 0
  while (els.length) {
    const el = els.splice(0, 1)[0]
    const oldIndex = arr.indexOf(el)
    if (oldIndex === -1) continue
    arr.splice(newIndex + i++, 0, arr.splice(oldIndex, 1)[0])
  }

  return arr
}
