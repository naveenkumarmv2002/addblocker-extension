const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
  const { type, message, timestamp } = req.body;
  console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
  res.send({ status: 'ok' });
});

app.listen(PORT, () => console.log(`🟢 Logging on http://localhost:${PORT}`));
