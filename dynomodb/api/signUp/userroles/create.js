'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  // if (typeof data.text !== 'string') {
  //   console.error('Validation Failed');
  //   callback(null, {
  //     statusCode: 400,
  //     headers: { 'Content-Type': 'text/plain' },
  //     body: 'Couldn\'t create the todo item.',
  //   });
  //   return;
  // }

  const params = {
    TableName: "userroles",
    Item: {
      type: data.text,
      profile: data.text1,
      edit: data.text2,
      myfiles: data.text3,
      stat: data.text4,
      reqtech: data.text5,        
      notifi: data.text6,
      current: data.text7,
      addnotice: data.text8,
      myprojects: data.text9,        
      review: data.text10,
      recommend: data.text11,
      

      

      
    },
  };

  // write the todo to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      
    };
    callback(null, response);
  });
};
