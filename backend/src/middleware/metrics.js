const client = require('prom-client');
const sseManager = require('../services/sse-manager');

// Create a registry
const register = new client.Registry();

// Add default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.001, 0.005, 0.015, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
  registers: [register],
});

const activeSseConnections = new client.Gauge({
  name: 'active_sse_connections',
  help: 'Number of active SSE connections',
  registers: [register],
  collect() {
    this.set(sseManager.getActiveConnections());
  },
});

const votesTotal = new client.Counter({
  name: 'votes_total',
  help: 'Total number of votes submitted',
  registers: [register],
});

/**
 * Middleware to track HTTP request metrics
 */
function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route,
      },
      duration
    );
  });

  next();
}

module.exports = {
  register,
  metricsMiddleware,
  votesTotal,
  activeSseConnections,
};
