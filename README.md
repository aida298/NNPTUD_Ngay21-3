# Inventory Management System

A Node.js application for managing product inventories with MongoDB.

## Features

- Create products automatically creates corresponding inventory
- Get all inventories with product details
- Get inventory by ID
- Add stock to inventory
- Remove stock from inventory
- Reserve stock
- Mark stock as sold

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start MongoDB locally on default port 27017.

3. Run the application:
   ```
   npm start
   ```

   Or for development:
   ```
   npm run dev
   ```

## API Endpoints

### Products
- POST /products - Create a new product
- GET /products - Get all products

### Inventories
- GET /inventories - Get all inventories with product details
- GET /inventories/:id - Get inventory by ID
- POST /inventories/add-stock - Add stock (body: {product: ObjectId, quantity: number})
- POST /inventories/remove-stock - Remove stock (body: {product: ObjectId, quantity: number})
- POST /inventories/reservation - Reserve stock (body: {product: ObjectId, quantity: number})
- POST /inventories/sold - Mark as sold (body: {product: ObjectId, quantity: number})

## Testing with Postman

Use Postman to test the APIs. Create a product first, then perform inventory operations.

For the Word document with screenshots, capture images of each API call in Postman and paste them into a Word document.