import mongoose from "mongoose";


function connect() {
    // Strip password for logging (security)
    const sanitizedUri = process.env.MONGO_URI.replace(
      /(:\/\/)([^:]+):([^@]+)@/, 
      '$1$2:****@'
    );
    console.log("Attempting to connect to:", sanitizedUri);
    
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
      });
  }

export default connect;