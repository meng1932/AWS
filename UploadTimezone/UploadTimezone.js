const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const async = require("async");
const geoTz = require("geo-tz");
var moment = require("moment-timezone");
/****************change here *****************/
const env = "prod";
/****************change above ****************/
var ddb = new AWS.DynamoDB.DocumentClient();
let locationTableName = `hpc-locations-${env}`;

var params = {
  TableName: locationTableName
};

var updateparams = (item, tz) => {
  return {
    TableName: locationTableName,
    Key: {
      owner: item.owner,
      id: item.id
    },
    UpdateExpression: "SET #TZ = :TZ",
    ExpressionAttributeNames: { "#TZ": "timezone" },
    ExpressionAttributeValues: {
      ":TZ": tz[0]
    }
  };
};

ddb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    data.Items.forEach((item, idx) => {
      const Lat = item.Coordinates ? item.Coordinates.X * 1 : null;
      const Lon = item.Coordinates ? item.Coordinates.Y * 1 : null;
      const timeZone = Lat ? geoTz(Lon, Lat) : null;

      if (timeZone) {
        ddb.update(updateparams(item, timeZone), function(err, data) {
          if (err) console.log(err);
          else console.log(timeZone, idx);
        });
      }
    });
  }
});
