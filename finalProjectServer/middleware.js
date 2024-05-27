const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const myrouter = require('./route/myroute');
const productroute = require('./route/products_route');
const reportRouter = require('./route/report');
const path = require('path');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Static folder for serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(myrouter);
app.use('/api', productroute);
app.use('/report', reportRouter);

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
