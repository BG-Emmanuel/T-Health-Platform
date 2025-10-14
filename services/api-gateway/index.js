const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'API Gateway is running',
    timestamp: new Date().toISOString(),
    services: {
      user: 'http://user-service:3001',
      data: 'http://data-service:3003',
      appointment: 'http://appointment-service:3002'
    }
  });
});

// Proxy routes to microservices
app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://user-service:3001',
  changeOrigin: true
}));

app.use('/api/health-data', createProxyMiddleware({
  target: process.env.DATA_SERVICE_URL || 'http://data-service:3003',
  changeOrigin: true
}));

app.use('/api/appointments', createProxyMiddleware({
  target: process.env.APPOINTMENT_SERVICE_URL || 'http://appointment-service:3002',
  changeOrigin: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});