const express = require('express')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const Route = require('./Route/Index');

// Cors is used to Access the url 
app.use(cors({
  origin: '*'
}));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
let jsonParser = bodyParser.json();
app.use(jsonParser);



// Middleware to check token request
app.use((req, res, next) => {
  if (req.headers['authorization']) {
    try {
      const Accesstoken = req.headers['authorization'].replace('Bearer ', '');
      const VfyToken = jwt.verify(Accesstoken, process.env.ACCESS_SECRET_KEY);
      // console.log("ddtoken",VfyToken, req.headers['authorization'])
      req._User = VfyToken;
      next();
    }
    catch (err) {
      console.log(err)
      res.status(401).send("Invalid Access Token");
    }
  }
  else {
    next();
  }
});



app.use('/api', Route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on  port http://localhost:${port}`)
})