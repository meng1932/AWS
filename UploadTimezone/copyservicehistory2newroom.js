const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const async = require("async");
var moment = require("moment-timezone");
/****************change here *****************/
const env = "prod";
/****************change above ****************/
var ddb = new AWS.DynamoDB.DocumentClient();
let roomTableName = `hpc-rooms-${env}`;

var params = {
  TableName: roomTableName,
  FilterExpression: "locationId = :locationId",
  ExpressionAttributeValues: { ":locationId": "LoyaltyOne_351KSE" }
};

var updateParams = item => {
  return {
    TableName: roomTableName,
    Item: item
  };
};

async.waterfall(
  [
    next => {
      ddb.scan(params, next);
    },
    (data, next) => {
      const rooms = data.Items;
      async.each(
        rooms,
        (room, eachCb) => {
          if (room.createdByCSV) {
            var oldRoom = rooms.filter(oldRoomSingle => {
              return oldRoomSingle.id.split("_")[1] === room.roomNumber;
            });
            var oldServiceHistoryFormat =
              oldRoom !== [] && oldRoom[0] && oldRoom[0].serviceHistoryFormat
                ? oldRoom[0].serviceHistoryFormat
                : [];
            var oldServiceHistory =
              oldRoom !== [] && oldRoom[0] && oldRoom[0].serviceHistory
                ? oldRoom[0].serviceHistory
                : [];

            if (
              room.roomNumber &&
              oldServiceHistoryFormat.length &&
              oldServiceHistory.length
            ) {
              var newRoom = {
                ...room,
                serviceHistoryFormat: oldServiceHistoryFormat,
                serviceHistory: oldServiceHistory
              };
              console.log(
                "update: ",
                newRoom.id,
                newRoom.roomNumber,
                newRoom.serviceHistoryFormat.length,
                newRoom.serviceHistory.length
              );
              ddb.put(updateParams(newRoom), eachCb);
            } else {
              console.log(
                "not update: ",
                room.roomNumber,
                oldServiceHistoryFormat.length,
                oldServiceHistory.length
              );
              eachCb(null, null);
            }
          } else {
            eachCb(null, null);
          }
        },
        next
      );
    }
  ],
  (err, data) => console.log("Error: ", err)
);

/* async.waterfall(
  [
    next => {
      ddb.scan(
        {
          TableName: "hpc-servicehistory-dev"
        },
        (err, data) => {
          if (err) {
            console.log("Error: ", err);
            next(null, null);
          } else {
            next(null, data.Items);
          }
        }
      );
    },
    (data, next) => {
      async.each(
        data,
        (history, eachCallback) => {
          ddb.put(createParams(history), eachCallback);
        },
        next
      );
    }
  ],
  (err, data) => console.log("Error: ", err)
); */
