const express = require('express');

const {remarkInsert ,getcutomerremark , EditcustomerRemark, getremarkid,imageUpload,getAllremark_by_customer_id,getAllremarksDetail,getAllremarkTodayDate} = require('../Controller/RemarkController');

const Remark = express.Router();

 Remark.post('/addremark',remarkInsert);
 Remark.get('/getremark',getcutomerremark);
 Remark.get('/getAllremarksDetail',getAllremarksDetail);
 Remark.put('/updateremarkid/:id',EditcustomerRemark);
Remark.get('/getremarkbyid/:id',getremarkid);
Remark.post('/getAllremarkTodayDate',getAllremarkTodayDate);
Remark.get('/getAllremark_by_customer_id/:id',getAllremark_by_customer_id);
//image Upload
Remark.post("/imageUpload", imageUpload);

module.exports = Remark;