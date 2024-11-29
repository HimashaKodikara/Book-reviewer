const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookroute');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.json("From Backend start");
});

// Start the server
const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
