const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

/****************change here */
let tableName = "hpc-servicehistory-prod";

/****************change above */
var params = {
  Item: {
    AlbumTitle: {
      S: "Somewhat Famous"
    },
    Artist: {
      S: "No One You Know"
    },
    SongTitle: {
      S: "Call Me Today"
    }
  },
  ReturnConsumedCapacity: "TOTAL",
  TableName: tableName
};

dynamodb.putItem(params, function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
  /*
     data = {
      ConsumedCapacity: {
       CapacityUnits: 1, 
       TableName: "Music"
      }
     }
     */
});
