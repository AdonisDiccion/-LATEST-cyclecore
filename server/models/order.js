import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

//CATEGORY SCHEMA

const orderSchema = new Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shiped", "Delivered", "Cancelled"],
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
