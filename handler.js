'use strict';
const AWS = require('aws-sdk');
const dynamoDC = new AWS.DynamoDB.DocumentClient({});

module.exports.newOrder = async event => {
  
  const params = ( { store_id, order_id, user_id, grand_total } ) => {
    return {
      TableName: 'StoreOrders',
      Item: {
        store_id,
        order_id,
        user_id,
        grand_total,
        timestamp : Date.now() // create timestamp here
      },
      ConditionExpression: "store_id <> :sid and order_id <> :oid",
      ExpressionAttributeValues:{
        ":sid":store_id,
        ":oid":order_id
      }
    };
  };

  try {
    const { order_id } = event;
    // add the order in the StoreOrders table
    await dynamoDC.put(params(event)).promise();
    // successful response
    return {
      statusCode: 201,
      body: {
        message: `Order ${order_id} submitted successfully`,
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
