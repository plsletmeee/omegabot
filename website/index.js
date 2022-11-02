const path = require('path');
const express = require('express');
const app = express();

require('dotenv').config();
let port = process.env.PORT || 3000;

app.use('',express.static(path.join(__dirname, '/public')));

app.get('/', (request, response) => {
	return response.sendFile('website/public/homepage.html', { root: '.' });
});

app.get('/dashboard', (request, response) => {
	return response.sendFile('website/public/dashboard.html', { root: '.' });
});

app.get('/auth', (request, response) => {
	return response.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=988620875622391839&redirect_uri=https%3A%2F%2Fwww.omegabot.xyz%2Fdashboard&response_type=token&scope=identify%20guilds');
});

app.get('/invite', (request, response) => {
	return response.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=988620875622391839&permissions=8&scope=applications.commands%20bot');
});

app.get('*', (request, response) => {
	return response.sendFile('website/public/error404.html', { root: '.' });
});

app.listen(port, () => console.log(`[SITE] App listening at port ${port}`));