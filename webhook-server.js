const express = require('express');
// const { default: axios } = require('axios');
//add token ........
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/api/test', (req, res) => {
    try {
        console.log('respones===', res);
        res.status(200).json({ message: "success"};
    } catch (error) {
        console.log(error)
    }
});

// app.get('/api/comments/all', async (req, res) => {
//     try {
//         const projectsResponse = await axios.get('https://api.figma.com/v1/teams/801283212722480856/projects', {
//             headers: {
//                 'X-FIGMA-TOKEN': figmaToken
//             }
//         });

//         const projects = projectsResponse.data.projects;
//         const allComments = [];

//         // Iterate over each project
//         for (const project of projects) {
//             const projectId = project.id;

//             // Fetch files for the project
//             const filesResponse = await axios.get(`https://api.figma.com/v1/projects/${projectId}/files`, {
//                 headers: {
//                     'X-FIGMA-TOKEN': figmaToken
//                 }
//             });

//             const files = filesResponse.data.files;

//             // Iterate over each file
//             for (const file of files) {
//                 const fileId = file.key;

//                 // Fetch comments for the file
//                 const commentsResponse = await axios.get(`https://api.figma.com/v1/files/${fileId}/comments`, {
//                     headers: {
//                         'X-FIGMA-TOKEN': figmaToken
//                     }
//                 });

//                 const comments = commentsResponse.data.comments;
//                 allComments.push({ fileId, comments });
//             }
//         }

//         res.status(200).json(allComments);
//     } catch (error) {
//         console.error('Error fetching comments from Figma:', error);
//         res.status(500).send('Error fetching comments from Figma.');
//     }
// });

// app.get('/api/comments', async (req, res) => {
//     try {
//         const figmaFileId = 'ynsokc4dzkeQPU2ZvaHna4';
//         const url = `https://api.figma.com/v1/files/${figmaFileId}/comments`;

//         const response = await axios.get(url, {
//             headers: {
//                 'X-FIGMA-TOKEN': figmaToken
//             }
//         });
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error('Error fetching comments:', error);
//         res.status(500).send('Error fetching comments from Figma.');
//     }
// });

// app.post('/api/webhook', (req, res) => {
//     // Handle the incoming webhook payload
//     const payload = req.body;
//     console.log('Received webhook payload:', payload);

//     // Your logic to process the payload goes here

//     res.status(200).send('Webhook received successfully.');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
