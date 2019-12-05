const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const async = require("async");
var moment = require("moment-timezone");
/****************change here *****************/
const env = "prod";
/****************change above ****************/
var ddb = new AWS.DynamoDB.DocumentClient();
let serviceHistoryTableName = `hpc-servicehistory-${env}`;

var params = {
  TableName: serviceHistoryTableName
};

var createParams = item => {
  return {
    TableName: serviceHistoryTableName,
    Item: item
  };
};

var deleteParams = item => {
  return {
    TableName: serviceHistoryTableName,
    Key: {
      roomId: item.roomId,
      date: item.date
    }
  };
};

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

async.waterfall(
  [
    next => {
      ddb.scan(params, (err, data) => {
        if (err) {
          console.log("Error: ", err);
          next(null, null);
        } else {
          next(null, data.Items);
        }
      });
    },
    (data, next) => {
      async.each(
        data,
        (history, eachCallback) => {
          if (!history.date.includes("-")) {
            console.log("format not right, creating new entry");
            const newDate = new moment(history.date * 1).format("MM-DD-YYYY");
            const newHistory = { ...history, date: newDate };
            ddb.put(createParams(newHistory), (err, data) => {
              if (err) {
                console.log(err);
                eachCallback(null, null);
              } else {
                ddb.delete(deleteParams(history), eachCallback);
              }
            });
          } else {
            console.log("format right, do nothing");
          }
        },
        next
      );
    }
  ],
  (err, data) => console.log("Error: ", err)
);

//change date
/* async.waterfall(
  [
    next => {
      ddb.scan(params, (err, data) => {
        if (err) {
          console.log("Error: ", err);
          next(null, null);
        } else {
          next(null, data.Items);
        }
      });
    },
    (data, next) => {
      async.each(
        data,
        (history, eachCallback) => {
          const newDate = `${history.date.split("-")[1]}-${
            history.date.split("-")[0]
          }-${history.date.split("-")[2]}`;
          const newHistory = { ...history, date: newDate };
          ddb.put(createParams(newHistory), eachCallback);
        },
        next
      );
    }
  ],
  (err, data) => console.log("Error: ", err)
); */
