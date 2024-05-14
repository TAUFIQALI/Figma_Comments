const express = require('express');
const bodyParser = require('body-parser');
//const { default: axios } = require('axios');
//add token ........
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/api/test', (req, res) => {

    console.log('respones===', res);
    res.status(200).json(res)
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
