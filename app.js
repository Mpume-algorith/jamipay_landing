const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static assets (e.g. styles.css, images) from the project root
app.use(express.static(__dirname));

// Render the HTML file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
