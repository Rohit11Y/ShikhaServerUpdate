const asyncHandler = require("express-async-handler");

const { customerremark } = require("../Modal/Remarkschema");

const {customertable} = require("../Modal/Customerschema");

exports.remarkInsert = async (req, res) => {
  // const {id , date , remark , image} = req.body;
  //  try {
  //         const remarklist = await customerremark.create({id,date,remark,image});
  //         res.status(200).json({message:'Data Saved Successfully',remarklist});
  //  } catch (error) {
  //     return res.status(500).json({error:'Error Occured',error});
  //  }
  const {
    id,
    date,
    remark,
    amount,
    image,
    amount_given_To_user,
    amount_given_By_user,
  } = req.body;
  // const findcustomer = await customertable.findById(id);
  // if (amount_given_By_user && findcustomer.totalamount <= 0)
  // {
  //   return res.status(500).json({ status: "false", message: "Enter Less amount" });
  // }

  try {
    const findcustomer = await customertable.findById(id);
    const customeramount = findcustomer.totalamount;
    let customer_amt = 0;

    if (amount_given_To_user) {
      customer_amt = parseInt(customeramount) + parseInt(amount);
    }

    if (amount_given_By_user) {
      customer_amt = parseInt(customeramount) - parseInt(amount);
    }
    // if (amount_given_By_user) {
    //   customer_amt = customeramount - amount;
    // }
    if (amount_given_By_user === false && amount_given_To_user === false) {
      customer_amt = parseInt(customeramount);
    }
    // const user_account_amount_before_update=customeramount;
    // const  user_account_amount_after_update=customer_amt;
    const data_remark = await customerremark.create({
      id,
      date,
      amount,
      remark,
      amount_given_To_user,
      amount_given_By_user,
      user_account_amount_before_update:customeramount,
      user_account_amount_after_update:customer_amt,
      image,
    });

    // await data.save();
    const find_customer_and_update = await customertable.findByIdAndUpdate(
      { _id: id },
      {
        totalamount: customer_amt,
        $push: {
          history:{
          remarkId: data_remark._id,
          credit_amount_given_To_user: amount_given_To_user ? amount : 0,
          credit_amount_given_By_user: amount_given_By_user ? amount : 0,
        }},
      }
    );

    return res.status(200).json({ status: "true", message: "saved successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.getcutomerremark = async (req, res) => {
  try {
    const getremark = await customerremark
      .find()
      .populate("id")
      .sort({ createdAt: -1 });
     
    return res.status(200).json({
      status: "true",
      message: "Data Found",
      data: getremark
    });
  } catch (error) {
    return res.status(500).json({ message: "Not Found", error });
  }
};

exports.EditcustomerRemark = async (req, res) => {
  // try {
  //     const {date,remark,image} = req.body;
  //     const updatedData = await customerremark.findByIdAndUpdate(req.params.id, {date,remark,image}, { new: true });
  //      res.status(200).json({ message: 'Data Updated',updatedData });
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //     res.status(500).json({ message: 'Controller Internal server error' });
  //   }
  try {
    let data = await customerremark.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Controller Internal server error", error });
  }
};

exports.getremarkid = async (req, res) => {
  try {
    let remarkid = await customerremark.findById({ _id: req.params.id });
    res.send(remarkid);
  } catch (error) {
    res.status(500).json({ message: "Data Not Found" });
  }
};

exports.getAllremarkTodayDate = asyncHandler(async (req, res) => {
  try {
    const { date } = req.body;
    const today = new Date(date);
    // const today = new Date('2024-02-26');
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero for precise date comparison

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to the next day

    const query = {
      date: {
        $gte: today, // Greater than or equal to today's date
        $lt: tomorrow, // Less than tomorrow's date
      },
      // other query conditions if any...
    };

    let remarkid = await customerremark
      .find(query)
      .populate("id")
      .sort({ createdAt: -1 });

    if (remarkid.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Data Found",
        data: remarkid,
        today,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No Data Found",
        data: [],
        today,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

exports.getAllremark_by_customer_id = async (req, res) => {
  try {
    let data = await customerremark
      .find({ id: req.params.id })
      .populate("id")
      .sort({ createdAt: -1 });
   const findcustomer = await customertable.findById(req.params.id);
    res.status(200).json({ status: "success", data,findcustomer });
  } catch (error) {
    res.status(500).json({ message: "Data Not Found" });
  }
};
exports.getAllremarksDetail = async (req, res) => {
  try {
    let data = await customerremark
      .find({})
      .populate("id")
      .sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ message: "Data Not Found" });
  }
};
//========controller
exports.imageUpload = async (req, res, next) => {
  try {
    const Url = process.env.MAIN_URL + "Uploads/image/" + req.file.filename;
    const filename = req.file.filename;
    res.status(200).json({
      status: "success",
      message: "Created Successfully",
      imagename: filename,
      url: Url,
    });
  } catch (error) {
    res.status(500).json({ message: "Data Fail" });
  }
};
