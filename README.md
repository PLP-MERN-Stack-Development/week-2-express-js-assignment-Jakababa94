# Express.js RESTful API Assignment

This project is a RESTful API built with Express.js for managing products. It demonstrates CRUD operations, middleware, error handling, filtering, pagination, and search.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or `curl` for API testing

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Jakababa94.git
   
   cd week-2-express-js-assignment-Jakababa94
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.
   ```
   cp .env.example .env
   ```

4. **Start the server:**
   ```
   npm start
   ```
   The server will run on the port specified in your `.env` file (default: 3000).

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory. Example:

```
PORT=3000
API_KEY=your_api_key_here
```

---

## 📚 API Documentation

### Authentication

All endpoints (except `GET /api/products` and `GET /api/products/:id`) require an `x-api-key` header with the correct API key.

---

### Endpoints

#### 1. Get All Products

- **GET** `/api/products`
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/products?page=1&limit=2&category=Electronics
```

**Example Response:**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Laptop",
      "description": "A powerful laptop",
      "price": 1200,
      "category": "Electronics",
      "inStock": true
    }
  ],
  "totalPages": 5,
  "currentPage": 1
}
```

---

#### 2. Get Product by ID

- **GET** `/api/products/:id`

**Example Request:**
```
GET /api/products/123e4567-e89b-12d3-a456-426614174000
```

**Example Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Laptop",
  "description": "A powerful laptop",
  "price": 1200,
  "category": "Electronics",
  "inStock": true
}
```

---

#### 3. Create a New Product

- **POST** `/api/products`
- **Headers:** `x-api-key: your_api_key_here`
- **Body:** (JSON)
  - `name` (string, required)
  - `description` (string, required)
  - `price` (number, required)
  - `category` (string, required)
  - `inStock` (boolean, required)

**Example Request:**
```json
POST /api/products
Headers: x-api-key: your_api_key_here
Body:
{
  "name": "Smartphone",
  "description": "Latest model",
  "price": 800,
  "category": "Electronics",
  "inStock": true
}
```

**Example Response:**
```json
{
  "id": "generated-uuid",
  "name": "Smartphone",
  "description": "Latest model",
  "price": 800,
  "category": "Electronics",
  "inStock": true
}
```

---

#### 4. Update a Product

- **PUT** `/api/products/:id`
- **Headers:** `x-api-key: your_api_key_here`
- **Body:** (JSON, any updatable fields)

**Example Request:**
```json
PUT /api/products/123e4567-e89b-12d3-a456-426614174000
Headers: x-api-key: your_api_key_here
Body:
{
  "price": 1100,
  "inStock": false
}
```

**Example Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Laptop",
  "description": "A powerful laptop",
  "price": 1100,
  "category": "Electronics",
  "inStock": false
}
```

---

#### 5. Delete a Product

- **DELETE** `/api/products/:id`
- **Headers:** `x-api-key: your_api_key_here`

**Example Request:**
```
DELETE /api/products/123e4567-e89b-12d3-a456-426614174000
Headers: x-api-key: your_api_key_here
```

**Example Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Laptop",
  "description": "A powerful laptop",
  "price": 1100,
  "category": "Electronics",
  "inStock": false
}
```

---

#### 6. Search Products by Name

- **GET** `/api/products/search?name=phone`

**Example Response:**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Smartphone",
      "description": "Latest model",
      "price": 800,
      "category": "Electronics",
      "inStock": true
    }
  ],
  "totalResults": 1
}
```

---

#### 7. Get Product Statistics

- **GET** `/api/products/stats`

**Example Response:**
```json
{
  "totalProducts": 5,
  "totalValue": 5000,
  "averagePrice": 1000
}
```

---

## 🧪 Example `.env.example`

```
PORT=3000
API_KEY=your_api_key_here
```

---

## 📖 Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)