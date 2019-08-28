const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

/******
 * input: locationId
 * output: promise object of  [... { locationId, roomId }];
 * ****/

var getRoomId = locationId => {
  return new Promise((resolve, reject) => {
    dynamodb.query(getRoomIdParams(locationId), (err, result) => {
      if (err) {
        reject(err);
      }
      let arr =
        result && result.Items && result.Items.length
          ? result.Items.reduce((prev, item) => {
              var roomId = item.id.S;
              prev.push({ locationId, roomId });
              return prev;
            }, [])
          : [];
      resolve(arr);
    });
  });
};

getRoomIdParams = locationId => {
  return {
    TableName: "hpc-rooms-prod",
    KeyConditionExpression: "#LID = :lid",
    ExpressionAttributeNames: {
      "#LID": "locationId"
    },
    ExpressionAttributeValues: {
      ":lid": { S: locationId }
    }
  };
};

exports.getRoomId = getRoomId;
/*****
 * given roomId
 * receive the {deviceId, date_last_motified} pairs in Promise
 * using table DeviceInfo
 * ** */

var getDeviceInfo = (locationId, roomId) => {
  return new Promise((resolve, reject) => {
    dynamodb.query(getDeviceInfoParams(roomId, locationId), (err, result) => {
      if (err) {
        reject(err);
      }
      console.log(result);
      let arr =
        result && result.Items && result.Items.length
          ? result.Items.reduce((prev, item) => {
              var deviceId = item.DeviceId.S;
              var lastMotified =
                item.date_last_modified === undefined
                  ? "N/A"
                  : item.date_last_modified.S;
              var key = item.key.S;
              prev.push({ roomId, deviceId, lastMotified, key });
              return prev;
            }, [])
          : [];
      //console.log(result.Items)
      //console.log(arr);
      resolve(arr);
    });
  });
};

getDeviceInfoParams = (roomId, locationId) => {
  return {
    TableName: "DeviceInfo",
    IndexName: "LocationId-RoomId-index",
    KeyConditionExpression: "#LID = :lid and #RID = :rid",
    ExpressionAttributeNames: {
      "#LID": "LocationId",
      "#RID": "RoomId"
    },
    ExpressionAttributeValues: {
      ":lid": { S: locationId },
      ":rid": { S: roomId }
    }
  };
};

exports.getDeviceInfo = getDeviceInfo;
