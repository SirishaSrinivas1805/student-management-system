const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors'); // ✅ Import cors


dotenv.config();  
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api', studentRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
