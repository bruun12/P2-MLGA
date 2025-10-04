# Make Local Great Again! (P2-MLGA)

This repository contains our 2nd semester project for the Software program at Aalborg University.

### Project Overview

**Make Local Great Again!** is a web-based platform designed to strengthen local communities by enabling small businesses to present their products online and connect with each other. The goal is to promote local commerce and collaboration in a user-friendly and accessible way. 

### Technologies Used

- **Node.js** + **Express.js** – Backend server  
- **HTML/CSS/JavaScript** – Frontend  
- **File-based data storage** 
- **MySQL** 
- **Stripe**
- **Bcrypt**
- **Dawa**

### Getting Started

To see the project online, go to this website:
https://cs-25-sw-2-05.p2datsw.cs.aau.dk/node0/

To run the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

```bash
# Clone the repository
git clone https://github.com/bruun12/P2-MLGA.git

# Navigate into the project folder
cd P2-MLGA

# Install dependencies
npm install

# Start the server
npm start

# Start the server, automatic restart if changes in entire directory
npm run dev


# Model-Controller-Router Structure (without views)

Models: 
 - Contain the logic to interact with the database. 
 - Handles tasks such as querying, inserting, updating, and deleting records in the database.

Controllers:
- Acts as the business logic layer: Contains functions or methods that process incoming requests (e.g., GET, POST, PUT, DELETE)
- Receives requests from routes.
- Validates and processes input data.
- Calls the necessary model methods to interact with the database.
- Formats the output (e.g., JSON responses) to send back to the client.
- Handles errors, authentication, or other middleware operations as required.
- They decide what happens when a specific route is hit.

Routers:
- Defines the API endpoints and maps them to the appropriate controller functions
- Responsible for routing HTTP methods (GET, POST, PUT, DELETE, etc.) to their corresponding handlers
