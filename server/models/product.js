import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;


const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 160,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: {},
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory: {
        type: ObjectId,
        ref: "SubCategory",
        required: true,
    },
    brand: {
        type: ObjectId,
        ref: "Brand",
        required: true,
    },
    stocks: {
        type: Number
    },
    size: {
        type: String
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        url: {
            type: String,
        }
        
    },
    shipping: {
        required: false,
        type: Boolean,
    },
}, {timestamps: true}
);


export default mongoose.model('Product', productSchema);