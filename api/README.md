# API Backend Setup

This document provides instructions on how to set up the development environment for the backend API.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [MySQL](https://www.mysql.com/) (version 5.7 or later)

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/api.git
    cd api
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up the MySQL database**:
    - Create a new MySQL database.
    - Update the database connection details in `src/db/connection.js`:
      ```js
      const mysql = require('mysql2');

      const connection = mysql.createConnection({
          host: 'localhost',
          user: 'your-username',
          password: 'your-password',
          database: 'your-database'
      });

      connection.connect((err) => {
          if (err) {
              console.error('Error connecting to MySQL:', err.stack);
              return;
          }
          console.log('Connected to MySQL as id ' + connection.threadId);
      });

      module.exports = connection;
      ```

4. **Run database migrations**:
    - If you have any migration scripts, run them to set up the database schema.

5. **Seed the database**:
    - Run the seed script to populate the database with initial data:
      ```sh
      npm run seed
      ```

## Development

To start the development server, run:
```sh
npm run dev