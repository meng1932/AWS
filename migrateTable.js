/*****************Env Setup************************* */
const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

const dev = "dev";
const staging = "staging";
const prod = "prod";
const envs = [staging];

/*****************Make Changes Below************************* */
const changable = "Hitplay"; //match the table id

/*****************Main*************************************************************** */

var locationArray = LocationIds(changable);
console.log(locationArray);
locationArray.forEach(function(location) {
  var roomArray = getRoomIds(location);
  console.log(roomArray);
  /* roomArray.forEach(function(room) {
    dynamodb.query(getQueryParams(location, room), function(
      err,
      data
    ) {
      if (err) {
        console.log("Error", err);
      } else {
        var cut = cutData(data.Items);
        cut.map(function(item) {
          dynamodb.putItem(prepareWriteParam(item), function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log("success"); // successful response
          });
        });
      }
    });
  }); */
});

/*****************getLocationIds if client is specified (return an Array)************************* */

function LocationIds(owner) {
  var params = {
    TableName: "hpc-locations-prod",
    KeyConditionExpression: "#owner = :owner",
    ExpressionAttributeNames: {
      "#owner": "owner"
    },
    ExpressionAttributeValues: {
      ":owner": { S: owner }
    }
  };

 dynamodb.query(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      var output = data.Items.reduce(function(prev, item) {
        prev.push(item.id.S);
        return prev;
      }, []);
      return output;
    }
  });
}
/*****************getRoomIDs if Location is specified (return an Array)************************* */

function getRoomIds(LocationID) {
  var params = {
    TableName: "hpc-rooms-prod",
    KeyConditionExpression: "#LID = :lid",
    ExpressionAttributeNames: {
      "#LID": "locationId"
    },
    ExpressionAttributeValues: {
      ":lid": { S: LocationID }
    }
  };
  dynamodb.query(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      var output = data.Items.reduce(function(prev, item) {
        prev.push(item.id.S);
        return prev;
      }, []);
      return output;
    }
  });
}

/*****************Query Device Data from Old Table (per room)************************* */
function getQueryParams(LocationId, RoomId) {
  const params = {
    IndexName: "LocationId-RoomId-index",
    ExpressionAttributeNames: {
      "#LID": "LocationId",
      "#RID": "RoomId"
    },
    ExpressionAttributeValues: {
      ":lid": {
        S: LocationId
      },
      ":rid": {
        S: RoomId
      }
    },
    TableName: "DeviceInfo",
    KeyConditionExpression: "#LID = :lid AND #RID = :rid"
  };
  return params;
}

/*****************remove Redundent/Sample Device Data from Old Table (per room)************************* */
function cutData(DataArray) {
  return DataArray.reduce(function(prev, device) {
    var exist = prev.some(item => item.DeviceId.S === device.DeviceId.S);
    if (
      exist ||
      device.DataId.S === "Sample_Data" ||
      !device.DeviceType ||
      !device.Floor ||
      !device.RoomId ||
      !device.Technology
    ) {
      return prev;
    } else {
      prev.push(device);
      return prev;
    }
  }, []);
}
/*****************prepare Device Data param for write items (per device)************************* */

function prepareWriteParam(device) {
  var deviceKeycon = `${device.Floor.S}|${device.RoomId.S}|${
    device.DeviceId.S
  }`;
  var wIpAddress =
    device.IpAddress === { S: "" } ? { NULL: true } : device.IpAddress;
  var wMacAddress =
    device.MacAddress === { S: "" } ? { NULL: true } : device.MacAddress;
  var wSerialNumber =
    device.SerialNumber === { S: "" } ? { NULL: true } : device.SerialNumber;
  var wInstallationDate =
    device.InstallationDate === { S: "" }
      ? { NULL: true }
      : device.InstallationDate;
  var wManufacturer =
    device.Manufacturer === { S: "" } ? { NULL: true } : device.Manufacturer;
  var wWarrantyExpiry =
    device.WarrantyExpiry === { S: "" }
      ? { NULL: true }
      : device.WarrantyExpiry;
  var wPassword =
    device.Password === { S: "" } ? { NULL: true } : device.Password;
  var wServiceContractExpiry =
    device.ServiceContractExpiry === { S: "" }
      ? { NULL: true }
      : device.ServiceContractExpiry;
  var wUsername =
    device.Username === { S: "" } ? { NULL: true } : device.Username;
  var wDeviceName =
    device.DeviceName === { S: "" } ? { NULL: true } : device.DeviceName;
  var wTechnology =
    device.Technology === { S: "" } ? { NULL: true } : device.Technology;
  var wDeviceType =
    device.DeviceType === { S: "" } ? { NULL: true } : device.DeviceType;

  var params = {
    Item: {
      DeviceKey: { S: deviceKeycon },
      DeviceId: { S: device.DeviceId.S },
      DeviceName: wDeviceName,
      DeviceType: wDeviceType,
      Floor: { S: device.Floor.S },
      IpAddress: wIpAddress,
      LocationId: { S: device.LocationId.S },
      MacAddress: wMacAddress,
      RoomId: { S: device.RoomId.S },
      SerialNumber: wSerialNumber,
      Technology: wTechnology,
      InstallationDate: wInstallationDate,
      Manufacturer: wManufacturer,
      WarrantyExpiry: wWarrantyExpiry,
      Password: wPassword,
      ServiceContractExpiry: wServiceContractExpiry,
      Username: wUsername
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "DeviceSystem-dev"
  };
  return params;
}
