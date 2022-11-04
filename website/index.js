const path = require('path');
const express = require('express');
const app = express();

require('dotenv').config();
let port = process.env.PORT || 3000;

app.use('', express.static(path.join(__dirname, '/pages')));

app.get('/', (req, res) => {
	return res.sendFile('website/pages/homepage.html', { root: '.' });
});

app.get('/dashboard', (req, res) => {
	return res.sendFile('website/pages/dashboard.html', { root: '.' });
});

app.get('/auth', (req, res) => {
	return res.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=988620875622391839&redirect_uri=https%3A%2F%2Fwww.omegabot.xyz%2Fdashboard&response_type=token&scope=identify%20guilds');
});

app.get('/invite', (req, res) => {
	return res.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=988620875622391839&permissions=8&scope=applications.commands%20bot');
});

app.get('*', (req, res) => {
	return res.sendFile('website/pages/error404.html', { root: '.' });
});

app.listen(port, () => console.log(`[SITE] App listening at port ${port}`));