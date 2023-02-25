let canvas;
console.log('Server DNS: ',getDNS);
const DNS = getDNS;

let player = {
    name: '',
    move: ''
};

let userInput;

let rock = {}
let paper = {}
let scissor = {}
let sizeButton = 60;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

    userInput = createInput('');
    userInput.position((windowWidth / 2) - 80, windowHeight - 100);
    userInput.size(200);
    userInput.input(myInputEvent);

    rock = {
        posX: windowWidth / 2,
        posY: windowHeight / 1.5,
        move: '🗿'
    }
    paper = {
        posX: windowWidth / 2,
        posY: windowHeight / 2,
        move: '📄'
    }
    scissor = {
        posX: windowWidth / 2,
        posY: windowHeight / 3,
        move: '✂️'
    }
}

function draw() {
    background(255, 50);
    fill(0);
    ellipse(pmouseX, pmouseY, 50, 50);

    moveButton(rock);
    moveButton(paper);
    moveButton(scissor);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    userInput.position((windowWidth / 2) - 80, windowHeight - 100);

    rock.posX = windowWidth / 2;
    rock.posY = windowHeight / 1.5;

    paper.posX = windowWidth / 2;
    paper.posY = windowHeight / 2;

    scissor.posX = windowWidth / 2;
    scissor.posY = windowHeight / 3;
}

function mouseClicked() {
    buttonHotSpot(rock);
    buttonHotSpot(paper);
    buttonHotSpot(scissor);
}

function touchEnded() {
    buttonHotSpot(rock);
    buttonHotSpot(paper);
    buttonHotSpot(scissor);
}

function keyPressed() {
    if (keyCode === RETURN) {
        console.log(`player name ${player.name}`);
        sendPlayer(player);
    }
}

function myInputEvent() {
    player.name = this.value();
}

function moveButton(element) {
    fill(0);
    textSize(50);
    text(element.move, element.posX - (sizeButton / 3), element.posY + (sizeButton / 3));
}

function buttonHotSpot(element) {
    if (dist(pmouseX, pmouseY, element.posX, element.posY) < sizeButton) {
        player.move = element.move;
        sendMove(player);
    }
}

//---------------------------------------- async fetch functions
async function sendPlayer(player) {
        console.log(player);
        const postRequest = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(player)
        }
        const raw = await fetch('http://localhost:5050/playermoves', postRequest);
        console.log(raw);
}