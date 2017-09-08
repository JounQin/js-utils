/**
 * 将数组 arr 中指定索引 toMoveIndexes 移动到 targetIndex 位置，targetIndex 可以是任意数字
 * <h6 class="important">此函数将修改 arr 和 els, 如果希望避免原数组被修改, 请在调用此函数前复制一个新数组</h6>
 *
 * @param {Array} arr         任意数组
 * @param {Array} toMoveIndexes 指定需要移动的索引
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

    if (index >= arr.length)
      throw new Error(`toMoveIndexes \`[${toMoveIndexes}]\` should be all included in arr indexes`)

    if (index < targetIndex) offset++
    return arr[index]
  })

  toMoveIndexes
    .sort()
    .reverse()
    .forEach(index => arr.splice(index, 1))

  arr.splice(targetIndex - offset, 0, ...toMoveEls)

  return arr
}

const findIndex = (arr, el, key) => arr.findIndex(item => (key == null ? item === el : item[key] === el[key]))

/**
 * 将数组 arr 中指定元素 toMoveEls 移动到 targetIndex 位置
 * <h6 class="important">此函数将修改 arr 和 toMoveEls, 如果希望避免原数组被修改, 请在调用此函数前复制一个新数组</h6>
 *
 * @param {Array} arr           任意数组
 * @param {*|Array} toMoveEls   指定需要移动的元素集合，可以是元素数组，不包含在原数组 arr 中的元素也将被添加到 arr 中
 * @param {*} targetIndex       目标索引值
 * @param {string} key          如果数组是对象数组，指定判断唯一性的键名称
 * @returns {Array}             原数组
 */
export const moveEl2Index = (arr, toMoveEls, targetIndex, key) => {
  if (targetIndex < 0) {
    targetIndex = Math.max(0, targetIndex + arr.length)
  }

  toMoveEls = Array.isArray(toMoveEls) ? toMoveEls : [toMoveEls]

  const toMoveIndexes = []

  let offset = 0

  toMoveEls.forEach(el => {
    const index = findIndex(arr, el, key)
    if (index !== -1) {
      toMoveIndexes.push(index)

      if (index < targetIndex) offset++
    }
  })

  toMoveIndexes
    .sort((x, y) => x - y)
    .reverse()
    .forEach(index => arr.splice(index, 1))

  arr.splice(targetIndex - offset, 0, ...toMoveEls)

  return arr
}

/**
 * 将数组 arr 中指定元素 toMoveEls 移动到 targetEl 位置
 * <h6 class="important">此函数将修改 arr 和 toMoveEls, 如果希望避免原数组被修改, 请在调用此函数前复制一个新数组</h6>
 *
 * @param {Array} arr           任意数组
 * @param {*|Array} toMoveEls   指定需要移动的元素集合，可以是元素数组，不包含在原数组 arr 中的元素也将被添加到 arr 中
 * @param {*} targetEl          包含在数组 arr 中的任意元素值
 * @param {string} key          如果数组是对象数组，指定判断唯一性的键名称
 * @param {boolean} next        插入到目标元素前方还是后方，默认插入到前方
 * @throws {Error}              传入 targetEl 在 arr 中找不到时将抛出异常
 * @returns {Array}             原数组
 */
export const moveEl = (arr, toMoveEls, targetEl, key, next) => {
  let targetIndex = findIndex(arr, targetEl, key)

  if (targetIndex === -1) throw new Error(`targetEl ${targetEl} should be included in arr ${arr} but not!`)

  if (next) targetIndex++

  moveEl2Index(arr, toMoveEls, targetIndex, key)

  return arr
}
