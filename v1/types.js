function MapRedString (s){
  this.s = s;
  this.mrHashCode = function () {
    var hash = 0;
    if (s.length == 0) return hash;
    for (i = 0; i < s.length; i++) {
      charc = s.charCodeAt(i);
      hash = ((hash<<5)-hash)+charc;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  this.mrCompareTo = function (other) {
    if (this.s > other.s){
      return 1;
    } else if (this.s < other.s) {
      return -1;
    } else {
      return 0;
    }
  }
  this.mrToString = function() {
    return this.s;
  }
}

function MapRedInt (i){
  this.i = i; 
  this.mrHashCode = function () {
    return i;
  }
  this.mrCompareTo = function (other) {
    if (this.i > other.i){
      return 1;
    } else if (this.i < other.i) {
      return -1;
    } else {
      return 0;
    }
  }
  this.mrToString = function() {
    return this.i;
  }
}
