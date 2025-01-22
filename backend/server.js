const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Pagrindinis API maršrutas
app.get('/', (req, res) => {
    res.send('Sveiki atvykę į Laivų mūšio serverį!');
});

// Paleiskite serverį
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serveris paleistas ant http://localhost:${PORT}`);
});
