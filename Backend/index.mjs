// Import the connectToMongo function and other required modules
import connectToMongo from './db.mjs';
import express from 'express';
import cors from 'cors';
import tourPackageRoutes from './Routes/packageMang.mjs';
import buyerRoutes from './Routes/buyer.mjs'

// Connect to MongoDB
connectToMongo();

const app = express();
const port = 5000;

// Use middleware
app.use(cors());
app.use(express.json());

app.use("/api/tourPackages", tourPackageRoutes);
app.use("/api", buyerRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Travel App backend listening at https://localhost:${port}`);
});
