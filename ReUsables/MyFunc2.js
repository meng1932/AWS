const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var s3 = new AWS.S3();

/*********
 * This file have the query for S3
 * will retrive the list of names in S3
 * ***************** */
/*********
 * This is for preparing the list object params
 * input: purpose "linedrawing" "userguide" "programfiles"
 * ***************** */

//{locationId, roomId, roomType}
const getClientId = locationId => {
  const arr = locationId.split("_");
  return arr[0];
};

var listUGParams = locationId => {
  var clientId = getClientId(locationId);
  return {
    Bucket: "hpc-data-prod",
    Prefix: `user-guides/${clientId}/`
  };
};

const removeBackSlash = str => {
  const newstr = str.replace("\\", "");
  return newstr;
};

/*********
 * This is for listing out the list of userguide
 * ***************** */

var getUserGuideList = locationId => {
  return new Promise((resolve, reject) => {
    s3.listObjects(listUGParams(locationId), function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        const arr = data.Contents;
        const keys = arr.map(item => {
          var str = removeBackSlash(item.Key);
          return str;
        });
        resolve(keys);
      }
    });
  });
};

exports.getUserGuideList = getUserGuideList;

/*********
 * This is for listing out the list of line drawings
 * ***************** */

const listLDParams = locationId => {
  var clientId = getClientId(locationId);
  return {
    Bucket: "hpc-data-prod",
    Prefix: `line-drawings/${clientId}/`
  };
};

var getLineDrawingList = locationId => {
  return new Promise((resolve, reject) => {
    s3.listObjects(listLDParams(locationId), function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        const arr = data.Contents;
        const keys = arr.map(item => {
          var str = removeBackSlash(item.Key);
          return str;
        });
        resolve(keys);
      }
    });
  });
};

exports.getLineDrawingList = getLineDrawingList;

/*********
 * This is for listing out the list of Programfiles in one room
 * ***************** */

const listPFParams = locationId => {
  var clientId = getClientId(locationId);
  return {
    Bucket: "hpc-data-prod",
    Prefix: `program-files/${clientId}/${locationId}`
  };
};

var getProgramFileList = locationId => {
  return new Promise((resolve, reject) => {
    s3.listObjects(listPFParams(locationId), function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        const arr = data.Contents;
        const keys = arr.map(item => {
          var str = removeBackSlash(item.Key);
          return str;
        });
        resolve(keys);
      }
    });
  });
};

exports.getProgramFileList = getProgramFileList;
