'use strict';

const dynamodb = require('./dynamodb');

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: "skills",
    Key: {
      studentid: event.pathParameters.studentid,
    },
  };

  // fetch todo from the database
  dynamodb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
