const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const async = require("async");
const geoTz = require("geo-tz");
var moment = require('moment-timezone');
/****************change here *****************/
const env = "dev";
/****************change above ****************/
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
let locationTableName = `hpc-locations-${env}`;

var params = {
  TableName: locationTableName
};

ddb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    //console.log("Success", data.Items);
    data.Items.forEach(item => {
      const locationId = item.id.S;
      const Lat = item.Coordinates ? item.Coordinates.M.X.N * 1 : null;
      const Lon = item.Coordinates ? item.Coordinates.M.Y.N * 1 : null;
      const timeZone = Lat ? geoTz(Lon, Lat) : null;
      console.log(timeZone);
    });
  }
});
