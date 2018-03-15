import { moveEl, moveIndex, shuffle } from '../src'

test('should deep equal', () => {
  expect(moveEl([1, 2, 3, 4], [1, 2, 3], 1)).toEqual([1, 2, 3, 4])
  expect(moveEl([1, 2, 3, 4], [1, 2, 3, 4], 4)).toEqual([1, 2, 3, 4])
  expect(moveEl([1, 2, 3], 2, 2)).toEqual([1, 2, 3])
  expect(moveEl([3, 6, 0, 8, 2, 4], 6, 4)).toEqual([3, 0, 8, 2, 6, 4])
  expect(moveEl([3, 6, 0, 8, 2, 4], [6, 8], 3)).toEqual([6, 8, 3, 0, 2, 4])
  expect(moveEl([3, 6, 0, 8, 2, 4], [0, 4], 2)).toEqual([3, 6, 8, 0, 4, 2])
  expect(moveEl([3, 6, 0, 8, 2, 4], [6, 2], 0)).toEqual([3, 6, 2, 0, 8, 4])
  expect(moveEl([3, 6, 0, 8, 2, 4], [2, 6], 0)).toEqual([3, 2, 6, 0, 8, 4])
  expect(moveEl([3, 6, 0, 8, 2, 4], [2, 6, 9], 8)).toEqual([
    3,
    0,
    2,
    6,
    9,
    8,
    4,
  ])
})

test('should throw error', () => {
  expect(moveEl.bind(null, [3, 6, 0, 8, 2, 4], 1, 5)).toThrow(
    'targetEl 5 should be included in arr 3,6,0,8,2,4 but not!',
  )
})

test('should deep equal', () => {
  expect(moveIndex([1, 2, 3, 4], [1, 2, 3], 1)).toEqual([1, 2, 3, 4])
  expect(moveIndex([1, 2, 3, 4], [0, 1, 2, 3], 4)).toEqual([1, 2, 3, 4])
  expect(moveIndex([1, 2, 3], 2, 2)).toEqual([1, 2, 3])
  expect(moveIndex([1, 2, 3], 2, -1)).toEqual([1, 2, 3])
  expect(moveIndex([3, 6, 0, 8, 2, 4], 2, 4)).toEqual([3, 6, 8, 0, 2, 4])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 4], 3)).toEqual([3, 6, 0, 2, 8, 4])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [0, 4], 2)).toEqual([6, 3, 2, 0, 8, 4])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [5, 2], 0)).toEqual([4, 0, 3, 6, 8, 2])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5], 0)).toEqual([0, 4, 3, 6, 8, 2])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5, 3], 4)).toEqual([
    3,
    6,
    0,
    4,
    8,
    2,
  ])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5, 3], 6)).toEqual([
    3,
    6,
    2,
    0,
    4,
    8,
  ])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5, 3], 100)).toEqual([
    3,
    6,
    2,
    0,
    4,
    8,
  ])
  expect(moveIndex([3, 6, 0, 8, 2, 4], [-1, 2, 3], 100)).toEqual([
    3,
    6,
    2,
    4,
    0,
    8,
  ])
})

test('should throw error', () => {
  expect(moveIndex.bind(null, [3, 6, 0, 8, 2, 4], [1, 9], 5)).toThrow(
    'toMoveIndexes `[1,9]` should be all included in arr indexes',
  )
})

test('shuffle correctly', () => {
  const indexes = {}
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  for (let i = 0; i < 100000; i++) {
    const shuffled = shuffle(arr)
    arr.forEach(v => {
      const index = shuffled.indexOf(v)

      let result = indexes[v]

      if (!result) {
        result = indexes[v] = []
      }

      if (result[index] == null) {
        result[index] = 0
      }

      result[index]++
    })
  }

  Object.values(indexes).forEach(values => {
    expect(Math.min(...values)).toBeGreaterThan(9600)
    expect(Math.max(...values)).toBeLessThan(10400)
  })
})
