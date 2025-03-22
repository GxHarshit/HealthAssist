import mongoose from "mongoose";


function connect() {
    // Strip password for logging (security)
   
    
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
      });
  }

export default connect;