const {moveIndex, moveEl} = require('../dist')
const expect = require('chai').expect

describe('arr move index', () => {
  it('should deep equal', () => {
    expect(moveIndex([1, 2, 3], 0, 1)).to.be.deep.equal([2, 1, 3])
    expect(moveIndex([3, 6, 0, 8, 2, 4], 5, 2)).to.be.deep.equal([3, 6, 4, 0, 8, 2])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [3, 5], 2)).to.be.deep.equal([3, 6, 8, 4, 0, 2])
    expect(moveIndex([3, 6, 0, 8, 2, 4], [3, 5], 4)).to.be.deep.equal([3, 6, 0, 2, 8, 4])
  })
})

describe('arr move el', () => {
  it('should deep equal', () => {
    expect(moveEl([1, 2, 3], 2, 2)).to.be.deep.equal([1, 3, 2])
    expect(moveEl([3, 6, 0, 8, 2, 4], 6, 4)).to.be.deep.equal([3, 0, 8, 2, 6, 4])
    expect(moveEl([3, 6, 0, 8, 2, 4], [6, 8], 3)).to.be.deep.equal([3, 0, 6, 8, 2, 4])
  })
})
