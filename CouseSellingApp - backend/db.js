const mongoose=require("mongoose")
const ObjectId= mongoose.Types.ObjectId;
const Schema= mongoose.Schema;

const userSchema = new Schema({
   email: { type: String, unique: true },
   password: String,
   firstName: String,
   lastName: String,
   role: { type: String, enum: ["user", "admin"], default: "user" }
 });

const courseSchema= new Schema({

    title:String,
    description:String,
    price:Number,
    imgUrl:String,
    creatorId:ObjectId
   
});
const purchaseSchema=new Schema({
   userId: { type: ObjectId,ref:'user'},
   courseId: { type: ObjectId, ref:'course'}
})

const reviewSchema=new Schema({
   userId:{type:ObjectId,ref:'user'},
   courseId:{type:ObjectId,ref:'course'},
   comment:String,
   createdAt: { type: Date, default: Date.now }
})

const userModel= mongoose.model("user",userSchema);
const courseModel=mongoose.model("course",courseSchema)
const purchaseModel= mongoose.model("purchase",purchaseSchema);
const reviewModel=mongoose.model("review",reviewSchema);
module.exports={
userModel,
courseModel,
purchaseModel,
reviewModel
}

