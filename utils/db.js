const mongoose = require("mongoose");

const URI = "mongodb+srv://yash_m:Yashn%408393@cluster0.7h1ga0e.mongodb.net/chatApp?retryWrites=true&w=majority";
      


const connectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("connection success");
    } catch (error) {
        console.log('thus vvv ',error);
        process.exit(0);
    }
}

module.exports = connectDb;