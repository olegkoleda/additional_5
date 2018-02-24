module.exports = function check(str, bracketsConfig) {
  
  var openWithClose = {};
  var TWINS = {};
  var openBr = new Set();
  var closeBr = new Set();
  var twinsBr = new Set();

  for (i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] == bracketsConfig[i][1]) { 
        twinsBr.add(bracketsConfig[i][0]);
        TWINS[bracketsConfig[i][0]] = bracketsConfig[i][0];
    }else 
    {
    openBr.add(bracketsConfig[i][0]);
    closeBr.add(bracketsConfig[i][1]);
    openWithClose[bracketsConfig[i][0]] = bracketsConfig[i][1];
    }
}

var openStack  = [];
var twinsStack = [];

for (var i = 0; i < str.length; i++) {
    
  var char = str.charAt(i);
  
  if (twinsBr.has(char)){
      if ( twinsStack.length == 0 ) { 
          twinsStack.push(char);
      } 
      else {
          if ( TWINS[twinsStack[twinsStack.length -1]] == char ) {
              twinsStack.pop();
          }
          else { twinsStack.push(char);}

      }
  }
  else {
  if (openBr.has(char)) {
      openStack.push(char);
  } 
  else if (closeBr.has(char)) {
      if (!openStack.length) {
          return false;
      } 
      else {
         var lastUnclosedOpen = openStack.pop();
          if (openWithClose[lastUnclosedOpen] !== char) {
              return false;
          }
      }
  }
}
}
return (( openStack.length === 0 ) && ( twinsStack.length === 0 ));
}
