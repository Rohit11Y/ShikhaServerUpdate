const express = require("express");
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAllRemarks,
//   updatepasswordAdmin,updateSubStaff,
//   getstaffinfo,
//   getAllStaff,
//   forgetpassworduser,
//   updatepassword,
//   updateInfo,

} = require("../Controller/AdminController");

const adminRoute = express.Router();
//====================================================
// =================== R O U T E =====================
//====================================================

adminRoute.post("/register", registerAdminCtrl);
adminRoute.post("/login", loginAdminCtrl);
 adminRoute.get("/getAllRemarks", getAllRemarks);


// ==================E N D======================
module.exports = adminRoute;