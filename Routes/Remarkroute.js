const express = require('express');

const {remarkInsert ,getcutomerremark , EditcustomerRemark, getremarkid,imageUpload,getAllremark_by_customer_id} = require('../Controller/RemarkController');

const Remark = express.Router();

Remark.post('/addremark',remarkInsert);
Remark.get('/getremark',getcutomerremark);
Remark.put('/updateremarkid/:id',EditcustomerRemark);
Remark.get('/getremarkbyid/:id',getremarkid);
Remark.get('/getAllremark_by_customer_id/:id',getAllremark_by_customer_id);
//image Upload
Remark.post("/imageUpload", imageUpload);

module.exports = Remark;