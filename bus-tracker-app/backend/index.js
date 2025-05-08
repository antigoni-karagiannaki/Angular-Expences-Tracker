// // backend/index.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// let busData = [];

// app.post('/api/update', (req, res) => {
//   const data = req.body;
//   data.timestamp = Date.now();
//   busData.push(data);
//   res.send({ message: 'Location updated' });
// });

// app.get('/api/buses', (req, res) => {
//   // Return only recent data (last 5 mins)
//   const now = Date.now();
//   const recent = busData.filter(d => now - d.timestamp < 5 * 60 * 1000);
//   res.json(recent);
// });

// app.listen(3000, () => console.log('Backend running on port 3000'));
// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:4200", // Allow requests from Angular frontend
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization" // Allowed headers
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.post('/api/update', (req, res) => {
  const data = req.body;
  data.timestamp = Date.now();
  busData.push(data);
  res.send({ message: 'Location updated' });
});


app.post("/api/location", (req, res) => {
  const { userId, busId, lat, lon } = req.body;


  if (!userId || !busId || !lat || !lon) {
    return res.status(400).send({ error: "Missing data" });
  }

  // Save to database (pseudo-code)
  console.log(`[${new Date().toISOString()}] Bus ${busId} - ${userId}: (${lat}, ${lon})`);

  // Example: Store in-memory (in real life, use a DB)
  // busLocations[busId] = { lat, lon, lastUpdated: new Date(), contributors: [userId] }

  res.send({ status: "Location received" });
});

app.listen(7000, () => {
  console.log("🚀 Bus Tracker backend running on http://localhost:3000");
});
