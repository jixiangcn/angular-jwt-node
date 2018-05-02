# angular-jwt-node 
JWT(Json Web Token) authentication implementated with Angular and Nodejs.
[中文说明](README.zh_CN.md)

Note: Server is works now, angular client coming soon.

##Quick Start

### 1.Install Mongodb:
This sample need mongodb to save user data, install mongodb first, then create a "jwt" colletion.
If you already have a running mongodb, change the configuration in server.js：
```
const config = {
    mongodbConnString: 'mongodb://localhost/jwt',
    ...
};
```

### 2.Get the code
Download or clone the code, in project folder run:
```
npm install
```

### 3.Start the API server
```
npm run server
```
Default setting api server will listen on port 8081 

### 4. Use Postman test api server：

#### 4.1. Register a user
POST the register data in json to api server:
```
{username:'lilei',password:'!123#456'}
``` 
API URL:
```
http://localhost:8081/register
```
The token returned can be used to access the data. 
Note: For testing the expiration of the token, the default token expires in one minute.

#### 4.2. Sign In 
POST the login data in json to api server:
```
{username:'lilei',password:'!123#456'}
``` 
API URL:
```
http://localhost:8081/login
```
The token returned can be used to access the data.

#### 4.3. Access Data
Using the GET method in the Postman, set value of the Authorization Bearer Token to the token you got from server.

API URL：
```
http://localhost:8081/me
```
### 3.Start the web client
```
npm run web
```
Use browser access http://localhost:4200

