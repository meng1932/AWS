const myFunc = require("./myFunc.js");

myFunc.getRoomId("Aviva_jt5yo7in")
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });
