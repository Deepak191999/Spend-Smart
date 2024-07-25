module.exports= (req,res,next)=>{
    if (req.user) {
        // Redirect to the homepage if the user is already logged in
        return res.redirect('/');
      }
      // Proceed to the next middleware or route if the user is not logged in
      next();
}