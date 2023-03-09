const NGROK = `${window.location.hostname}:5050`;
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;
let ballSize = 20;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;
    background(0);
}

function draw() {
    background(0);
    newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, ballSize, ballSize);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}

socket.on('mupi-instructions', instructions => {
    console.log('ID: ' + socket.id);

    let { interactions } = instructions;
    switch (interactions) {
        case 0:
            let { pmouseX, pmouseY } = instructions;
            controllerX = (pmouseX * mupiWidth) / deviceWidth;
            controllerY = (pmouseY * mupiHeight) / deviceHeight;
            console.log({controllerX, controllerY});
            break;
        case 1:
            let { pAccelerationX, pAccelerationY, pAccelerationZ } = instructions;
            ballSize = pAccelerationY < 0 ? pAccelerationY * -2 : pAccelerationY * 2;
            break;
        case 2:
            let { rotationX, rotationY, rotationZ } = instructions;
            controllerY = (rotationX * mupiHeight) / 90;
            controllerX = (rotationY * mupiWidth) / 90;
            break;
    }
});

socket.on('mupi-size', deviceSize => {
    let { deviceType, windowWidth, windowHeight } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using an ${deviceType} smartphone size of ${deviceWidth} and ${deviceHeight}`);
});