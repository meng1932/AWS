//1. symmetric differences
//hint: Deem writing a helper function that returns the symmetric difference of two arrays on each call instead of attempting to difference all sets simultaneously.
const symOfTwo = (arr1, arr2) => {
  const YONT = arr1.filter(num => {
    return !arr2.some(num2 => num === num2);
  });
  const NOYT = arr2.filter(num2 => {
    return !arr1.some(num => num === num2);
  });
  return YONT.concat(NOYT);
};

console.log(symOfTwo([1, 2, 3], [2, 3, 4]));

//turn object to array
const obj2Arr = obj => {
  var args = [];
  for (var i = 0; i < obj.length; i++) {
    args.push(obj[i]);
  }
  return args;
};
