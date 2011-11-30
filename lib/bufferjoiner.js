var BufferJoiner = function(){
  this.buffersList = [];
  this.length = 0;
};

BufferJoiner.prototype.add = function(buffer){
  this.buffersList.push(buffer);
  this.length += buffer.length;
  return this;
};

BufferJoiner.prototype.join = function(reAdd){

  var totalBuffer = new Buffer(this.length);
  var lastFreeIndex = 0;

  while(buffer = this.buffersList.shift()){
    buffer.copy(totalBuffer, lastFreeIndex);
    lastFreeIndex += buffer.length;
  }

  this.length = 0;
  reAdd && this.add(totalBuffer);

  return totalBuffer;
};

module.exports = BufferJoiner;