const adminMiddleware=(req,res,next)=>{
    if(req.user.role!=='admin'){
       return res.status(400).json({
            message:"admin can only access"
        })
    }
    next()
}
export default adminMiddleware