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
 * check by device name, for different device it should have different manners
 * ** */

var systemInfoValidation = item => {
  PRTValidation(item);
};

var PRTValidation = item => {
  const typeNeedCheck = [
    "Processor",
    "Receiver",
    "Transmitter",
    "Audio DSP",
    "Audio Processor",
    "Video Call",
    "Video Conference"
  ];
  var needCheck = typeNeedCheck.includes(item.deviceName);
  var noIp = item.ip === "" || item.ip === "0.0.0.0";
  var noMac = item.mac === "" || item.mac === "00-00-00-00-00-00";
  var noSerial = item.serial === "";
  //console.log(needCheck, noIp, noMac, noSerial);
  var msg = `${item.deviceId} in room ${item.roomId} does not have ${
    noIp ? "IP, " : ""
  }${noMac ? "MAC, " : ""}${noSerial ? "Serial Number" : ""}`;
  if (needCheck && (noIp || noMac || noSerial)) {
    console.log(msg);
  }
};

exports.systemInfoValidation = systemInfoValidation;
