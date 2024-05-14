const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // You need to import axios

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route to handle incoming webhook payload
app.post('/webhook', async (req, res) => {
    try {
        const payload = req.body;

        // Parse the payload
        const commentText = payload.comment.text; // "comment" is an object, not an array
        const commentId = payload.comment_id;
        const createdAt = payload.created_at;
        const eventType = payload.event_type;
        const fileKey = payload.file_key;
        const fileName = payload.file_name;
        const orderId = payload.order_id;
        const triggeredById = payload.triggered_by.id;
        const triggeredByHandle = payload.triggered_by.handle;
        const triggeredByEmail = payload.triggered_by.email;

        // Split commentText by space and check if the first word is "live"
        const firstWord = fileName.split(' ')[0];
        if (firstWord.toLowerCase() === 'live') {
            // If the first word is "live", post the parsed payload to another webhook API
            const actionWordSearch = commentText.toLowerCase();
            const action = actionWordSearch.includes('action') ? 1 : 0;

            const newPayload = {
                commentText,
                commentId,
                createdAt,
                eventType,
                fileKey,
                fileName,
                orderId,
                triggeredById,
                triggeredByHandle,
                triggeredByEmail,
                action
            };


            // Post the parsed payload to another webhook API
            const response = await axios.post('https://hook.us1.make.com/gx1kkqq1cs0z1angvt39ybc2htbxx6x6', newPayload);
            console.log('response: ', response);
            console.log('Payload posted successfully to the second webhook API');
        } else {
            console.log('Comment does not start with "live". Ignoring...');
        }

        res.status(200).send('Payload received and processed successfully');
    } catch (error) {
        console.error('Error processing webhook payload:', error.message);
        res.status(500).send('Internal server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`); // "port" should be "PORT"
});
