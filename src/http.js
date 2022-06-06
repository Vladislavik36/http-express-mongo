const express = require('express');
const { getChat, writeMessage } = require('./mongo');
const { http } = require('../settings.json');
const port = http.port;

let app;

async function init() {
    return await new Promise((resolve, reject) => {
        try {
            app = express();
            app.use(express.json());
    
            app.get('/getChat', async (req, res) => {
                res.json(await getChat());
            });
    
            app.post('/sendMessage', async (req, res) => {
                const data = req.body;
				console.log(data);
    
                data.stamp = Date.now();
                data.type = 'user';

                await writeMessage(data);
                res.json({response: true});
            });
    
            app.listen(port, () => {
                console.log(`Listening on ${port}`);
                resolve();
            });
        } catch(e) {
            console.error(e.stack);
            reject(e);
        }
    });
}

module.exports = { app, init };