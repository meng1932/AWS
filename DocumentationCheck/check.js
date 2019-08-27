const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

/************************************ */
//input: locationId
//output: [... { locationId, roomId }];
let getRoomId = locationId => {
  return await new Promise((res,rej)=>{
    dynamodb.query(params, function(err, data) {
        if (err) {
          console.log("Error", err);
          resolve({
            statusCode: 400,
            error: `There is an error: ${err.stack}`
            });
        } else {
            resolve({ statusCode: 200, body: JSON.stringify(data.Item) });
          //console.log("Success", data.Items);
          }});
    })
};  
 /*  dynamodb.query(getRoomIdParams(locationId), (err, result) => {
    const arr =
      result && result.Items && result.Items.length
        ? result.Items.reduce((prev, item) => {
            var roomId = item.id.S;
            prev.push(roomId);
            return prev;
          }, [])
        : [];
    console.log(arr);
  }); */


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

//exports.getRoomId = getRoomId;
