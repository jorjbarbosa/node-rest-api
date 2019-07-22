const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const app = express();

app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
