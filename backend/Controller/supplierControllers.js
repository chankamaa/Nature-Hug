 import SupplierModel from "../Model/supplierModel.js";


 const getAllSuppliers = async( req,res,next) =>{

    let Supplier;
    try { Supplier = await SupplierModel.find();
        
    } catch (error) {
        console.log(error);
        
    }
    // not found
    if(!Supplier){
return res.Status(404).json(message,'Supplier not found');

    }
    //Display all suppliers
    return res.Status(200).json({Supplier})  
 };

 export{getAllSuppliers}
 