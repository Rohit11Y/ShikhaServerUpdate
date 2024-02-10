const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../Modal/Admin");
// const customerremark = require('../Modal/Remarkschema');

exports.registerAdminCtrl = asyncHandler(async (req, res, next) => {
    const { name, username, email, phone, password, loginType,  } =
      req.body;
    try {
      const username1 = username.toLowerCase().replace(/\s+/g, "");
      const username1Exist = await Admin.findOne({ username: username1 });
      if (username1Exist) {
        return next(new AppErr("User Name Already Exists", 422));
      }
      //Check user exists
      const adminExists = await Admin.findOne({ email });
      if (adminExists) {
        //throw
        return next(new AppErr("User Already Exist", 500));
      }
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //create the user
      const admin = await Admin.create({
        name,
        username,
        email,
        phone,
        password: hashedPassword,
        loginType,
        
      });
      res.status(200).json({
        status: "success",
        message: " Registered Successfully",
        // data: admin,
      });
    } catch (error) {
        return res.status(401).json({error:error.message});
    }
  });
  
  //============================================================
  //***********************ADMIN  LOGIN ********************
  //============================================================
  
  exports.loginAdminCtrl = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      //Find the user in db by email only
      const adminFound = await Admin.findOne({
        email,
      });
  
      const isMatch = await bcrypt.compare(password, adminFound.password);
  
      if (adminFound && isMatch) {
        res.status(200).json({
          status: "success",
          message: "Logged in successfully",
          admindata: adminFound,
          adminFound: {
            _id: adminFound?._id,
            email: adminFound?.email,
            phone: adminFound?.phone,
          },
          // token: generateToken(adminFound?._id),
        });
      } else {
       
        return res.status(401).json({message:"Invalid login credentials"});
      }
    } catch (error) {
      
      return res.status(500).json({error:error.message});
    }
  });
  
  //============================================================
  //***********************ADMIN UPDATE PASSWORD ********************
  //============================================================
  
  // exports.updatepasswordAdmin = asyncHandler(async (req, res, next) => {
  //   const { id, newpassword, oldpassword } = req.body;
  //   try {
  //     const adminFound = await Admin.findOne({ _id: id });
  //     const isMatch = await bcrypt.compare(oldpassword, adminFound.password);
  //     if (adminFound && isMatch) {
  //       const salt = await bcrypt.genSalt(10);
  //       const hashedPassword = await bcrypt.hash(newpassword, salt);
  //       const findandupdate = await Admin.findOneAndUpdate(
  //         { _id: id },
  //         { password: hashedPassword },
  //         { new: true }
  //       );
  //       //   // Finally Update details
  //       const email = adminFound?.email;
  //       const message = `
  // <html>
  // <body><div>
  // <h2>Hello ${adminFound?.name}</h2>
  //     <p><b> Password Updated Successfully ... </b></p>  
     
  //     <p>Regards...</p>
  //     <p>KHULASA FIRSTNEWS  TEAM</p>
  //     </div></body>
  //     </html>   
  //   `;
  //       const subject = "KHULASA FIRST NEWS PASSWORD UPDATE SUCCESSFULLY";
  //       const send_to = email;
  
  //       sendEmail({
  //         email: send_to,
  //         subject: subject,
  //         message: message,
  //       });
  
  //       res.status(200).json({
  //         status: "success",
  //         message: " Password Update Successfully",
  //       });
  //     } else {
  //       return next(new AppErr("Invalid credentials", 401));
  //     }
  //   } catch (error) {
  //     next(appErr(error.message));
  //   }
  // });
  //============================================================
  //***********************ADMIN STAFF INFO BY ID********************
  //============================================================
  // exports.getstaffinfo = asyncHandler(async (req, res, next) => {
  //   try {
  //     const data = await Admin.findById(req.params.id).populate([
  //       "country",
  //       "state",
  //       "city",
  //     ]);
  //     res.status(200).json({
  //       status: "success",
  //       message: " Data Found",
  //       data: data,
  //     });
  //   } catch (error) {
  //     next(appErr(error.message));
  //   }
  // });

  exports.getAllRemarks = asyncHandler(async (req, res, next) => {
    try {
      const data = await customerremark.find().sort({ createdAt: -1 });
      res.status(200).json({
        status: "success",
        message: " Data Found", 
        data: data,
      });
    } catch (error) {
      return res.status(500).json({error:error.message});
    }
  });