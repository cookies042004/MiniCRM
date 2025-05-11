const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const dataRoutes = require('./routes/dataRoute');
const campaignRoutes = require('./routes/campaignRoute');
const vendorRoutes = require('./routes/vendorRoute');
const authRoutes = require('./routes/authRoute');
const aiRoutes = require('./routes/aiRoute');

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/campaign', campaignRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/ai', aiRoutes);



module.exports = app;
