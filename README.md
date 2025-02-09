Game Store Application
Welcome to the Game Store Application! This is a web-based platform built using Spring Boot and React that allows users to browse and purchase games. It also includes an admin panel for managing games, users, and orders.

Features
User Features
Browse Games:

View a list of available games with details like title, description, price, and genre.

User Authentication:

Register and log in to the platform.

Shopping Cart:

Add games to the cart and proceed to checkout.

User profile:

Check information parsed from JWT token, session beggining time and end time.

Admin Features
Game Management:

Add, update, or delete games from the store.

User Management:

View and manage user accounts.

Order Management:

View and manage all orders placed on the platform.

Technologies Used
Backend: Spring Boot, Spring Data JPA, Spring Security, JWT Token, Lombok

Frontend: React, HTML, CSS, Material UI

Database: H2

Build Tool: Maven

Steps to Run the Application
Clone the Repository:

git clone https://github.com/ZilionBits/game-store.git
cd game-store

Build the Project:

mvn clean install

Run the Application:

mvn spring-boot:run

Access the Application:

Open your browser and go to http://localhost:5173.

Use the following credentials to log in:

Admin: admin / 123456

User: user / 123456
