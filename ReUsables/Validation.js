/*****
 * Validation for daily refresh
 * give msg of passed or not passed
 * ** */
var today = new Date().toJSON().slice(0, 11);

var dailyRefreshValidation = item => {
  var realDevice = !item.key.match("Sample_Data");
  var notUpdate = !(item.lastMotified.slice(0, 11) === today);
  if (notUpdate && realDevice) {
    let msg = `${item.deviceId} in room ${item.roomId} did not refresh today`;
    console.log(msg);
  }
};

exports.dailyRefreshValidation = dailyRefreshValidation;

/*****
 * Validation for SystemInfo
 * give msg of passed or not passed
 * ** */

var systemInfoValidation = item => {
  var typeNeedCheck = ["Processor", "Receiver", "Transmitter"];
  var needCheck=typeNeedCheck.match(item.deviceName.S);
};

exports.systemInfoValidation = systemInfoValidation;
