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
      FilterExpression:'user_id = :ui',
      ExpressionAttributeValues:{ ":ui" : user_id }
    };
   
    console.log(user_id);
    // It has to be a better way!
    // this solution works but is labor intensive 
    const res = await dynamoDC.scan(params).promise();
    // if there are no results stop here
    if (res.Count === 0) {
      throw new Error(`User ${user_id} has no orders yet !`);
    }
    // sort by timestamp
    const orders2 = res.Items.sort((a, b)=> a.timestamp < b.timestamp);
    //  5 most recent orders
    const orders = orders2.slice(0, 5);  
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
