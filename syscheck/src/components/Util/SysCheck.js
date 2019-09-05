const MyFunc = require("./MyFunc.js");
const Valid = require("./Validation");
const getRoomId = MyFunc.getRoomId;
const getSysInfo = MyFunc.getSysInfo;
const systemInfoValidation = Valid.systemInfoValidation;

getRoomId("SpinMaster_jrgj8lab")
  .then(rooms => {
    rooms.forEach(room => {
      getSysInfo(room)
        .then(devices => {
          devices.forEach(device => systemInfoValidation(device));
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
  .catch(err => {
    console.log(err);
  });
