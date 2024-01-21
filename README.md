# Library Catalogue System
## Setup

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lwin-Moe-Aung/library-catalogue-system.git
   cd project_directory

2. **Install Dependencies:**
   ```bash
   npm install

3. **Environment Configuration:**
    ```bash
    Duplicate `.env-example` to `.env`
    

4. **Database Setup:**
    ```bash
    Connect to your MySQL database.
    Run the following command to create the database:
    npm run create:db

5. **Create Database:**
    ```bash
    To create db: npm run db:create

6. **Database Migration:**
    ```bash
    To execute migration: npm run migrate
    To undo migration: npm run migrate:down

7. **Data Seeding:**
    ```bash
    To seed initial data: npm run seed
    To undo data seeding: npm run unseed

8. **Running the Project:**
    ```bash
    For production: npm start

