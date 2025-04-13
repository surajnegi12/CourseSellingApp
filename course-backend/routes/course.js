const Router=require("express");
const {authMiddleware} = require("../middleware/authMiddleware");
const { purchaseModel, courseModel } = require("../db");
const { requireRole } = require("../middleware/requireRole ");

requireRole
const courseRouter=Router();
    courseRouter.post("/purchase",authMiddleware, requireRole("user"), async(req,res)=>{
    const userId=req.userId;
    const courseId=req.body.courseId;
    await purchaseModel.create({
        userId,courseId
    });
    res.json({
        message:"you have successfully bought the course"
    })
    })
    courseRouter.get("/preview",async (req,res)=>{
    const course= await courseModel.find({});
        res.json({
            course
        })
    })

module.exports={
    courseRouter
}