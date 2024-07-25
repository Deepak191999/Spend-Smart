// module.exports= (req,res,next)=>{
//     if(req.user)return next();
//     res.redirect('/login')
// }


module.exports = (req, res, next) => {
    if (req.user) return next();
    res.status(401).json({ message: 'Unauthorized' }); // Responds with 401 for API calls
};