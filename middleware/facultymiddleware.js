const facultyMiddleware = (req, res, next) => {
    if (req.user.role !== 'faculty' && req.user.role !== 'admin') {
        return res.status(403).json({
            message: "Only faculty and admin can access"
        });
    }

    next();
}

export default facultyMiddleware;