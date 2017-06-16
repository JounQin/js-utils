const {move, moveEl, moveIndex} = require('../dist')
const expect = require('chai').expect

describe('arr move base', () => {
  it('should deep equal', () => {
    expect(move([3, 6, 7, 9, 0, 2, 5], 4, 2)).to.be.deep.equal([3, 6, 0, 7, 9, 2, 5])
    expect(move([3, 6, 7, 9, 0, 2, 5], 1, 0)).to.be.deep.equal([6, 3, 7, 9, 0, 2, 5])
    expect(move([3, 6, 7, 9, 0, 2, 5], 1, 2)).to.be.deep.equal([3, 6, 7, 9, 0, 2, 5])
    expect(move([3, 6, 7, 9, 0, 2, 5], 2, 1)).to.be.deep.equal([3, 7, 6, 9, 0, 2, 5])
    expect(move([3, 6, 7, 9, 0, 2, 5], 1, 3)).to.be.deep.equal([3, 7, 6, 9, 0, 2, 5])
    expect(move([3, 6, 7, 9, 0, 2, 5], 1, 1)).to.be.deep.equal([3, 6, 7, 9, 0, 2, 5])
  })
})

describe('arr move el', () => {
  it('should deep equal', () => {
    expect(moveEl([1, 2, 3, 4], [1, 2, 3], 1)).to.be.deep.equal([1, 2, 3, 4])
    expect(moveEl([1, 2, 3, 4], [1, 2, 3, 4], 4)).to.be.deep.equal([1, 2, 3, 4])
    expect(moveEl([1, 2, 3], 2, 2)).to.be.deep.equal([1, 2, 3])
    expect(moveEl([3, 6, 0, 8, 2, 4], 6, 4)).to.be.deep.equal([3, 0, 8, 2, 6, 4])
    expect(moveEl([3, 6, 0, 8, 2, 4], [6, 8], 3)).to.be.deep.equal([6, 8, 3, 0, 2, 4])
    expect(moveEl([3, 6, 0, 8, 2, 4], [0, 4], 2)).to.be.deep.equal([3, 6, 8, 0, 4, 2])
    expect(moveEl([3, 6, 0, 8, 2, 4], [6, 2], 0)).to.be.deep.equal([3, 6, 2, 0, 8, 4])
    expect(moveEl([3, 6, 0, 8, 2, 4], [2, 6], 0)).to.be.deep.equal([3, 2, 6, 0, 8, 4])
    expect(moveEl([3, 6, 0, 8, 2, 4], [2, 6, 9], 8)).to.be.deep.equal([3, 0, 2, 6, 9, 8, 4])
  })

  it('should throw error', () => {
    expect(moveEl.bind(null, [3, 6, 0, 8, 2, 4], 1, 5)).to.throw('prependEl 5 should be included in arr 3,6,0,8,2,4 but not!')
  })
})

describe('arr move index', () => {
  it('should deep equal', () => {
    expect(moveIndex([1, 2, 3, 4], [1, 2, 3], 1)).to.be.deep.equal([1, 2, 3, 4])
    expect(moveIndex([1, 2, 3, 4], [0, 1, 2, 3], 4)).to.be.deep.equal([1, 2, 3, 4])
    expect(moveIndex([1, 2, 3], 2, 2)).to.be.deep.equal([1, 2, 3])
    expect(moveIndex([1, 2, 3], 2, -1)).to.be.deep.equal([1, 2, 3])
    expect(moveIndex([3, 6, 0, 8, 2, 4], 2, 4)).to.be.deep.equal([3, 6, 8, 0, 2, 4])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 4], 3)).to.be.deep.equal([3, 6, 0, 2, 8, 4])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [0, 4], 2)).to.be.deep.equal([6, 3, 2, 0, 8, 4])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [5, 2], 0)).to.be.deep.equal([4, 0, 3, 6, 8, 2])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5], 0)).to.be.deep.equal([0, 4, 3, 6, 8, 2])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5, 3], 4)).to.be.deep.equal([3, 6, 0, 4, 8, 2])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5, 3], 6)).to.be.deep.equal([3, 6, 2, 0, 4, 8])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [2, 5, 3], 100)).to.be.deep.equal([3, 6, 2, 0, 4, 8])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [-1, 2, 3], 100)).to.be.deep.equal([3, 6, 2, 4, 0, 8])
  })

  it('should throw error', () => {
    expect(moveIndex.bind(null, [3, 6, 0, 8, 2, 4], [1, 9], 5)).to.throw('toMoveIndexes `[1,9]` should be all included in arr indexes')
  })
})
