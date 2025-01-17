const config = require('../sqlconfig');  //ดึงข้อมูล connection จาก sqlconfig.js
const sql = require('mssql');   // ใช้ module sql
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/', // Directory where files will be saved
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  // Initialize upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB limit
  }).single('image'); // Expect a single file named 'image'
  
  exports.uploadImage = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      const filePath = `/uploads/${req.file.filename}`;
  
      res.status(200).json({ message: 'File uploaded successfully', path: filePath });
    });
  };
  

async function getProduct() {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request().query('SELECT * FROM Products') // ส่ง Query select เรียกดูข้อมูล Shippers
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.recordsets  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function getProductByID(id) {  //รับ Parameter id
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ProductID', sql.Int, id)  // input id เข้าไปในตัวแปริ  ShipperID
            .query('SELECT * FROM Products WHERE ProductID = @ProductID') // ส่ง Query select ด้วยการ Where ShipperID
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.recordsets  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function getProductByUserID(id) {  //รับ Parameter id
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('UserID', sql.Int, id)  // input id เข้าไปในตัวแปริ  ShipperID
            .query('SELECT * FROM Products WHERE UserID = @UserID') // ส่ง Query select ด้วยการ Where ShipperID
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.recordsets  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}
async function getCategoryByID(id) {  //รับ Parameter id
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('CategoryID', sql.Int, id)  // input id เข้าไปในตัวแปริ  ShipperID
            .query('SELECT * FROM Categories WHERE CategoryID = @CategoryID') // ส่ง Query select ด้วยการ Where ShipperID
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.recordsets  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function postProduct(item) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ProductName', sql.NVarChar, item.ProductName)  //input CompanyName เป็น type NVarChar
            .input('SupplierID', sql.NVarChar, item.SupplierID)  //input Phone เป็น type NVarChar
            .input('CategoryID', sql.NVarChar, item.CategoryID)
            .input('QuantityPerUnit', sql.NVarChar, item.QuantityPerUnit)
            .input('UnitPrice', sql.NVarChar, item.UnitPrice)
            .input('UnitsInStock', sql.NVarChar, item.UnitsInStock)
            .input('UnitsOnOrder', sql.NVarChar, item.UnitsOnOrder)
            .input('ReorderLevel', sql.NVarChar, item.ReorderLevel)
            .input('Discontinued', sql.NVarChar, item.Discontinued)
            .input('UserID', sql.NVarChar, item.UserID)
            .input('PicturePath', sql.NVarChar, item.PicturePath)
            .output('name', sql.NVarChar, item.ProductName)  //output name เป็น type NVarChar
            .output('code', sql.NVarChar, 'success')  //output code เป็น type NVarChar 'success'
            .query('INSERT INTO Products (ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued, UserID, PicturePath) VALUES (@ProductName, @SupplierID, @CategoryID, @QuantityPerUnit, @UnitPrice, @UnitsInStock, @UnitsOnOrder, @ReorderLevel, @Discontinued, @UserID, @PicturePath)') // ส่ง Query insert ไปที่ตาราง Shippers      }).then(result => {// ผลลัพธ์ result
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.output  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function putProduct(item, id) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ProductID', sql.Int, id)
            .input('ProductName', sql.NVarChar, item.ProductName)  //input CompanyName เป็น type NVarChar
            .input('SupplierID', sql.NVarChar, item.SupplierID)  //input Phone เป็น type NVarChar
            .input('CategoryID', sql.NVarChar, item.CategoryID)
            .input('QuantityPerUnit', sql.NVarChar, item.QuantityPerUnit)
            .input('UnitPrice', sql.NVarChar, item.UnitPrice)
            .input('UnitsInStock', sql.NVarChar, item.UnitsInStock)
            .input('UnitsOnOrder', sql.NVarChar, item.UnitsOnOrder)
            .input('ReorderLevel', sql.NVarChar, item.ReorderLevel)
            .input('Discontinued', sql.NVarChar, item.Discontinued)
            .input('UserID', sql.NVarChar, item.UserID)
            .input('PicturePath', sql.NVarChar, item.PicturePath)
            .output('name', sql.NVarChar, item.ProductName)  //output name เป็น type NVarChar
            .output('code', sql.NVarChar, 'success')   //output code เป็น type NVarChar 'success'
            .query('UPDATE Products SET ProductName=@ProductName, SupplierID=@SupplierID, CategoryID=@CategoryID, QuantityPerUnit=@QuantityPerUnit, UnitPrice=@UnitPrice, UnitsInStock=@UnitsInStock, UnitsOnOrder=@UnitsOnOrder, ReorderLevel=@ReorderLevel, Discontinued=@Discontinued, UserID=@UserID, PicturePath=@PicturePath WHERE ProductID=@ProductID') // ส่ง Query UPDATE ไปที่ตาราง Shippers ตามที่ shipperid ที่ได้รับมา     }).then(result => {// ผลลัพธ์ result
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.output  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function deleteProduct(id) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('ProductID', sql.Int, id)  //input ShipperID เป็น type Int
            .output('id', sql.Int, id)  //output id เป็น type Int
            .output('code', sql.NVarChar, 'success')  //output code เป็น type NVarChar 'success'
            .query('DELETE from Products WHERE ProductID=@ProductID') // ส่ง Query DELETE ไปที่ตาราง Shippers ตามที่ได้รับshipperidมา
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.output  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function auth(id,pwd) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('UserID', sql.NVarChar, id)  //input ShipperID เป็น type Int
            .input('Pwd', sql.NVarChar, pwd)  //output id เป็น type Int
            .output('id', sql.NVarChar, id)  
            .output('code', sql.NVarChar, 'success')  //output code เป็น type NVarChar 'success'
            .query('SELECT * from [User] WHERE UserID=@UserID AND Pwd=@Pwd') 
        }).then(result => {// ผลลัพธ์ result
             console.log(result)
            return result.recordsets  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}

async function signUp(item) {
    try {// ถ้าเกิด error จะเข้า catch
    // Query
    let data = await sql.connect(config) // sql connect to database
        .then(pool => {
            return pool.request()
            .input('UserID', sql.NVarChar, item.UserID)  //input ShipperID เป็น type Int
            .input('Pwd', sql.NVarChar, item.Pwd) 
            .input('Username', sql.NVarChar, item.Username) 
            .output('name', sql.NVarChar, item.Username) 
            .output('code', sql.NVarChar, 'success')  //output code เป็น type NVarChar 'success'
            .query('INSERT INTO [User] (UserID, Pwd, Username) VALUES (@UserID,@Pwd,@Username)') // ส่ง Query DELETE ไปที่ตาราง Shippers ตามที่ได้รับshipperidมา
        }).then(result => {// ผลลัพธ์ result
            // console.log(result)
            return result.output  // return data result
        }).catch(err => {  // ถ้าเกิด error จะเข้า catch
            return err;  // return error
        });
    return data;  // return ค่ากลับ
    }
    catch (error){
        console.log(error);
    }
}
module.exports = { getProduct:getProduct, getProductByID:getProductByID, postProduct:postProduct, putProduct:putProduct, deleteProduct:deleteProduct, auth:auth, signUp:signUp, getProductByUserID:getProductByUserID, getCategoryByID:getCategoryByID};
