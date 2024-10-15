if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");
const app = express();
 const mongoose = require ("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const passport =require("passport");
 const Localstrategy = require("passport-local");
const User = require("./models/user.js");
const reviewsRouter = require("./routes/review.js");
const listingsRouter = require("./routes/listings.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

//const mongo_url= "mongodb://127.0.0.1:27017/wonderlust";
const db_url = process.env.ATLASDB_URL;
  main(). then(() =>{
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

  async function main() {
    await mongoose.connect(db_url);
 };
 
 app.set("view engine", "ejs");

 app.set("views", path.join(__dirname,"views"));
 app.use(express.urlencoded({ extended: true} ));
  app.use(methodoverride("_method")) ; 
  app.engine("ejs",ejsMate);
 app.use(express.static(path.join(__dirname,"/public"))); 
 
 // Add your routes and other middleware here
 
//  app.listen(3000, () => {
//    console.log('Server running on port 3000');
//  });
 

const store= MongoStore.create({
  mongoUrl:db_url,
  crypto:{
    secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});
store.on("error", () =>{
  console.log("error in mongo session store", err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,  
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 1 week in milliseconds
  httpOnly: true,
  }
};



// app.get ("/", (req,res) => {
//   res.send("Hi, i am root");
// });


app.use(session(sessionOptions));
app.use(flash());


  
  

  app.use(passport.initialize());
  app.use(passport.session());
  
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});

 
// app.get("/demouser", async(req,res) => {
//   let fakeUser = new User ({
//     email: "student@gmail.com",
//     username:"Delta- student"
//   });
//  let ragisterUser = await User.register(fakeUser,"helloworld");
// res.send(ragisterUser);

// })




app.use("/listings",listingsRouter);
 app.use("/listings/:id/review", reviewsRouter);
app.use("/" , userRouter);
 app.all("*", (req,res, next) =>{
  next(new ExpressError(404,"Page not found"));
 })
 app.use((err, req, res, next)  => {
  let { statusCode =500, message = "Somthing went Wronge"} = err;
 res.status(statusCode).render("error.ejs" ,{message})
  // res.status(statusCode).send(message);
 });
 app.listen(8080, () =>{ 
    console.log("listning to the port 8080");
 });