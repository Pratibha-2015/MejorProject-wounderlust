const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js"); // Assuming 'Listing' is your Mongoose model
const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";

main()
.then( () => {
    console.log("conecting to dB ");
})
.catch((err) => {
    console.log(err);
});

async function main() {
     await mongoose.connect(mongo_url);
};
  const initDB = async () =>{
    await Listing.deleteMany({});
    await  Listing. insertMany(initdata.data);
    console.log("Data was intilized");
  };
   initDB();