export const move = (arr, index, prependIndex) => {
  while (index < 0) {
    index += arr.length
  }

  while (prependIndex < 0) {
    prependIndex += arr.length
  }

  arr = [...arr]

  arr.splice(index >= prependIndex ? prependIndex : prependIndex - 1, 0, arr.splice(index, 1)[0])

  return arr
}

export const moveEl = (arr, els, prependEl) => {
  if (!arr.includes(prependEl)) throw new Error(`prependEl ${prependEl} should be included in arr ${arr} but not!`)

  arr = [...arr]

  els = Array.isArray(els) ? [...els] : [els]

  while (els.length) {
    const el = els.splice(0, 1)[0]
    const index = arr.indexOf(el)
    const prependIndex = arr.indexOf(prependEl)
    if (index === -1) {
      arr.splice(prependIndex, 0, el)
      continue
    }
    arr = move(arr, index, prependIndex)
  }

  return arr
}
