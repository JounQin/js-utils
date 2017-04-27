/**
 * 将数组 arr 中指定索引为 index 的元素移动到 prependIndex 前
 * <h6 class="important">此函数将修改 arr, 如果希望避免原数组被修改, 请在调用此函数前复制一个新数组</h6>
 *
 * @param {Array} arr - 任意数组
 * @param {Number} index - 指定需要移动的索引值, 应为整数 (支持负整数)
 * @param {Number} prependIndex - 移动到目标索引值, 应为整数 (支持负整数)
 * @returns {Array} 原数组
 */
export const move = (arr, index, prependIndex) => {
  while (index < 0) {
    index += arr.length
  }

  while (prependIndex < 0) {
    prependIndex += arr.length
  }

  arr.splice(index >= prependIndex ? prependIndex : prependIndex - 1, 0, arr.splice(index, 1)[0])

  return arr
}

/**
 * 将数组 arr 中指定元素 els 移动到 prependEl 前
 * <h6 class="important">此函数将修改 arr 和 els, 如果希望避免原数组被修改, 请在调用此函数前复制一个新数组</h6>
 *
 * @param {Array} arr     任意数组
 * @param {*|Array} els   指定需要移动的元素集合，可以是元素数组，不包含在原数组 arr 中的元素也将被添加到 arr 中
 * @param {*} prependEl   包含在数组 arr 中的任意元素值
 * @throws {Error}        传入 prependEl 在 arr 中找不到时将抛出异常
 * @returns {Array}       原数组
 */
export const moveEl = (arr, els, prependEl) => {
  if (!arr.includes(prependEl)) throw new Error(`prependEl ${prependEl} should be included in arr ${arr} but not!`)

  els = Array.isArray(els) ? els : [els]

  while (els.length) {
    const el = els.splice(0, 1)[0]
    const index = arr.indexOf(el)
    const prependIndex = arr.indexOf(prependEl)
    if (index === -1) {
      arr.splice(prependIndex, 0, el)
      continue
    }
    move(arr, index, prependIndex)
  }

  return arr
}
