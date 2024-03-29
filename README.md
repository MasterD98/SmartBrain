# Smart Brain
This repository contains a web application that can identify faces from images that are uploaded to the application. The application is built using React.js, Tachyons, Node.js, Express.js, Clarifa API, Knex, and PostgreSQL.

## Requirements
To run this application, you will need the following:

Node.js
PostgreSQL
Clarifa API key

## Installation
1.To install the required dependencies, run the following commands:

```npm install``` 

2.To configure the application to use your Clarifa API key, create a file called .env in the root directory of the application and add the following line:

```ClarifaAPIKEY=<your Clarifa API key>```

3.Create PostgresSQL Database and add database url to .env like below

```DATABASE_URL=<your Database Url>```

## Running the Application

To run the application,run the following command:

```
cd smart-brain-api
npm start 

```

The backend application will be accessible at http://localhost:5000.

after that, run the following command:
```
cd ../smart-brain
npm start
```
The web application will be accessible at http://localhost:3000.

## Usage
To use the application, you can follow these steps:

1.Upload an image to the application.

2.The application will identify the faces in the image.
