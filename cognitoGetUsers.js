const AWS = require("aws-sdk");
var fs = require("fs");
AWS.config.update({ region: "us-east-1" });
const CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "user2.csv",
  header: [
    { id: "username", title: "username" },
    { id: "given_name", title: "given_name" },
    { id: "family_name", title: "family_name" },
    { id: "email", title: "email" },
    { id: "custom:client_id", title: "clientid" }
  ]
});

const PaginationToken1 =
  "CAISmAIIARLxAQgDEuwBAFb5QEWv5RoAKAt527k+Vu6/PBI64TNYk+w0GcNv89p9eyJAbiI6IlBhZ2luYXRpb25Db250aW51YXRpb25EVE8iLCJuZXh0S2V5IjoiQUFBQUFBQUFDTTNWQVFFQnFvRXNaNUtaUllPOTI3bW01ZURqR2J3MG4rSm9Xa3B5bG0rRnBjVDlZUTlsYm1ZN1oyazRlRGRpYUdzMVgzTndhVzV0WVhOMFpYSmZhblZoYm5aemNHbHViV0Z6ZEdWeVkyOXRPdz09IiwicHJldmlvdXNSZXF1ZXN0VGltZSI6MTYxMTI0Mzk1NDU0Nn0aIGAnc6xCVhseS1v/ZKwLjogJhswz8hS44a1S1RmakrQI";
const PaginationToken2 =
  "CAISmAIIARLxAQgDEuwBAFb5QEWv5RoAKAt527k+Vu6/PBI64TNYk+w0GcNv89p9eyJAbiI6IlBhZ2luYXRpb25Db250aW51YXRpb25EVE8iLCJuZXh0S2V5IjoiQUFBQUFBQUFDTTNWQVFFQnFvRXNaNUtaUllPOTI3bW01ZURqR2J3MG4rSm9Xa3B5bG0rRnBjVDlZUTlsYm1ZN2NuRnZNR1o2ZUhwdFgzTndhVzV0WVhOMFpYSmZZVzFwZEhaemNHbHViV0Z6ZEdWeVkyOXRPdz09IiwicHJldmlvdXNSZXF1ZXN0VGltZSI6MTYxMTI0NDAxNTQyNn0aIKEDplGzM2aaNrG+k62AURVClbjo4ghQIeuQOKvtAIxw";

var params = {
  UserPoolId: "us-east-1_wiz9u3zH2",
  PaginationToken: PaginationToken2
};

CognitoIdentityServiceProvider.listUsers(params, (err, data) => {
  if (err) {
    console.log("Error listUsers=", err);
  } else {
    console.log(data.PaginationToken);
    const users = [];
    data.Users.forEach(user => {
      let newUser = {
        username: user.Username
      };
      user.Attributes.forEach(item => {
        newUser[item.Name] = item.Value;
      });
      users.push(newUser);
      csvWriter
        .writeRecords(users)
        .then(() => console.log("The CSV file was written successfully"));
    });
  }
});
