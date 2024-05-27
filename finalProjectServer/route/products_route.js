const express = require('express')    //ใช้ module express
const router = express.Router();  //ใช้ function router ของ express
const multer = require('multer');
const path = require('path');
const Db = require('../controller/products') //import shipper ในตัวแปร Db

// middleware
router.use((req, res,next)=>{
    console.log('middleware');
    next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


//http://localhost:8080/api/ship
router.route('/product').get((req, res)=>{
Db.getProduct().then((data)=>{    // เรียกใช้ function getShip() และ return data กลับมา 
    // console.log(data);      
    res.status(200).json({data:data, message: 'get data success'});  // ส่ง http code 200 และแสดง data
                         // message ในรูปแบบ json
}).catch(err=>{
    res.status(500).send({error: err, message:'Server Error '}) // ถ้า error จะส่ง http code 500
                        // และแสดง err, message ในรูปแบบ json
    console.log(err);
});
})
//http://localhost:8080/api/ship/1
router.route('/product/:id').get((req, res)=>{    // ส่ง parameter id
    Db.getProductByID(req.params.id).then((data)=>{  // เรียกใช้ function getShipByID(id) / req.params.id ดึงค่า parameter id
        res.status(200).json({data:data, message: 'get id data success'});  // ส่ง http code 200 และแสดง data
                             // message ในรูปแบบ json
    }).catch(err=>{
        res.status(500).send({error: err, message:'Server Error '}) // ถ้า error จะส่ง http code 500
                            // และแสดง err, message ในรูปแบบ json
        console.log(err);
    });
    })
router.route('/product/user/:id').get((req, res)=>{    // ส่ง parameter id
    Db.getProductByUserID(req.params.id).then((data)=>{  // เรียกใช้ function getShipByID(id) / req.params.id ดึงค่า parameter id
        res.status(200).json({data:data, message: 'get id data success'});  // ส่ง http code 200 และแสดง data
                                // message ในรูปแบบ json
    }).catch(err=>{
        res.status(500).send({error: err, message:'Server Error '}) // ถ้า error จะส่ง http code 500
                            // และแสดง err, message ในรูปแบบ json
        console.log(err);
    });
    })
router.route('/category/:id').get((req, res)=>{
    Db.getCategoryByID(req.params.id).then((data)=>{    // เรียกใช้ function getShip() และ return data กลับมา 
        // console.log(data);      
        res.status(200).json({data:data, message: 'get data success'});  // ส่ง http code 200 และแสดง data
                                // message ในรูปแบบ json
    }).catch(err=>{
        res.status(500).send({error: err, message:'Server Error '}) // ถ้า error จะส่ง http code 500
                            // และแสดง err, message ในรูปแบบ json
        console.log(err);
    });
    })
    //http://localhost:8080/api/ship
router.route('/product').post(upload.single('productImage'), (req, res) => {
    let product = { ...req.body, PicturePath: req.file ? req.file.path : null }; // Include the file path in product data

    Db.postProduct(product).then((data) => {
        if (data.code === 'success') {
            res.status(200).json({ data: data, message: 'new data success' });
        } else {
            res.status(400).send({ error: data, message: 'Bad Request' });
        }
    }).catch(err => {
        res.status(500).send({ error: err, message: 'Server Error' });
        console.log(err);
    });
});


//http://localhost:8080/api/ship
router.route('/product/:id').put(upload.single('productImage'), (req, res) => {
    let product = { ...req.body, PicturePath: req.file ? req.file.path : null }; // Include the file path in product data

    Db.putProduct(product,req.params.id).then((data) => {
        if (data.code === 'success') {
            res.status(200).json({ data: data, message: 'new data success' });
        } else {
            res.status(400).send({ error: data, message: 'Bad Request' });
        }
    }).catch(err => {
        res.status(500).send({ error: err, message: 'Server Error' });
        console.log(err);
    });
});
    
//http://localhost:8080/api/ship
router.route('/product/:id').delete((req, res)=>{
    Db.deleteProduct(req.params.id).then((data)=>{    // เรียกใช้ function putShip() สง ship และ return data กลับมา 
        if(data.code == 'success') //return data.codde กลับมาเป็น success
        {
          res.status(200).json({ data: data, message: 'delete data success' });
        } 
        else //return data เป็น error
        {
          res.status(400).send({ error: data, message:'Bad Request' }) //จะส่ง http code 400 และแสดง error, message ในรูปแบบ json
        }
        // console.log(data);      
    }).catch(err=>{
        res.status(500).send({error: err, message:'Server Error '}) // ถ้า error จะส่ง http code 500
                            // และแสดง err, message ในรูปแบบ json
        console.log(err);
    });
    })
router.route('/auth/:id/:pwd').get((req, res)=>{
    Db.auth(req.params.id, req.params.pwd).then((data)=>{    // เรียกใช้ function getShip() และ return data กลับมา 
        // console.log(data);      
        res.status(200).json({data:data, message: 'get data success'});  // ส่ง http code 200 และแสดง data
                                // message ในรูปแบบ json
    }).catch(err=>{
        res.status(500).send({error: err, message:'Server Error '}) // ถ้า error จะส่ง http code 500
                            // และแสดง err, message ในรูปแบบ json
        console.log(err);
    });
    })
router.route('/signUp').post((req, res)=>{
    let User = { ...req.body } //ส่ง req.body เป็นข้อมูล json เข้าไปยังตัวแปร ship
    Db.signUp(User).then((data)=>{    // เรียกใช้ function postShip() สง ship และ return data กลับมา 
        if(data.code == 'success') //return data.codde กลับมาเป็น success
        {
            res.status(200).json({ data: data, message: 'new data success' });
        } 
        else //return data เป็น error
        {
            res.status(400).send({ error: data, message:'Bad Request' }) //จะส่ง http code 400 และแสดง error, message ในรูปแบบ json
        }
        // console.log(data);      
    }).catch(err=>{
        res.status(500).send({error: err, message:'Server Error '}) // ถ้า error จะส่ง http code 500
                            // และแสดง err, message ในรูปแบบ json
        console.log(err);
    });
    })
    

    module.exports = router;   

    
    