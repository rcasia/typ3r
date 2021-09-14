const express = require('express');
const app = express();

app.use(express.static('./dist/typ3r'))

app.get('/*', (req, res) => {
	res.sendFile('index.html', {root: 'dist/typ3r/'})
});

app.listen(process.env.PORT || 8080);
