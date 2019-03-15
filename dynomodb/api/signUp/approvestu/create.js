'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the todo item.',
    });
    return;
  }

  const params = {
    TableName: "approvestudent",
    Item: {
      id: data.text,
      email: data.text1,
      fname: data.text2,
      lname: data.text3,
      contact: data.text4,
      password: data.text5,
      address: {
        line1: data.text6,
        line2: data.text7,
        line3: data.text8
      },
      
      institute1: data.text9,
      github: data.text10,
      linkedin: data.text11,
      facebook: data.text12,
      achievements: data.text13,
      qulifications: data.text14,
      imgurl:data.text15,
      duration:data.text16,
      sDate:data.text17,
      endDate:data.text18
   

      
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
