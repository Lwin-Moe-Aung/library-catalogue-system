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
    npm run db:create

5. **Database Migration:**
    ```bash
    To execute migration: npm run migrate
    To undo migration: npm run migrate:down

6. **Data Seeding:**
    ```bash
    To seed initial data: npm run seed
    To undo data seeding: npm run unseed

7. **Running the Project:**
    ```bash
    For production: npm start


 **Postman collection:**
    ```bash
    Link: https://api.postman.com/collections/4680069-ceb45641-883d-4f9d-8732-578cf674da31?access_key=PMAT-01HMNTXPRMCG95KDGSXXRJK21B


 **Postman collection and erd are in project directory:**
    ```bash
    Postman collection name : Library.postman_collection.json
    ERD name : library.png
