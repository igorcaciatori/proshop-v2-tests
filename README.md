# ProShop V2 - Automated Tests

This repository contains automated tests for [ProShop V2](https://github.com/bradtraversy/proshop-v2), 
an open-source e-commerce web application built on the MERN stack.  
The tests were created as part of a QA assessment to validate the most critical user flows.

---

## Project Under Test

ProShop V2 is a full-featured application with:
- User authentication (login, registration, profile update)
- Products CRUD (admin only)
- User CRUD (admin only)
- Cart and checkout flow
- Product reviews
- Admin dashboards for orders, products, and users

---

## Test Objectives

The goal of this test suite is to:
- Validate critical end-to-end flows
- Ensure core business logic (cart totals, CRUD, login) works
- Include both **positive and negative test scenarios**
- Provide maintainable, well-structured automated tests

---

## Critical Flows Covered

1. **Authentication**  
   - Login (valid/invalid credentials)  
   - Registration (valid/invalid inputs)  
   - Authorization (normal users cannot access admin pages)  

2. **User Management (Admin)**  
   - Create, update, and delete users  
   - Verify role-based access  

3. **Product Management (Admin)**  
   - Create, edit, and delete products  
   - Validation (prevent invalid/negative values)  

4. **Cart and Checkout**  
   - Add/remove products from cart  
   - Update item quantities and validate totals  
   - Address and payment flow  

---

## Tech Stack

- [Cypress](https://www.cypress.io/) → E2E browser automation  
- [TypeScript](https://www.typescriptlang.org/) → type safety 
- [Node.js](https://nodejs.org/) → runtime environment  
- [GitHub Actions](https://github.com/features/actions) → CI pipeline  

---

## Setup Instructions

### 1. Clone Repositories

Since this project was made with an older version of some packages, the package.json files must be altered. 
(Only for performing the tests, ignore the vulnerabilities presented in some packages) 

```
git clone https://github.com/bradtraversy/proshop-v2.git
cd proshop-v2
```

Replace this folder’s package.json with:
```
{
  "name": "proshop-v2",
  "version": "2.0.0",
  "description": "ProShop ecommerce platform",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node backend/server",
    "server": "nodemon backend/server",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "data:import": "node backend/seeder",
    "data:destroy": "node backend/seeder -d",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
  },
  "keywords": [],
  "author": "Brad Traversy",
  "license": "MIT",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cloudinary": "^1.32.0",
    "colors": "^1.4.0",
    "cookie-parser": "^1.4.7",
    "dotenv": "^16.1.3",
    "express": "^4.18.2",
    "express-async-handler": "^1.2.0",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.3.1",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0",
    "stripe": "^12.17.0"
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "nodemon": "^2.0.22"
  }
}
```
And then run the `npm install.`

```
cd frontend
```
Replace this folder’s package.json with:
```
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
    "@paypal/react-paypal-js": "^8.1.3",
    "@reduxjs/toolkit": "^1.9.7",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.4",
    "bootstrap": "^5.3.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.8.0",
    "react-dom": "^18.2.0",
    "react-helmet-async": "^1.3.0",
    "react-icons": "^4.10.1",
    "react-redux": "^8.1.0",
    "react-router-dom": "^6.14.1",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.1.3",
    "web-vitals": "^3.3.2",
    "redux": "^4.2.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
And then run the `npm install.`

### 2. Configure Environment

Rename .env.example → .env and configure:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=yourpaypalclientid
PAGINATION_LIMIT=8
```

### 3. Seed the database:
```
npm run data:import
```

### 4. Run application
```
npm run dev
```

### 5. Test setup
```
git clone https://github.com/igorcaciatori/proshop-v2-tests.git
cd proshop-v2-tests
npm install
npx cypress open
```

## Run tests

Select the desired E2E spec to run in the `npx cypress open`. There will also be a simple workflow with a pipeline in this repository for running the tests. It is as follows:
```
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npx cypress run
```

