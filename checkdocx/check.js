const AWS = require("aws-sdk");
var s3 = new AWS.S3();

var params = {
  Bucket: "hpc-data-prod",
  MaxKeys: 2000,
  Prefix: "program-files/"
};

var countFile = 0;
var countLoc = 0;
var countCli = 0;
var locations = [];
var clients = [];
var result = [];
var dataCount = [];

s3.listObjectsV2(params, function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    result = data.Contents;
    result.forEach(item => {
      const propArr = item.Key.split("/");
      dataCount++;
      if (propArr[4].slice(-4) === ".doc") {
        countFile++;
        if (!checkIfExsit(propArr[1], clients)) {
          clients = [...clients, propArr[1]];
          countCli++;
        }
        if (!checkIfExsit(propArr[2], locations)) {
          locations = [...locations, propArr[2]];
          countLoc++;
        }
      }
    });
  }
  console.log(
    "total file checked:",
    dataCount,
    ", file need reupload: ",
    countFile,
    ", involved locations: ",
    locations,
    countLoc,
    ", involved clients: ",
    clients,
    countCli
  );
});

const checkIfExsit = (text, array) => {
  return array.some(item => item === text);
};
