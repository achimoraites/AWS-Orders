# AWS-Orders
## Simple Orders API
<img src="./imgs/orders-api-img.png" />


## API Documentation
<br><br>
### POST:  /new-order
Creates a new order if does not exist, if exists it returns a warning that it exists already and does not alter the database.
<br>
Each order should have:
- store_id: String
- order_id: String
- user_id: String
- grand_total : Number
<br>
Sample Request body :

```
{
"store_id" : "store01",
"order_id":"order01",
"user_id": "user01",
"grand_total" : 110.00
}


<br><br>
 Expected returns
<br>
1. Order is new
<br>

{
    "statusCode": 201,
    "body": {
        "message": "Order order01 submitted successfully"
    }
}

```

2. Order already exists (error)

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


Sample Request body :

```
{
"user_id": "user1"
}

```

<br><br>
** Sample Expected returns
<br>
1. User has ordered before
<br>
```
{
    "statusCode": 200,
    "orders": [
        {
            "user_id": "user1",
            "grand_total": 11000,
            "order_id": "order7",
            "store_id": "store1",
            "timestamp": 1543928923665
        },
        {
            "user_id": "user1",
            "grand_total": 11000,
            "order_id": "order6",
            "store_id": "store1",
            "timestamp": 1543917649924
        },
        {
            "user_id": "user1",
            "grand_total": 11000,
            "order_id": "order5",
            "store_id": "store1",
            "timestamp": 1543917643882
        },
        {
            "user_id": "user1",
            "grand_total": 11000,
            "order_id": "order4",
            "store_id": "store1",
            "timestamp": 1543917637148
        },
        {
            "user_id": "user1",
            "grand_total": 11000,
            "order_id": "order3",
            "store_id": "store1",
            "timestamp": 1543917630790
        }
    ],
    "body": {
        "message": "Orders retrieved successfully"
    }
}

```

2. User does'nt have any orders (error)

```
{
    "statusCode": 400,
    "error": "User user1 has no orders yet !"
}

```

