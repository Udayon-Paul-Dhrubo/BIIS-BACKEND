# dev site of dhrubo


## Initialization
 => git checkout dev_dhrubo \
 (terminal) \
 => `npm i` \
 => `npm start` 
 
 ## API call service
 
 ### `http://localhost:5000/`
 
if the user is not logged in, \
(e.g: \
case 1: request object doesn't include `Authorization : bearer <access_token>` \
case 2: request object doen't include `signedCookies` ) \

then you can access. Else you will get error in response. \


    
 
