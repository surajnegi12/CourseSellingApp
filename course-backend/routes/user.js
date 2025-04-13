const {Router, json}=require("express");
const { userModel, purchaseModel, courseModel, reviewModel } = require("../db");
const userRouter=Router();
const bcrypt=require("bcrypt");
const {z}=require("zod");
const jwt= require('jsonwebtoken');
const {jwtSceretUser} = require("../config");
const {authMiddleware} = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/requireRole ");
  

    userRouter.post("/signup",async (req,res)=>{
        const requireBody=z.object({
            email:z.string().min(3).max(100).email(),
            password:z.string().min(3).max(100),
            firstName:z.string().min(3).max(100),
            lastName:z.string().min(3).max(100),
            role: z.enum(["user", "admin"]).optional()
        })
        const parseDataWithSuccess=requireBody.safeParse(req.body);
        if(!parseDataWithSuccess.success){
            res.json({
                message:"invalid format",
                error:parseDataWithSuccess.error
            })
            return;
        }
       
        const {email,password,firstName,lastName ,role="user"}=req.body;
        let errorThrown=false;
        try {
            const hashedPassword=await bcrypt.hash(password,5);
            await userModel.create({
                email:email,
                password:hashedPassword,
                firstName:firstName,
                lastName:lastName,
                role
             });
        } catch (error) {
            res.json({
                message:"user already exists"
            })
            errorThrown=true;
        }
        if(!errorThrown){

            res.json({
                message:"signup successful"
            })
       
    }}
    )
    userRouter.post("/signin",async (req,res)=>{
        const { email, password } = req.body;

        try {
            const user = await userModel.findOne({ email });
    
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
    
            const token = jwt.sign({ id: user._id,role:user.role }, jwtSceretUser);
           
            res.status(200).json({ token,role:user.role, message: "Login successful",user})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    })
    
    userRouter.get("/purchases",authMiddleware, requireRole("user"),async (req,res)=>{

        const userId=req.userId;
        const purchasedCourses= await purchaseModel.find({
            userId
        });
        const course= await courseModel.find({
            _id:{$in:purchasedCourses.map(x=>x.courseId)}
        })
        res.json({
            purchasedCourses,
            course
        })
    })
    userRouter.post("/comment",authMiddleware, requireRole("user"),async(req,res)=>{
     const{courseId,comment}=req.body;
     const userId=req.userId;
     if (!courseId || !comment) {
        return res.status(400).json({ message: "courseId and comment are required" });
      }
      try {
        const newComment = await reviewModel.create({
            userId, courseId, comment
          });
          
const populatedComment = await newComment.populate("userId", "firstName lastName");
        res.json({
            message:"Comment added successfully",
            comment:populatedComment
        })
      } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
      }
    })

    userRouter.get("/details/:courseId",async(req,res)=>{
        const { courseId } = req.params;
        try{
            const course= await courseModel.findById(courseId);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
              }
              const comments=await reviewModel.find({courseId}).populate("userId","firstName lastName");
              res.json({
                course,
                comments
              });
            } catch (error) {
              res.status(500).json({ message: "Error fetching course details", error: error.message });
            }
    })

    userRouter.delete("/comment/:commentId",authMiddleware, requireRole("user"), async (req, res) => {
        const { commentId } = req.params;
        const userId = req.userId;
      
        try {
          const comment = await reviewModel.findById(commentId);
          if (!comment) return res.status(404).json({ message: "Comment not found" });
      
          if (comment.userId.toString() !== userId)
            return res.status(403).json({ message: "Not authorized to delete this comment" });
      
          await reviewModel.findByIdAndDelete(commentId);
          res.json({ message: "Comment deleted successfully", commentId });
        } catch (err) {
          res.status(500).json({ message: "Error deleting comment", error: err.message });
        }
      });
userRouter.put("/comment/:commentId",authMiddleware, requireRole("user"),async(req,res)=>{
    const {commentId}=req.params;
    const { updatedComment } = req.body;
    const userId=req.userId;
    
  try {
    const comment = await reviewModel.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== userId)
      return res.status(403).json({ message: "Not authorized to edit this comment" });

    comment.comment = updatedComment;
    await comment.save();

    res.json({ message: "Comment updated successfully", updatedComment: comment });
  } catch (err) {
    res.status(500).json({ message: "Error updating comment", error: err.message });
  }
})

module.exports={
   userRouter
}