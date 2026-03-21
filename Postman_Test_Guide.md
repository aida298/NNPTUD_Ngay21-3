# Hướng dẫn Test API với Postman

## Chuẩn bị
1. Đảm bảo MongoDB đang chạy trên localhost:27017
2. Server Node.js đang chạy trên port 3000
3. Mở Postman

## Các bước test

### 1. Tạo Product
- Method: POST
- URL: http://localhost:3000/products
- Body (JSON):
  ```json
  {
    "name": "Sample Product",
    "description": "A sample product",
    "price": 100
  }
  ```
- Response: Sẽ trả về product object, và tự động tạo inventory với stock=0

### 2. Get All Inventories
- Method: GET
- URL: http://localhost:3000/inventories
- Response: Danh sách inventories với product details

### 3. Add Stock
- Method: POST
- URL: http://localhost:3000/inventories/add-stock
- Body (JSON):
  ```json
  {
    "product": "<product_id_from_step1>",
    "quantity": 10
  }
  ```
- Response: Inventory updated với stock=10

### 4. Reservation
- Method: POST
- URL: http://localhost:3000/inventories/reservation
- Body (JSON):
  ```json
  {
    "product": "<product_id>",
    "quantity": 5
  }
  ```
- Response: stock=5, reserved=5

### 5. Sold
- Method: POST
- URL: http://localhost:3000/inventories/sold
- Body (JSON):
  ```json
  {
    "product": "<product_id>",
    "quantity": 3
  }
  ```
- Response: reserved=2, soldCount=3

### 6. Remove Stock
- Method: POST
- URL: http://localhost:3000/inventories/remove-stock
- Body (JSON):
  ```json
  {
    "product": "<product_id>",
    "quantity": 2
  }
  ```
- Response: stock=3

## Lưu ý
- Chụp ảnh màn hình từng request trong Postman và paste vào file Word
- Đảm bảo các ID product đúng
- Test các trường hợp lỗi như quantity âm, stock không đủ