import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://newUser:arnHySaTy3KCYv54@cluster0.3rezv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Connection error:", err);
  }
};

export default connectToMongo;
