const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

const dev = "dev";
const staging = "staging";
const prod = "prod";
const envs = [dev, staging, prod];

/*****************Make Changes Below************************* */
const clientId = "Veeva"; //match the table id
const clientDomain = "veeva.com"; //get from othre sources
/*****************Make Changes Above************************* */

const tableprefix = "hpc-clients";

function getparams(env) {
  const table = `${tableprefix}-${env}`;
  const params = {
    ExpressionAttributeNames: {
      "#D": "domain"
    },
    ExpressionAttributeValues: {
      ":d": {
        S: clientDomain
      }
    },
    Key: {
      id: {
        S: clientId
      }
    },
    ReturnValues: "ALL_NEW",
    TableName: table,
    UpdateExpression: "SET #D = :d"
  };
  return params;
}

function update(env) {
  const params = getparams(env);

  dynamodb.updateItem(params, function(err, data) {
    
    if (err) console.log(err, err.stack);
    else {
      const reply= `${env} is updated`
      console.log(data)
    };
  });
}
envs.map(update);
