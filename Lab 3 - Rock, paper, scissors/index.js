const express = require('express');
const os = require('os')
const cors = require('cors');
const serverApp = express();
const PORT = 5050;
const IPaddress = "200.3.193.225";

//---------------------------- Setting EJS
serverApp.set('view engine', 'ejs');

//---------------------------- "use" external midleware
serverApp.use(express.json());
serverApp.use(cors({
    origin: '*'
}));

//---------------------------- Server listening
serverApp.listen(PORT, (error) => {
    console.log(`http://${IPaddress}:${PORT}`);
});

//---------------------------- First serve Static resources
serverApp.use('/player', express.static('public-player'));
serverApp.use('/display', express.static('public-display'));

//---------------------------- Dinamic files
serverApp.get('/player', (request, response) => {
    response.render('player', { DNS: `http://${IPaddress}:${PORT}` });
});

serverApp.get('/display', (request, response) => {
    response.render('display', { DNS: `http://${IPaddress}:${PORT}` });  
});


//---------------------------- Data base / API Endpoints
let players = []; 
let playerInfo = '';

serverApp.get('/playermoves', (request, response) => {
    playerInfo = request.body;
    response.send(playerInfo)
});

 serverApp.post('/moves', (request, response) => {
     response.json(playerInfo);
 });