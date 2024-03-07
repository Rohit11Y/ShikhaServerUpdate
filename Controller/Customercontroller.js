const {customertable} = require('../Modal/Customerschema');
const { default: mongoose } = require('mongoose');

exports.customerInsert  = async (req , res) => {
    const {name , mobile , address , businessAddress} = req.body;

    if (!name || !mobile || !address || !businessAddress ) {
        
       return res.status(500).json({error:'fill all the fields'});
    }

    try {
        
        const customerlist = await customertable.findOne({mobile:mobile})

        if(customerlist){
            return res.status(500).json({message:'Already Exists'});
        }else{
            
            const dta = await customertable.create({name, mobile , address , businessAddress});
             res.status(200).json({message:'Data Saved Successfully',dta});
        }

    } catch (error) {
        return res.status(500).json({error:'Error Occured'});    
    }

}

exports.getCustomer = async(req, res) => {

    try {

        const customerdata = await customertable.find().sort({createdAt:-1});
        return res.status(200).json({
            status:'true',
            message:'Data Found',
             data: customerdata
        });
        
    } catch (error) {
        res.status(500).json({message:'Data Not Saved Successfully',error});
    }
   
}
exports.getCustomerbyId = async(req, res) => {

    try {

        const customerdata = await customertable.findById(req.params.id).sort({createdAt:-1});
        return res.status(200).json({
            status:'true',
            message:'Data Found',
             data: customerdata
        });
        
    } catch (error) {
        res.status(500).json({message:'Data Not Saved Successfully',error});
    }
   
}
exports.Editcustomer = async(req, res) => {
    
    try {
        const { id } = req.params;
        const newData = req.body; // Assuming the updated data is sent in the request body
    
        const updatedData = await customertable.findByIdAndUpdate(id, newData, { new: true });
    
        res.status(200).json({message:'Success'});
      } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

exports.getcustomerid = async(req, res) => {
    let getcustomeriddata = await customertable.findById(
        {_id : req.params.id}
    );
    res.send(getcustomeriddata);
}

exports.cutomerdelete = async(req,res) => {
    try {
        const { id } = req.params;
    
        const deletedData = await customertable.findByIdAndDelete(id);
    
        if (!deletedData) {
          return res.status(500).json({ message: 'Data not found' });
        }
    
        res.json({ message: 'Data deleted successfully', deletedData });
      } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

