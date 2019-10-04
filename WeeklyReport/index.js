"use strict";
const async = require("async");

//first get the data of one location for a week
//make sure that for one period of time only one start
//make array as [{roomid:"room123",time:[(starttime,endtime,functionname)]},...]
//map through the object and
/* async.waterfall([
  next => {
    const csvFilePath = "./data-1570211032543.csv";
    const csv = require("csvtojson");
    csv()
      .fromFile(csvFilePath)
      .then(object => next(null, object));
  },
  (data, next) => next(null, parseLocationWeeklyData(data)),
  (data, next) => {
    const output = data.forEach(roomArr => parseRoomWeeklyData(roomArr));
    next(null, output);
  }
]); */

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

//parse room data
const specialarr = {
  roomId: "jw0z8r8c_Edmonton",
  time: [
    {
      useid: "97288",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Transmitter",
      deviceid: "DM-TX-4KZ-202-C_01",
      dataid: "Device_Sync",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-09-30 14:09:05.903+00",
      endtime: "2019-09-30 15:04:11.974+00"
    },
    {
      useid: "97291",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Receiver",
      deviceid: "AM-300_01",
      dataid: "Sync_State",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-09-30 14:09:05.851+00",
      endtime: "2019-09-30 15:04:11.993+00"
    },
    {
      useid: "97681",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Transmitter",
      deviceid: "DM-TX-4KZ-202-C_01",
      dataid: "Device_Sync",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-09-30 17:04:23.788+00",
      endtime: "2019-09-30 17:09:24.262+00"
    },
    {
      useid: "97683",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Receiver",
      deviceid: "AM-300_01",
      dataid: "Sync_State",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-09-30 17:04:23.802+00",
      endtime: "2019-09-30 17:09:24.266+00"
    },
    {
      useid: "97630",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Transmitter",
      deviceid: "DM-TX-4KZ-202-C_01",
      dataid: "Device_Sync",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-09-30 16:29:20.768+00",
      endtime: "2019-09-30 17:09:24.262+00"
    },
    {
      useid: "97629",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Receiver",
      deviceid: "AM-300_01",
      dataid: "Sync_State",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-09-30 16:29:20.772+00",
      endtime: "2019-09-30 17:09:24.266+00"
    },
    {
      useid: "100381",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Transmitter",
      deviceid: "DM-TX-4KZ-202-C_01",
      dataid: "Device_Sync",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-02 17:29:24.239+00",
      endtime: "2019-10-02 18:29:29.963+00"
    },
    {
      useid: "100384",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Receiver",
      deviceid: "AM-300_01",
      dataid: "Sync_State",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-02 17:29:24.218+00",
      endtime: "2019-10-02 18:29:29.945+00"
    },
    {
      useid: "100493",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Receiver",
      deviceid: "AM-300_01",
      dataid: "Sync_State",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-02 18:04:27.714+00",
      endtime: "2019-10-02 18:29:29.945+00"
    },
    {
      useid: "100488",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Transmitter",
      deviceid: "DM-TX-4KZ-202-C_01",
      dataid: "Device_Sync",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-02 18:04:27.677+00",
      endtime: "2019-10-02 18:29:29.963+00"
    },
    {
      useid: "101065",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Receiver",
      deviceid: "AM-300_01",
      dataid: "Sync_State",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-03 12:21:24.073+00",
      endtime: "2019-10-03 13:01:28.086+00"
    },
    {
      useid: "101064",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Transmitter",
      deviceid: "DM-TX-4KZ-202-C_01",
      dataid: "Device_Sync",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-03 12:21:24.054+00",
      endtime: "2019-10-03 13:01:28.079+00"
    },
    {
      useid: "102543",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Receiver",
      deviceid: "AM-300_01",
      dataid: "Sync_State",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-04 14:24:09.881+00",
      endtime: "2019-10-04 14:59:14.165+00"
    },
    {
      useid: "102542",
      roomid: "jw0z8r8c_Edmonton",
      devicename: "Transmitter",
      deviceid: "DM-TX-4KZ-202-C_01",
      dataid: "Device_Sync",
      data1: "Connected",
      technology: "Presentation",
      starttime: "2019-10-04 14:24:09.891+00",
      endtime: "2019-10-04 14:59:14.153+00"
    }
  ]
};
function parseRoomWeeklyData(arr) {
  let timeSet = [];
  let range = 5 * 60 * 1000; //5min
  arr.time.forEach(item => {
    let ST = (new Date(item.starttime).getTime() / range).toFixed(0) * range;
    let ET = (new Date(item.endtime).getTime() / range).toFixed(0) * range;
    let obj1 = [1, ST];
    let obj2 = [0, ET];
    timeSet.push(obj1);
    timeSet.push(obj2);
  });
  const timeArr = [...new Set(timeSet)];
  console.log(timeArr);

  /* const ST = arr.time.map(item => new Date(item.starttime).getTime());
  const ET = arr.time.map(item => new Date(item.endtime).getTime());
  let newT = [];
  let i;
  newT.push(ST[0]);
  for (i = 0; i < ST.length; i++) {
    if (ET[i] > ST[i + 1] + 300000) {
      //if the second ent time is after next start time + 5min, delete point
      console.log();
      newT.push(ST[i]);
      newT.push(ET[i]);
    }
  }
  console.log(newT.length);
  console.log(ST.length); */
}
parseRoomWeeklyData(specialarr);
/* 
SELECT *  FROM rooms_usage_prod
where starttime>'2019-09-27'
and roomid like 'jw0z8r8c%'
LIMIT 100;  */
