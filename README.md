# The Coffee Bean Cart

<p align="center">
  <img src="https://img.shields.io/badge/REACT->=18.3.1-lightgreen?style=for-the-badge" alt="React Badge" />
  <img src="https://img.shields.io/badge/NODEJS->=20.18.0-green?style=for-the-badge" alt="NODEJS Badge" />
  <img src="https://img.shields.io/badge/EXPRESS->=4.21.1-orange?style=for-the-badge" alt="Express Badge" />
  <img src="https://img.shields.io/badge/MYSQL-8.0.17-lightblue?style=for-the-badge" alt="React Badge" />
  <img src="https://img.shields.io/badge/DOCKER->=27.3.1-blue?style=for-the-badge" alt="Docker Badge" />
</p>
A full-stack web application for ordering coffee beans, with a modern tech stack and robust CI/CD pipeline. This project provides a smooth ordering experience and aims to support coffee enthusiasts and admin users in managing orders and inventory efficiently.

[Demo Link](https://coffeecart-frontend.onrender.com/)

## Features

- **Intuitive Ordering**: Users can browse, select, and order coffee beans.  
  ![image](https://github.com/user-attachments/assets/02c1d619-c770-4430-9446-b3c62b586360)


- **Order Management**: Review, manage, and delete orders.
  This project implements CRUD operations for managing orders:
    - **C**reate: Users can create an order by typing their name, shop name, coffee type, and amount. After entering the information, they can press the "Place order" button to submit the order.
    - **U**pdate: Users can update their orders by entering the same name, shop name, and coffee type, then updating the amount. After making the changes, pressing "Place order" updates the order.
    - **R**ead: Users can scroll through the list of orders to review them.
    - **D**elete: If users wish to delete a specific order, they can press the "Delete" button to remove it.
  ![image](https://github.com/user-attachments/assets/d9613f23-3842-4a21-82da-9adade0ae3ac)

- **CSV Export**: Export orders and inventory data for easy tracking.


## Project Structure

```
coffee-bean-order/
├── backend/
│   ├── src/          # Backend logic
│   ├── __tests__/    # Tests
│   └── Dockerfile
├── frontend/
│   ├── src/          # React components
│   └── Dockerfile
├── docker-compose.yml
└── .env              # Environment variables
```

## Local Setup

1. Clone the repository.
2. Set up a MySQL database and update `.env` with credentials.
  ```
  MYSQL_USER=<YOUR_MYSQL_USER>
  MYSQL_PASSWORD=<YOUR_MYSQL_PASSWORD>
  MYSQL_DATABASE=<YOUR_MYSQL_DATABASE>
  MYSQL_TEST_DATABASE=<YOUR_MYSQL_TEST_DATABASE>
  API_BASE_URL=<YOUR_API_BASE_URL>
  ```
4. Run `docker-compose up --build -d`.
5. Access at `http://localhost`.

## Contributing

Interested in contributing? We welcome bug fixes, new features, and documentation improvements. Simply open an issue or pull request to get started!
