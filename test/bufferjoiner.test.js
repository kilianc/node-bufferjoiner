var BufferJoiner = require('../'),
    expect = require('chai').expect

describe('BufferJoiner', function () {
  describe('#()', function () {
    it('should work as function', function () {
      expect(BufferJoiner()).to.be.instanceOf(BufferJoiner)
    })
    it('should work as constructor', function () {
      expect(new BufferJoiner()).to.be.instanceOf(BufferJoiner)
    })
    it('should create properties', function () {
      var bf = new BufferJoiner()
      expect(bf._length).to.be.equal(0)
      expect(bf._buffersList).to.be.instanceOf(Array)
      expect(bf._buffersList).to.be.lengthOf(0)
    })
  })
  describe('#add()', function () {
    it('should store chunks and update length', function () {
      var bf = BufferJoiner()
      var buff1 = Buffer('aaa')
      var buff2 = Buffer('bbb')

      bf.add(buff1)
      bf.add(buff2)

      expect(bf._buffersList).to.be.lengthOf(2)
      expect(bf._buffersList[0]).to.be.equal(buff1)
      expect(bf._buffersList[1]).to.be.equal(buff2)
      expect(bf._length).to.be.equal(6)
    })
  })
  describe('#join()', function () {
    before(function () {
      var bf = BufferJoiner()
      var buff1 = Buffer('aaa')
      var buff2 = Buffer('bbb')

      bf.add(buff1)
      bf.add(buff2)

      this.merged = bf.join()
      this.bf = bf
    })
    it('should return merged chunks', function () {
      expect(this.merged).to.be.lengthOf(6)
      expect(this.merged.toString()).to.be.equal('aaabbb')
    })
    it('should reset status', function () {
      expect(this.bf._length).to.be.equal(0)
      expect(this.bf._buffersList).to.be.eql([])
    })
    it('should reAdd if asked', function () {
      this.bf.add(Buffer('a'))
      this.bf.add(Buffer('b'))
      this.merged = this.bf.join(true)

      expect(this.bf._buffersList).to.be.lengthOf(1)
      expect(this.bf._length).to.be.equal(2)
      expect(this.bf._buffersList[0]).to.be.equal(this.merged)
    })
  })
  describe('#length', function () {
    it('should return total length', function () {
      var bf = BufferJoiner()
      bf.add(Buffer('aaa'))
      expect(bf.length).to.be.equal(3)
    })
  })
})