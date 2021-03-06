# AWS-Orders

## Description
A simple api gateway demostration using the serverless framwork to build a simple backend in AWS.

The API can handle new orders and dislay the latest (max 5) orders of the user.

# How it works

## Simple Orders API
<img src="./imgs/orders-api-img.png" />


## API Documentation

### [/new-order](https://github.com/Cyb3rN4u7/AWS-Orders#post--new-order)

### [/user-orders](https://github.com/Cyb3rN4u7/AWS-Orders#post--user-orders)

### POST:  /new-order
Creates a new order if does not exist, if exists it returns a warning that it exists already and does not alter the database.
<br>
Each order should have:
- store_id: String
- order_id: String
- user_id: String
- grand_total : Number
<br>
**Sample Request body** :

```
{
"store_id" : "store01",
"order_id":"order01",
"user_id": "user01",
"grand_total" : 110.00
}

```

 _Expected returns_
<br>
 - **Order is new**

```
{
    "statusCode": 201,
    "body": {
        "message": "Order order01 submitted successfully"
    }
}

```

- **Order already exists (error)**

```
{
    "statusCode": 400,
    "error": "The conditional request failed"
}

```


### POST:  /user-orders
Returns the last 5 orders of the given user .
<br>
Each request should have:

- user_id : String
- store_id : String


**Sample Request body**:

```
{
"user_id": "user1",
"store_id": "store1"
}

```


 **Sample Expected returns**
<br>
 - **User has ordered before**

```
{
    "statusCode": 200,
    "orders": [
        {
            "user_id": "user1",
            "grand_total": 110,
            "order_id": "order8",
            "store_id": "store1",
            "timestamp": "user1#1544092158240"
        },
        {
            "user_id": "user1",
            "grand_total": 110,
            "order_id": "order7",
            "store_id": "store1",
            "timestamp": "user1#1544092152000"
        },
        {
            "user_id": "user1",
            "grand_total": 110,
            "order_id": "order6",
            "store_id": "store1",
            "timestamp": "user1#1544092147627"
        },
        {
            "user_id": "user1",
            "grand_total": 110,
            "order_id": "order5",
            "store_id": "store1",
            "timestamp": "user1#1544092143040"
        },
        {
            "user_id": "user1",
            "grand_total": 110,
            "order_id": "order4",
            "store_id": "store1",
            "timestamp": "user1#1544092138603"
        }
    ],
    "body": {
        "message": "Orders retrieved successfully"
    }
}

```

- **User does'nt have any orders (error)**

```
{
    "statusCode": 400,
    "error": "User user1 has no orders yet !"
}

```

