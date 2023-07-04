import mongoose, { mongo } from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "Argentina",
    },
    zip: {
      type: Number,
    },
    point: {
      type: Object,
      required: false, 
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Warehouses", warehouseSchema);
