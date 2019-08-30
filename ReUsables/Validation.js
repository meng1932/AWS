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

/*****
 * Validation for Others
 * ** */

var DocValidation = (room, typeList, drawingList, fileList) => {
  UGValidation(room, typeList);
  LDValidation(room, drawingList);
  PFValidation(room, fileList);
};

var UGValidation = (room, typeList) => {
  var hasUG = typeList.some(type => {
    return type.indexOf(room.roomType) > 0;
  });
  var msg = `no UserGuide for ${room.roomType} in this location`;
  if (!hasUG) {
    console.log(msg);
  }
};

var LDValidation = (room, drawingList) => {
  var hasLineDrawings = drawingList.some(LD => {
    return LD.indexOf(room.roomId) > 0;
  });
  var msg = `no Line Drawings for ${room.roomId}`;
  if (!hasLineDrawings) {
    console.log(msg);
  }
};

var PFValidation = (room, fileList) => {
  var hasfiles = fileList.some(file => {
    const hasRoom = file.indexOf(room.roomId) > 0;
    const hasControlfiles = file.indexOf("Control_System") > 0;
    return hasRoom && hasControlfiles;
  });
  var msg = `no ControlFiles for ${room.roomId}`;
  if (!hasfiles) {
    console.log(msg);
  }
};

exports.DocValidation = DocValidation;
