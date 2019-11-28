"use strict";
const async = require("async");
const csv = require("csvtojson");

//first get the data of one location for a week
//make sure that for one period of time only one start
//make array as [{roomid:"room123",time:[(starttime,endtime,functionname)]},...]

async.waterfall([
  next => {
    const csvFilePath = "./data-1570211032543.csv";

    csv()
      .fromFile(csvFilePath)
      .then(object => next(null, object));
  },
  (data, next) => next(null, parseLocationWeeklyData(data)),
  (data, next) => {
    //console.log(data);
    data.forEach(room => parseRoomWeeklyData(room));
  }
]);

function parseLocationWeeklyData(array) {
  //console.log(array)
  //get all roomid as a set.
  const roomIdArr = [...new Set(array.map(item => item.roomid))];
  const outputArr = [];
  //console.log(roomIdArr);
  roomIdArr.forEach(roomId => {
    const roomArr = array.filter(item => item.roomid === roomId);
    //operation for each room, gather the time snippet
    const obj = {
      roomId,
      time: roomArr
    };
    outputArr.push(obj);
  });
  //console.log(outputArr);
  return outputArr;
}

function parseRoomWeeklyData(arr) {
  //console.log(arr);
  let range = 3 * 60 * 1000; //3min
  let output = [];
  let timeArr = [];
  arr.time.forEach(item => {
    let ST = (new Date(item.starttime).getTime() / range).toFixed(0) * range;
    let ET = (new Date(item.endtime).getTime() / range).toFixed(0) * range;
    let obj1 = [1, ST];
    let obj2 = [0, ET];
    timeArr.push(obj1);
    timeArr.push(obj2);
  });
  //console.log(timeArr);
  const timeArrParsed = parseTimeArr(timeArr);
  const RoomOutput = {
    roomId: arr.roomId,
    meetings: timeArrParsed
  };
  output.push(RoomOutput);
  //console.log(output);
  return output;
}

const parseTimeArr = timeArr => {
  const timeArrOrdered = timeArr.sort((a, b) => a[1] - b[1]);
  //clean up the repeated data
  let newArr = [];
  newArr.push(timeArrOrdered[0]);
  let i;
  for (i = 1; i < timeArrOrdered.length; i++) {
    if (timeArrOrdered[i][0] !== timeArrOrdered[i - 1][0]) {
      newArr.push(timeArrOrdered[i]);
    }
  }
  //return [starttime(ms), endtime(ms), duration(ms)];
  let outputArr = [];
  for (i = 0; i < newArr.length; i++) {
    if (newArr[i][0] === 1) {
      const meeting = [
        newArr[i][1],
        newArr[i + 1][1],
        newArr[i + 1][1] - newArr[i][1]
      ];
      outputArr.push(meeting);
    }
  }
  console.log(outputArr);
  return outputArr;
};

/* 
SELECT *  FROM rooms_usage_prod
where starttime>'2019-09-27'
and roomid like 'jw0z8r8c%'
LIMIT 100;  */
