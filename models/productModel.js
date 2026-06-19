import { Schema,model } from "mongoose"


const productSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:Array,required:true},
    sizes: { type: String, required: true },
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    bestSeller:{type:Boolean},
});


const productModel = new model("Product",productSchema);
export default productModel;