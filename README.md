# “Ecommerce API with Node js
###  This project we have implemented an e commerse api like creating user ,creating apis for cart and placing order and many more.
- Used jsonwebtoken for authentication and authorization
##

### Teck Stack :
 - NodeJs
 - Express
 - Mongodb
   
 
 ##Requirement :
 1) API Endpoints:
    - Category Listing: Create an API endpoint that retrieves a list of categories
    - Product Listing: Create an API endpoint that retrieves a list of products with essential details such as title, price, description, and availability, based on category Id
    - Product Details: Implement an endpoint that fetches the detailed information of a specific product by its ID
    - Cart Management: Develop API endpoints to allow users to add products to their cart, view the cart, update quantities, and remove items from the cart.
    - Order Placement: Create an endpoint to handle order placement, allowing users to place an order with products from their cart.
    - Order History: Implement an endpoint to fetch the order history for authenticated users
    - Order Details: Create an endpoint that retrieves the detailed information of a specific order by its ID.
    - A set of API to register and login the users

 2) Database Integration: Integrate MongoDB or MySql or any other DB schema to store and manage product data, user cart information, and order details. The API should interactwith DB to perform CRUD operations on products, cart items, and orders

 3) Authentication Middleware and security: Implement authentication middleware to secure sensitive API endpoints, such as cart management and order placement. Only authenticated users should be allowed to access these endpoints.

 4) User Authentication: Implement user authentication using JSON Web Tokens (JWT). Users should be able to register, log in, and obtain a token to authenticate API requests.

 5) Error Handling: Ensure appropriate error handling is in place, and the API returns meaningful error messages and status codes when necessary

