const express = require('express');

const {getCustomerbyId,customerInsert , getCustomer , Editcustomer , getcustomerid, cutomerdelete} = require('../Controller/Customercontroller');

const router = express.Router();

router.route('/insertcustomer').post(customerInsert);
router.route('/getcustomer').get(getCustomer);
router.route('/getCustomerbyId/:id').get(getCustomerbyId);
router.route('/editcustomer/:id').put(Editcustomer);
router.route('/getcustomer/:id').get(getcustomerid);
router.route('/getcustomerdelete/:id').delete(cutomerdelete);

module.exports = router;