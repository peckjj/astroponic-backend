const express = require('express');
const app = express();
const port = 3001;

app.use(express.static('static'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
