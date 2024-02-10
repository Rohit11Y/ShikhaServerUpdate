
const {customerremark} = require('../Modal/Remarkschema');


exports.remarkInsert = async(req, res) => {
    // const {id , date , remark , image} = req.body;
    //  try {
    //         const remarklist = await customerremark.create({id,date,remark,image});
    //         res.status(200).json({message:'Data Saved Successfully',remarklist});
    //  } catch (error) {
    //     return res.status(500).json({error:'Error Occured',error});
    //  }
    const {id , date , remark , image} = req.body;

    // if (!name || !phone || !email) {
    //     return res.status(200).json({message:'fill all fields properly'});
    // }
    try {
        // const date = await User.findOne({date:date});
        // if (date) {
        //     return res.status(404).json({error:'already exists'});
        // }else{
            const data = new customerremark({id , date , remark , image});
            await data.save();
            return res.status(200).json({message:'saved successfully'});
        // }
       
        
    } catch (error) {
        console.log(error);        
    }
}

exports.getcutomerremark = async(req,res)=> {
   try {
    const getremark = await customerremark.find().populate('id');
    return res.status(200).json({
        status:'true',
        message: 'Data Found',
        data: getremark
    });

   } catch (error) {
    return res.status(500).json({message:'Not Found',error});
   }
}

exports.EditcustomerRemark = async(req, res) => {
    
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
    )
    res.send(data)
    } catch (error) {
      res.status(500).json({ message: 'Controller Internal server error',error });
    }
      
}


exports.getremarkid = async(req, res)=>{
    try {
        let remarkid = await customerremark.findById({_id:req.params.id});
        res.send(remarkid);
    } catch (error) {
        res.status(500).json({ message: 'Data Not Found' });
    }
}

exports.getAllremark_by_customer_id = async(req, res)=>{
    try {
        let data = await customerremark.find({id:req.params.id}).populate('id').sort({createdAt:-1});
        res.status(200).json({ status: 'success',data });
    } catch (error) {
        res.status(500).json({ message: 'Data Not Found' });
    }
}
exports.getAllremarksDetail = async(req, res)=>{
    try {
        let data = await customerremark.find({}).populate('id').sort({createdAt:-1});
        res.status(200).json({ status: 'success',data });
    } catch (error) {
        res.status(500).json({ message: 'Data Not Found' });
    }
}


//========controller
exports.imageUpload = async (req, res, next) => {
    try {
      const Url = "http://206.189.130.102:4242/" + "Uploads/image/" + req.file.filename;
      const filename = req.file.filename;
      res.status(200).json({
        status: "success",
        message: "Created Successfully",
        imagename: filename,
        url: Url,
      });
    } catch (error) {
        res.status(500).json({ message: 'Data Fail' });
    }
  };

