const MyFunc = require("../ReUsables/MyFunc.js");
const MyFunc2 = require("../ReUsables/MyFunc2.js");
const Valid = require("../ReUsables/Validation");
const getRoomId = MyFunc.getRoomId;
const getUserGuideList = MyFunc2.getUserGuideList;
const getLineDrawingList = MyFunc2.getLineDrawingList;
const getProgramFileList = MyFunc2.getProgramFileList;
const DocValidation = Valid.DocValidation;

const lid = "Aviva_juvysfrf";

Promise.all([
  getRoomId(lid),
  getUserGuideList(lid),
  getLineDrawingList(lid),
  getProgramFileList(lid)
]).then(val => {
  var rooms = val[0];
  var typeList = val[1].slice(1);
  var drawingList = val[2];
  var fileList = val[3];
  rooms.forEach(room => {
    DocValidation(room, typeList, drawingList, fileList);
  });
});
