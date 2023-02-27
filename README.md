# BIIS-BACKEND
#### _Dev Site of Dhrubo(under construction)_

## `Installation`
---
- First clone the repo and checkout to dev_dhrubo branch
```
git clone https://github.com/Udayon-Paul-Dhrubo/BIIS-BACKEND.git
git chekout dev_dhrubo
set NODE_ENV=development
npm i
npm start
``` 

- start API request after seeing the message `Successfully connected to MongoDB Atlas!`
- abort if the message is `Unable to connect to MongoDB Atlas!`

## `API Call prerequisite`
---
- #### _if the user is logged-in_
##### ``in every request afterwards`` :  
-  Option 1 : 
> &nbsp; request header object must include `valid access_token`(given during login session) in `Authorization` in form of  
```
Authorization : bearer <access_token>
```
-  Option 2 :
> &nbsp; request header object must include `cookies` which is set during the login session  

# `API call Features`
---
### 1. `GET http://localhost:5000/login`
> if the user is logged in. then he will get `Temporary Redirect(307)` response with the message form of
```
{
    message: "Already logged in",
    user: { ...userInfo },
    isLoggedIn: true,
    isValidToken: true,
}
```
> otherwise, you will get  `success message(200)`
```
{ message: "Login page" }
```

### 2. `POST http://localhost:5000/login`
> you must include `body` object in `request header` in json format
- body object must include username and password of string type. if any of this field is empty then the request is rejected
```
{
    "username" : "<ID/email>", // studentID in case of STUDENT or email address otherwise
    "password" : "<password>"
}
```
> if the information is okay then you will get `success message(200)` containing
```
{
    message: "login successful",
    access_token: token,
    body: {
        user: { ...userInfo }
    }
}
```

- and also `cookie` is being set in the response object


### 3. `GET http://localhost:5000/`
> if the user is not logged in then you will get `Unauthorized Message(403)` containing
```
{
    message: 'Authentication failed! Please login Again..',
    isLoggedIn: false,
    isValidToken: false,
}
```
> otherwise you will get `success message(200)` containing
```
{
    message : 'Welcome to (student/teacher/user) home page' 
    //for example if user is logged in then it will contain
    // 'welcome to user home page'
}
```



