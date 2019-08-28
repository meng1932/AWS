const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

/************************************ */
//input: locationId
//output: [... { locationId, roomId }];

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
