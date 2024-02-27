const express = require('express');
const cors = require('cors');
const Remark = require('./Routes/Remarkroute');
const Admin = require('./Routes/adminRoute');
//  require('./Config/conn');
 const dotenv = require("dotenv").config({ path: "./Config/custom.env" });
 const dbconnect = require("./Config/conn");
 var multer = require('multer');

 
const bodyParser = require('body-parser');
 const customerInsert = require('./Routes/Route');
 const getCustomer = require('./Routes/Route');
 const customeredit = require('./Routes/Route');
 const getcustomerid = require('./Routes/Route');
 const cutomerdelete = require('./Routes/Route');

//*************** */ CONNECT DATABASE *************** */
dbconnect();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/image/");
  },
  filename: (req, file, cb) => {
    
    cb(null, Date.now() + "-" + Date.now() + ".png");
  },
});
const imageStorage = multer({ storage: imagestorage }); //For Image
// //image Upload ===========

app.use("/Uploads/", express.static("Uploads/"));
app.use("/api/v1/admin/imageUpload_Use",imageStorage.single('file') ,Remark);

//image Upload ===========

app.use('/Api/v',customerInsert);
app.use('/Api/v',getCustomer);
app.use('/Api/v',customeredit);
app.use('/Api/v',getcustomerid);
app.use('/Api/v',cutomerdelete);

 app.use('/Api/v',Remark);
 app.use('/Api/v/admin',Admin);


const PORT = 4243;
app.listen(PORT,()=>{
    console.log(`running server ${PORT}`);
})
