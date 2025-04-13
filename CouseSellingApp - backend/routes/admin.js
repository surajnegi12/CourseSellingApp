const {Router}=require("express");
const adminRouter=Router();
const {courseModel} = require("../db");
const {authMiddleware} = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/requireRole ");
    adminRouter.post("/course", authMiddleware, requireRole("admin"), async(req,res)=>{
        const userId=req.userId;
       const{title,description,price,imgUrl}=req.body;
       const course=await courseModel.create({
        title:title,
        description:description,
        price:price,
        imgUrl:imgUrl,
        creatorId:userId,
       });
       res.json({
        message:"course created",
        courseId:course._id
       })
    });

adminRouter.delete("/course/:courseId",authMiddleware,requireRole("admin"),async(req,res)=>{
    const {courseId}=req.params;
   
  try {
const course=await courseModel.findOneAndDelete({_id:courseId});
    if(!course){
        res.status(404).json({message:"course dosen't exist"})
    }
    res.json({
        message: "deleted successfully"
    })
  } catch (error) {
    res.json({message:"error in deleting the course"})
  }

})

    adminRouter.get("/course/bulk", authMiddleware, requireRole("admin"), async (req,res)=>{
        const userId=req.userId;
        const courses=await courseModel.find({
            creatorId:userId
        }) ;
        res.json({
            courses
        })
    });

module.exports={
    adminRouter
}