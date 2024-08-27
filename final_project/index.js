const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
const jwt = require('jsonwebtoken');

app.use("/customer/auth/*", function auth(req, res, next) {
    // Retrieve the token from the Authorization header
    const token = req.headers['authorization'];

    // If no token is found, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            // If the token is invalid, return a 403 Forbidden response
            return res.status(403).json({ message: 'Access Denied: Invalid Token!' });
        }

        // If the token is valid, attach the decoded payload to the request object
        req.user = decoded;
        
        // Continue to the next middleware or route handler
        next();
    });
});

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
