function WordCountReducer( key, values, reduceContext ){
  var sum = 0;
  for (var i = 0 ; i< values.length ; i++){
    var nt = values[i];
    sum += parseInt(nt.i);
  }
  reduceContext.emit(key, new MapRedInt(sum));
}

function WordCountMapper (rw, mapContext){
  var res = rw.split(" ");
  for (var i = 0 ; i < res.length ; i++){
    mapContext.emit(new MapRedString(res[i]), new MapRedInt(1));
  }
}
