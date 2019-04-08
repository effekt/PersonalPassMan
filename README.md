### PersonalPassMan

POC Password Manager that uses AES + Key front-end encryption that is only known to you to store data. Key must be set to add / view stored usernames, websites, and passwords.

Since it's POC there is not much validation on registration short of having a unique valid email, password greater than 8 characters, and a first name.

Connection string for MongoDB connection has been removed and must be supplied in server/server.js

Requires Angular CLI v7 and higher.

Run: "cd app && npm install && ng build && cd ../server && npm install && cd .. && nodemon server"

Has a field that checks passwords against HaveIBeenPwned to see if the password you're using has appeared anywhere.

Chuck Norris is always watching.

Anna Gavrilova - 101084528

Jesse Wheeler - 101075970
