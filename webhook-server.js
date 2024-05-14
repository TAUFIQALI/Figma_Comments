const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/api/test', (req, res) => {

    console.log('respones===', res);
    res.status(200).send('Test received successfully.');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
