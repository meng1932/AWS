const MyFunc = require("../ReUsables/MyFunc.js");
const MyFunc2 = require("../ReUsables/MyFunc2.js");
const Valid = require("../ReUsables/Validation");
const getRoomId = MyFunc.getRoomId;
const getUserGuideList = MyFunc2.getUserGuideList;
const getLineDrawingList = MyFunc2.getLineDrawingList;
const DocValidation = Valid.DocValidation;

const lid = "Aviva_juvysfrf";

Promise.all([
  getRoomId(lid),
  getUserGuideList(lid),
  getLineDrawingList(lid)
]).then(val => {
  var rooms = val[0];
  var typeList = val[1].slice(1);
  var drawingList = val[2];
  //console.log(rooms);
  //console.log(drawingList);
  //console.log(typeList);
  rooms.forEach(room => {
    DocValidation(room, typeList, drawingList);
  });
});
