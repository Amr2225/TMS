import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/TMS").then(() => console.log("connected"));

export { mongoose };
