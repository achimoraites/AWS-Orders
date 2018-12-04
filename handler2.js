'use strict';
const AWS = require('aws-sdk');
const dynamoDC = new AWS.DynamoDB.DocumentClient({});


module.exports.userOrders = async event => {


  try {
    // ... The results should be the last 5 orders by the given user

    // Get users orders using user_id
    const { user_id } = event;
    const params=  {
      TableName:'StoreOrders',
      IndexName: 'user_id-timestamp-index', 
      ScanIndexForward: false,           
      Limit: 5,
      KeyConditionExpression: "user_id = :ui",
      ExpressionAttributeValues: {
        ":ui": user_id
      }
    };
   
    console.log(user_id);
    // this solution is more elegant!
    const orders = await dynamoDC.query(params).promise();
    // if there are no results stop here
    if (orders.Count === 0) {
      throw new Error(`User ${user_id} has no orders yet !`);
    }
 
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
      error : error.message
    }; 
  }

};
