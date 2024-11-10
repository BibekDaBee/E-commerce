const verifyAdmin = (req, res, next) => {
    if(req.role !== 'admin'){
        return res.status(403).send({success: false, message: "Your are not authorized to perfrom this action"})
    }
    next();
}

module.exports = verifyAdmin;