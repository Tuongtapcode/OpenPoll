require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/openpoll';

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ MongoDB connected successfully`);
  } catch (error) {
    console.error(`❌ MongoDB connection error:`, error.message);
    process.exit(1);
  }
}

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// Start server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════╗
    ║                                           ║
    ║   🗳️  OpenPoll API Server                 ║
    ║                                           ║
    ║   Port:     ${PORT}                          ║
    ║   Mode:     ${process.env.NODE_ENV || 'development'}                 ║
    ║   MongoDB:  Connected                     ║
    ║   Metrics:  http://localhost:${PORT}/metrics  ║
    ║                                           ║
    ╚═══════════════════════════════════════════╝
    `);
  });
}

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

startServer();
