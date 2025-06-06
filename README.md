# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## Functionality the Project

- app.js:

This serves as the main entry point of your application. It initializes the Express server, sets up middleware, connects to the database, and defines the primary settings required to run the application.

- Routes/index.js:

Acts as the central hub for routing, directing requests to the appropriate controllers. This file defines API endpoints and ensures that different functionalities are properly linked to request handlers.

- Models:

ClothingItems: Defines the data structure for clothing items, including attributes name, weather, owner, like and imageurl.

User:Defines the schema for user accounts, managing properties such as name and imageUrl.

- Controllers:

ClothingItems: Handles functions for retrieving clothing items, adding new ones, updating existing entries, and deleting items from the database.

User: Manages user-related functions, such as account creation, authentication, and profile updates.

- utils/errors.js:

A utility file that provides standardized error handling mechanisms, ensuring that all error responses are properly formatted and returned to the client.

- Database:

Mongoose: This package is used to interact with the database, making it easier to
manage models and execute queries in MongoDB.

-Testing Tools:

Postman: A tool used for testing API endpoints, verifying that requests return correct responses, and debugging any issues in server logic.

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
