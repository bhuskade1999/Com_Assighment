const ProductModel = require("../Models/Product")
const Category =  require("../Models/Category")
const mongoose = require("mongoose")


/*-----------------------(Creating PRoduct )--------------------------*/ 
exports.createProduct = async (req, res) => {
    try {
        const data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide some data in body" })

        const product = await ProductModel.create(data)

        return res.status(201).json({ success: true, product })

    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
}


//getting all the product with essential details based on category id
exports.getProductByCategory = async (req, res) => {
   
    try {
        const category = req.params.category;
        const products = await ProductModel.find({ category: category })
                                           .select('title price description availability')
                                           
        if (products.length <= 0 ) {
            return res.status(404).json({ status: false, message: 'No products found for the given category' });
        }

        return res.status(200).json({ status: true, products });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


//getting Products Deatils By Its Id
 exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.productId;

      if (!mongoose.isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: "productId is invalid" })
      }
      
      const product = await ProductModel.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      return res.status(200).json({status:true, product});

    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });

    }
  };



 

  //get all categories


 exports.getAllCategories =  async (req, res) => {
    try {
      // Fetch all categories from the database
      const categories = await ProductModel.find();

      if(categories.length <= 0) {
        return res.status(404).json({status:false, message:"No categories found"});
      } 

      return res.status(200).json({status:true, categories});
    } 
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


