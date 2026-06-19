// controllers/productController.js
import productModel from "../models/productModel.js";
import Country from "../models/country.js";
import City from "../models/city.js";


// 1️⃣ Add Product
const addProduct = async (req, res, next) => { 
  try {
    const { name, description, sizes, category, subCategory, bestSeller } = req.body;
    
   
    const images = [];
    const fileFields = ["image1", "image2", "image3"];

    for (const field of fileFields) {
      const file = req.files?.[field]?.[0];
      if (file) {
        const imagePath = `/assets/products/${file.filename}`;
        images.push(imagePath);
      }
    }

    const product = await productModel.create({
      name,
      description,
      image: images,
      sizes,
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
    });

    res.status(201).json({success: true,message: "✅ Product added successfully",product,});
  } catch (error) {
    next(error);
  }
};

// 2️⃣ List Products
const listProduct = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// 3️⃣ Remove Product
const removeProduct = async (req, res, next) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "🗑️ Product removed" });
  } catch (error) {
    next(error);
  }
};

//  4 Add COuntries
const countries =  async (req, res, next) => {
  try {
    const { name, code } = req.body;
    if (!name) return res.status(400).json({ message: "Country name required" });

    const exists = await Country.findOne({ name });
    if (exists) return res.status(409).json({ message: "Country already exists" });

    const country = await Country.create({ name, code });
    res.status(201).json({ message: "Country added", country });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


// 5 get a COuntry name 
const getCountries = async (req, res, next) => {
     try {
      const countries = await Country.find().sort({name: 1});
      res.json(countries);
     } catch (error) {
      next(error);
     }
};

// 6 
// Admain Added a City 
export const createCity = async (req, res, next) => {
  try {
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({ message: "Name and country required" });
    }
    const exist = await City.findOne({ name });
    if (exist) {
      res.status(409).json({message: "City already exists"});
    }

    const city = await City.create({ name, country });

    res.status(201).json({success: true, city});
  } catch (error) {
    console.log("CITY ERROR:", error);
    next(error)
  }
};



// Here get a CIty anme 
export const getCitiesByCountry = async (req, res, next) => {
  try {
    const { countryId } = req.params;

    const cities = await City.find({ country: countryId });
    res.status(200).json(cities);
  } catch (error) {
    next(error)
  }
};




export { addProduct, listProduct, removeProduct, countries, getCountries};
