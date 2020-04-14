const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const async = require("async");
const geoTz = require("geo-tz");
/****************change here *****************/
const env = "staging";
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
    UpdateExpression: "SET #TZ = :TZ, #AB = :AB",
    ExpressionAttributeNames: { "#TZ": "goal", "#AB": "tips" },
    ExpressionAttributeValues: {
      ":TZ": 300,
      ":AB": "This is the tips of the day"
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
