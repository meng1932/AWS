const MyFunc = require("../ReUsables/MyFunc.js");
const Valid = require("../ReUsables/Validation");
const getRoomId = MyFunc.getRoomId;
const getSysInfo = MyFunc.getSysInfo;
const systemInfoValidation = Valid.systemInfoValidation;

/* getRoomId("SpinMaster_jrgj8lab")
  .then(rooms => {
    rooms.forEach(room => {
      getSysInfo(room)
        .then(devices => {
          console.log(devices);
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
  .catch(err => {
    console.log(err);
  }); */

var arr = [
  {
    roomId: "jt5yo7in_Boatys",
    deviceId: "GROUP-SERIES-500_01",
    deviceName: "Video Call",
    ip: "0.0.0.0",
    serial: " ",
    mac: "00-00-00-00-00-00"
  },
  {
    roomId: "jt5yo7in_111",
    deviceId: "DM-TX-4K-202-C_01",
    deviceName: "Receiver",
    ip: "",
    serial: "1846NEJ09852",
    mac: "00.10.7f.bc.21.9c"
  },
  {
    roomId: "jt5yo7in_111",
    deviceId: "DM-TX-4K-202-C_01",
    deviceName: "Processor",
    ip: "10.173.181.100",
    serial: "",
    mac: ""
  },
  {
    roomId: "jt5yo7in_111",
    deviceId: "DM-RMC-4K-SCALER-C_01",
    deviceName: "Receiver",
    ip: "10.173.181.108",
    serial: "1906NEJ15812",
    mac: "00.10.7F.C1.94.D4"
  }
];

arr.forEach(device=>systemInfoValidation(device));