const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { metricsMiddleware } = require('./middleware/metrics');
const errorHandler = require('./middleware/error-handler');

// Import routes
const authRoutes = require('./routes/auth-routes');
const pollRoutes = require('./routes/poll-routes');
const voteRoutes = require('./routes/vote-routes');
const metricsRoutes = require('./routes/metrics-routes');

const app = express();

// --- CORS (before helmet so SSE works) ---
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// --- Helmet (skip SSE stream routes) ---
app.use((req, res, next) => {
  // Don't apply helmet to SSE stream endpoints - it interferes with event streaming
  if (req.path.endsWith('/stream')) {
    return next();
  }
  helmet()(req, res, next);
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(metricsMiddleware);

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'OpenPoll API is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/votes', voteRoutes);
app.use('/metrics', metricsRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// --- Error Handler ---
app.use(errorHandler);

module.exports = app;
