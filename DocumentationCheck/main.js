const MyFunc = require("../ReUsables/MyFunc.js");

const getRoomId = MyFunc.getRoomId;
const getDeviceInfo = MyFunc.getDeviceInfo;

/* getRoomId("Aviva_jt5yo7in")
  .then(val => {
  console.log(val);
  })
  .catch(err => {
    console.log(err);
  }); */

getDeviceInfo("Aviva_juvysfrf","juvysfrf_1245")
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });
