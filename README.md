# AWS-Orders
## Simple Orders API

### POST:  /new-order
Creates a new order .
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

```

<img src="./imgs/orders-api-img.png" />