'use strict';
const AWS = require('aws-sdk');
const dynamoDC = new AWS.DynamoDB.DocumentClient({});

module.exports.userOrders = async event => {


  try {
    // ... The results should be the last 5 orders by the given user

    // Get users orders using user_id
    // Return 5 most recent
    const { user_id } = event;
    const params=  {
      TableName:'StoreOrders',
      FilterExpression:'user_id = :ui',
      Limit: 5,
      ExpressionAttributeValues:{ ":ui" : user_id }
    };
   
   
    console.log(user_id);
    const orders = await dynamoDC.scan(params).promise();

    // successful response
    return {
      statusCode: 200,
      orders,
      body: {
        message: `Orders retrieved successfully`,
      } 
    };
  } catch (error) {
    // error has occured !
    return {
      statusCode: 400,
      body: 'request failed : user has no orders',
      error : error.message
    }; 
  }

};
