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
  if (index < 0) {
    index = Math.max(0, index + arr.length)
  }

  if (prependIndex < 0) {
    prependIndex = Math.max(0, prependIndex + arr.length)
  }

  arr.splice(index >= prependIndex ? prependIndex : prependIndex - 1, 0, arr.splice(index, 1)[0])

  return arr
}

const findIndex = (arr, el, key) => arr.findIndex(item => key == null ? item === el : item[key] === el[key])

/**
 * 将数组 arr 中指定元素 els 移动到 prependEl 前
 * <h6 class="important">此函数将修改 arr 和 els, 如果希望避免原数组被修改, 请在调用此函数前复制一个新数组</h6>
 *
 * @param {Array} arr     任意数组
 * @param {*|Array} els   指定需要移动的元素集合，可以是元素数组，不包含在原数组 arr 中的元素也将被添加到 arr 中
 * @param {*} prependEl   包含在数组 arr 中的任意元素值
 * @param {string} key    如果数组是对象数组，指定判断唯一性的键名称
 * @throws {Error}        传入 prependEl 在 arr 中找不到时将抛出异常
 * @returns {Array}       原数组
 */
export const moveEl = (arr, els, prependEl, key) => {
  let prependIndex = findIndex(arr, prependEl, key)
  if (prependIndex === -1) throw new Error(`prependEl ${prependEl} should be included in arr ${arr} but not!`)

  els = Array.isArray(els) ? els : [els]

  // 当需要移动的元素集合中包含目标元素且不是最后一个元素时，自动将目标元素定位到下一个不包含在 els 中的元素或 els 的最后一个元素
  const preIndex = findIndex(els, prependEl, key)

  if (preIndex !== -1 && preIndex !== els.length - 1) {
    while (true) {
      const index = prependIndex++
      if (index > arr.length - 1 || findIndex(els, prependEl = arr[index], key) === -1) {
        break
      }
    }
  }

  while (els.length) {
    const el = els.splice(0, 1)[0]
    const index = findIndex(arr, el, key)
    const prependIndex = findIndex(arr, prependEl, key)
    if (index === -1) {
      arr.splice(prependIndex, 0, el)
      continue
    }
    move(arr, index, prependIndex)
  }

  return arr
}

/**
 * 将数组 arr 中指定索引 toMoveIndexes 移动到 targetIndex 位置，targetIndex 可以是任意数字
 * <h6 class="important">此函数将修改 arr 和 els, 如果希望避免原数组被修改, 请在调用此函数前复制一个新数组</h6>
 *
 * @param {Array} arr         任意数组
 * @param {int} toMoveIndexes 指定需要移动的索引
 * @param {int }targetIndex   目标索引
 * @returns {Array}           原数组
 */
export const moveIndex = (arr, toMoveIndexes, targetIndex) => {
  if (targetIndex < 0) {
    targetIndex = Math.max(0, targetIndex + arr.length)
  }

  toMoveIndexes = Array.isArray(toMoveIndexes) ? toMoveIndexes : [toMoveIndexes]

  let offset = 0

  const toMoveEls = toMoveIndexes.map((index, i) => {
    if (index < 0) {
      index = toMoveIndexes[i] = Math.max(0, index + arr.length)
    }

    if (index >= arr.length) throw new Error(`toMoveIndexes \`[${toMoveIndexes}]\` should be all included in arr indexes`)

    if (index < targetIndex) offset++
    return arr[index]
  })

  toMoveIndexes.sort().reverse().forEach(index => arr.splice(index, 1))

  arr.splice(targetIndex - offset, 0, ...toMoveEls)

  return arr
}
