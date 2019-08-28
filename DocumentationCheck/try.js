const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
// Use bluebird implementation of Promise
AWS.config.setPromisesDependency(require('Q').Promise);




/************************************ */
//input: locationId
//output: [... { locationId, roomId }];
let params = {
  TableName: "hpc-rooms-prod",
  KeyConditionExpression: "#LID = :lid",
  ExpressionAttributeNames: {
    "#LID": "locationId"
  },
  ExpressionAttributeValues: {
    ":lid": { S: "Aviva_jt5yo7in" }
  }
};
var dynamodb = new AWS.DynamoDB();
let result = await dynamodb.query(params).promise().then((data) => {
    return data.Item 
})
// Now you can use result outside of the promise.
console.log(JSON.stringify(result))