
function newMap(array, callback) {
  const output = [];

  for(let i = 0; i < array.length; i++){
    output.push(callback(array[i], i, array))
  }
  return output;
}

function newFilter(array, callback) {
  const output = [];

  for(let i = 0; i < array.length; i++){

    if (callback(array[i], i, array)){
      output.push(array[i])
    }
  }
  return output;
  
}

function newFind(array, callback) {
  let output = undefined;

  for(let i = 0; i < array.length; i++){

    if (callback(array[i], i, array)){
      output = (array[i])
      return output;
    }
  }
  return output;
}

function newReduce(array, callback, initialValue) {

  let output = 0;
  let accumulator = initialValue;
  let index=0;

  if( initialValue == undefined){
    accumulator = array[0];
    index = 1;
  }
  
  for(index; index < array.length; index++){
    output = callback(accumulator, array[index], index, array)
    accumulator = output;
  }
  return output;

}

// Não alterar o código abaixo

export {
  newMap,
  newFilter,
  newFind,
  newReduce
}