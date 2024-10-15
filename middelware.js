module.exports.isloggedIn =( req, res, next ) =>{
   
  if(! req.isAuthenticated()){
       req.session.redirectUrl= req.originalUrl;
        req.flash("error"," you must logged in to create listings");
        res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl = ( req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};