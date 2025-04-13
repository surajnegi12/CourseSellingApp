require('dotenv').config();
const express =require("express");
const app=express();
const mongoose=require("mongoose");
const cors= require("cors")
const port=process.env.PORT||3000
const {userRouter} = require("./routes/user")
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");

app.use(express.json());
app.use(cors())
app.use("/user/v1",userRouter);
app.use("/admin/v1",adminRouter);
app.use("/course/v1",courseRouter);
async function main (){
    await mongoose.connect(process.env.MONGO_URL)
app.listen(port);
}
main();