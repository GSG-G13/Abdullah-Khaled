#Flight Times Search
This is a simple web application that allows users to search for flight times between two airports on a specific date.

#Getting Started
To get started, clone this repository to your local machine and install the necessary dependencies:

```
git clone https://github.com/your-username/flight-times-search.git
cd flight-times-search
npm install
```

Next, start the development server:

```
npm start
```

This will start the server on port 3000. You can access the application by opening a web browser and navigating to http://localhost:3000.

#Usage
To use the application, enter the IATA codes for the departure and arrival airports, as well as the desired flight date, into the form on the home page. Click the "Search" button to retrieve flight times from the Aviationstack API.

#Dependencies
This application relies on the following dependencies:

#express - A web framework for Node.js
node-fetch - A module for making HTTP requests from Node.js
dotenv - A module for loading environment variables from a .env file
These dependencies are installed automatically when you run npm install.

#Configuration
To configure the application, create a .env file in the root of the project directory and set the following environment variables:

AVIATIONSTACK_API_KEY - Your Aviationstack API key
#Credits
This application was created by [Your Name]. The data is provided by the Aviationstack API.

#License
This project is licensed under the MIT License. See the LICENSE file for more information.



