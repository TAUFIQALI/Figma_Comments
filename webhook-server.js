const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route to handle incoming webhook payload
app.post('/webhook', async (req, res) => {
    try {
        const payload = req.body;

        // Check if the required properties exist in the payload
        if (!payload || !payload.comment || !Array.isArray(payload.comment)) {
            console.log('Payload is missing required properties or not in the expected format.');
            return res.status(400).send('Bad Request');
        }
        let commentText = "";
        // Parse the payload
        // const commentText = payload.comment.map(item => item.text || item.mention || '').join('');
        for (let i = 0; i < payload.comment.length; i++) {
            const comment = payload.comment[i];
            if (comment.text) {
                console.log("Text:", comment.text);
                commentText = commentText.concat(" ", comment.text)
            } else if (comment.mention) {
                console.log("Mention:", comment.mention);
                for (let j = 0; j < payload.mentions.length; j++) {
                    if (comment.mention == payload.mentions[j].id) {
                        console.log("Mention:", payload.mentions[j].handle);
                        commentText = commentText.concat(" ", payload.mentions[j].handle);
                    }
                }

            } else {
                console.log("Unknown comment format:", comment);
            }
        }

        const commentId = payload.comment_id;
        const createdAt = payload.created_at;
        const eventType = payload.event_type;
        const fileKey = payload.file_key;
        const fileName = payload.file_name;
        const orderId = payload.order_id;
        const triggeredById = payload.triggered_by.id;
        const triggeredByHandle = payload.triggered_by.handle;
        const triggeredByEmail = payload.triggered_by.email;

        console.log(commentText);
        console.log(fileName);

        // Split commentText by space and check if the first word is "live"
        const firstWord = fileName.split(' ')[0];
        console.log(firstWord);
        if (firstWord.toLowerCase() === 'live') {
            // If the first word is "live", post the parsed payload to another webhook API
            const actionWordSearch = commentText.toLowerCase();
            console.log(actionWordSearch);

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
            console.log('response: ', response.data);
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
    console.log(`Server is listening at http://localhost:${PORT}`);
});
