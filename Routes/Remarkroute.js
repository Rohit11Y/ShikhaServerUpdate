const express = require('express');

const {remarkInsert ,getcutomerremark , EditcustomerRemark, getremarkid,imageUpload} = require('../Controller/RemarkController');

const Remark = express.Router();

Remark.post('/addremark',remarkInsert);
Remark.get('/getremark',getcutomerremark);
Remark.put('/updateremarkid/:id',EditcustomerRemark);
Remark.get('/getremarkbyid/:id',getremarkid);
//image Upload
Remark.post("/imageUpload", imageUpload);

module.exports = Remark;