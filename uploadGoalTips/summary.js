const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const async = require("async");
const geoTz = require("geo-tz");
/****************change here *****************/
const env = "dev";
/****************change above ****************/
var ddb = new AWS.DynamoDB.DocumentClient();
let clientTableName = `hpc-clients-${env}`;

var params = {
  TableName: clientTableName
};

var updateparams = item => {
  return {
    TableName: clientTableName,
    Key: {
      id: item.id
    },
    UpdateExpression: "SET #TZ = :TZ",
    ExpressionAttributeNames: { "#TZ": "summary" },
    ExpressionAttributeValues: {
      ":TZ": "This is the summary"
    }
  };
};

ddb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    data.Items.forEach((item, idx) => {
      ddb.update(updateparams(item), function(err, data) {
        if (err) console.log(err);
        else console.log(idx);
      });
    });
  }
});
