'use strict';
const AWS = require('aws-sdk');
const dynamoDC = new AWS.DynamoDB.DocumentClient({});


module.exports.userOrders = async event => {


  try {
    // ... The results should be the last 5 orders by the given user

    // Get users orders using user_id
    const { user_id, store_id } = event;
    const params=  {
      TableName:'StoreOrders',
      IndexName: 'store_id-timestamp-index', 
      ScanIndexForward: false,           
      KeyConditionExpression: "store_id = :sid",
      SortKey: "store_id#user_id",
      FilterExpression: "user_id = :uid",
      ExpressionAttributeValues: {
        ":sid" : store_id,
        ":uid" : user_id
      }
    };
   
    console.log(user_id);
    // this solution is more elegant!
    const orders = await dynamoDC.query(params).promise();
   

    // if there are no results stop here
    if (orders.Items.length === 0) {
      throw new Error(`User ${user_id} has no orders yet !`);
    }

    const processed = orders.Items.slice(0,5);
 
    // successful response
    return {
      statusCode: 200,
      orders : processed,
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
