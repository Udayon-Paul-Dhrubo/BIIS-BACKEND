# dev site of dhrubo


## Initialization
 => git checkout dev_dhrubo \
 (terminal) \
 => `npm i` \
 => `npm start` 
 
 ## API call service
 
 ### `GET http://localhost:5000/` 
if the user is not logged in, \
(e.g: \
case 1: request object doesn't include `Authorization : bearer <access_token>` \
case 2: request object doen't include `signedCookies` ) 

then you cann't access. You will get error in response. Otherwise you will get success message.

 ### `GET http://localhost:5000/login`
 Just simply give you success message

 ### `POST http://localhost:5000/login`
 you must include JSON object in body like
 
 ![image](https://user-images.githubusercontent.com/80277475/221214594-95c26c56-1cbf-4d8f-b5f8-dc3b6c7bd745.png)
 
 here username : \
 `studentID` ( in case of student ) \ 
  or `email`( in case of Teacher or Officer )

 



    
 
