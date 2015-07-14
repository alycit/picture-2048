Array.prototype.eachSlice = function (size, callback){
  for (var i = 0, l = this.length; i < l; i += size){
    callback.call(this, this.slice(i, i + size));
  }
};

String.prototype.repeat = function(n){

  var result = "";
  for(var i = 0; i < n; i++) {
    result = result.concat(this);
  }
  return result;
}