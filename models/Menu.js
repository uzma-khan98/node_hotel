import mongoose from "mongoose";

// * Define the Menu-Schema
const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  price: {
    type: Number,
    required:true,
  },
  taste: {
    type: String,
    enum:['sweet','salty','sour'],
    required:true,
  },
  is_drink: {
    type: Boolean,
    default:false,
  },
  ingredients: {
    type: [String],
    default:[],
  },
  num_sales: {
    type: Number,
   default:0,
  },
 
})

// * create Menu model
const MenuItems = mongoose.model("MenuItems", MenuSchema);
export default MenuItems;