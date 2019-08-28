const MyFunc = require("../ReUsables/MyFunc.js");
const Valid = require("../ReUsables/Validation");
const getRoomId = MyFunc.getRoomId;
const getDeviceInfo = MyFunc.getDeviceInfo;
const dailyValidation = Valid.dailyRefreshValidation;

getRoomId("Aviva_jt5yo7in")
  .then(rooms => {
    rooms.forEach(room => {
      getDeviceInfo(room)
        .then(devices => {
          devices.forEach(device => dailyValidation(device));
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
  .catch(err => {
    console.log(err);
  });
