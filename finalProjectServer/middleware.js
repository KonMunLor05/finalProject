const express = require('express')
const bodyParser = require('body-parser')
const cors =require('cors')
const myrouter = require('./route/myroute')
const app = express();
const productroute = require('./route/products_route')
const reportRouter = require('./route/report')

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json()); // ใช้งาน bodyParser แบบ json
app.use(cors());
app.use(myrouter);
app.use('/api',productroute); // ระบุ route ชื่อ api เพื่่อป้องกันความสับสน ตอนเรียกหน้า page ซึ่งได้สร้าง link shipper_route.js ไว้แล้วที่
app.use('/report', reportRouter);
app.listen(8080, ()=>{
    console.log('Server running at http://localhost:8080')
})