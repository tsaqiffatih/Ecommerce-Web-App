
# E-commerce Web Application

This is a web-based E-commerce application built with modern web technologies. It provides a platform for users to browse and purchase products online, with features such as user authentication, third-party login, product listing, shopping cart, and a secure checkout process.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [License](#license)

## Tech Stack

### Frontend

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Flowbite](https://flowbite.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

### Backend

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Google-auth-library](https://github.com/googleapis/google-auth-library-nodejs)
- [Midtrans-client](https://github.com/Midtrans/midtrans-nodejs-client)

## Features

- User Authentication (Login/Register)
  - Third-party login with Google and GitHub
- Browse Products (On Going)
- Product Search (On Going)
- Product Details (On Going)
- Shopping Cart
- Secure Checkout with Midtrans
- User Profile Management (On Going)
- Order History and Tracking (On Going)
- Wishlist (On Going)
- Admin Panel (future enhancement)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tsaqiffatih/Ecommerce-Web-App.git
    cd Ecommerce-Web-App
    ```

2. Install dependencies for both client and server:
    ```sh
    cd server
    npm install
    cd ../client/eCommerce
    npm install
    ```

## Environment Variables

Create a `.env` file in the server directory and add the following environment variables:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

## Running the Application

1. Start the server:
    ```sh
    cd server
    node --watch app
    ```

2. Start the client:
    ```sh
    cd client/eCommerce
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` for the client application. The server runs on `http://localhost:3000`.

## Project Structure

```
project-root/
├── server/      # Contains the server application
├── client/      # Contains the client application
    └── eCommerce/ # Contains the Vite React application
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
