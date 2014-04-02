function MapContext (partitions) {
  this.partitions = partitions;
  var x = [];
  for (var i = 0; i < partitions ; i++){
    x[i] = [];
  }
  this.getX = function() {
    return x;
  };
  /* TODO secondary sort on value */
  this.emit = function(key, value) {
    var bucket = x[key.mrHashCode() % partitions];
    for (var i = 0; i < bucket.length; i++){
      var innerArray = bucket[i]; 
      var compRes = key.mrCompareTo(innerArray[0]);
      if (compRes == 0){
        innerArray[1].push(value);
        return;
      }
      if (compRes == -1){
        bucket.splice(i, 0, [key, [value]] );
        return;
      }
    }
    bucket.push([key, [value]]);
  };
  this.dump = function(){
    for (var i = 0; i < partitions ; i++){
      var arr = x[i];
      for (var j = 0; j < arr.length; j++ ) {
        var twoParts = arr[j];
        var values = twoParts[1];
        var cat = "[";
        for (var k =0 ; k < values.length; k++){
          cat += values[k].mrToString() +' ';
        }
        cat +=']';
	alert('partition:' + i + ' ' + twoParts[0].mrToString() + ' ' + cat);
      }
    }
  };
}

function Driver (data, mapContext, mapFx, reduceContext, reduceFx){
  this.data = data;
  this.mapContext = mapContext;
  this.mapFx = mapFx;
  this.reduceFx = reduceFx;
  this.reduceContext = reduceContext;

  this.mapPhase = function () {
    for (var i = 0; i < data.length ; i++){
      mapFx(data[i], mapContext);
    }
  };

  this.reducePhase = function () {
    for (var i = 0; i < mapContext.getX().length ; i++){
      var arr = mapContext.getX()[i];
      for (var j = 0; j < arr.length; j++ ) {
        var twoParts = arr[j];
	reduceFx(twoParts[0], twoParts[1], reduceContext);
      } 
    }
  };

  this.exec = function() {
    this.mapPhase();
    this.reducePhase();    
  };
}

function ReduceContext(){
  var output = [];
  this.getOutput = function() {
    return output;
  };
  this.emit = function(key , value) {
    output.push([key, value]);
  };
  this.dump = function() {
    for (var i=0 ; i < output.length ; i++){
      var innerArray = output[i];
      alert (innerArray[0].mrToString() + ' ' + innerArray[1].mrToString());
    }
  };
}

