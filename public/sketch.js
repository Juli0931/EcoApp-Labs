let canvas;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0, 50);
    newCursor();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

//Eventos
document.getElementById("User").onclick = getUser;
document.getElementById("Bitcoin").onclick = getBitcoin;
document.getElementById("US").onclick = getPopulation;
document.getElementById("Dog").onclick = getDog;
document.getElementById("Cat").onclick = getCat;

//Fetch
let data;

async function getData(URL){
    try {
        const response = await fetch(URL);
        data = await response.json();
        console.log(data);
        render(URL);
    } catch (error) {
        console.log(error);
    }
}

function getUser(){
    getData("https://randomuser.me/api/");
    render();
}

function getBitcoin(){
    getData("https://api.coindesk.com/v1/bpi/currentprice.json");
    render();
}

function getPopulation(){
    getData("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
    render();
}

function getDog(){
    getData("https://dog.ceo/api/breeds/image/random");
    render();
}

function getCat(){
    getData("https://catfact.ninja/fact");
    render();
}

//Mostrar en pantalla
function render(URL) {
    document.getElementById("Render").innerHTML = '';
    const render = document.createElement('div');
    if(URL == "https://randomuser.me/api/"){
        render.innerHTML = `<h3>This is a random user</h3> <br> <img class="somePic" src="${data.results[0].picture.large}"> <p>Name: ${data.results[0].name.first} ${data.results[0].name.last}</p> <p>Gender: ${data.results[0].gender}</p> <p>Age: ${data.results[0].dob.age}</p> <p>Location: ${data.results[0].location.country}</p> <p>Email: ${data.results[0].email}</p> <p>Cell: ${data.results[0].cell}</p>`;
    }
    if(URL == "https://api.coindesk.com/v1/bpi/currentprice.json"){
        render.innerHTML = `<h3>This is the bitcoin's current price</h3> <br> <p>${data.bpi.USD.code}: ${data.bpi.USD.rate} <br> ${data.bpi.USD.description}</p> <p>${data.bpi.GBP.code}: ${data.bpi.GBP.rate} <br> ${data.bpi.GBP.description}</p> <p>${data.bpi.EUR.code}: ${data.bpi.EUR.rate} <br> ${data.bpi.EUR.description}</p>`;
    }
    if(URL == "https://datausa.io/api/data?drilldowns=Nation&measures=Population"){
        render.innerHTML = `<h3>This is the US population</h3> <br> <p>${data.data[0].Year}: ${data.data[0].Population}</p> <p>${data.data[1].Year}: ${data.data[1].Population}</p> <p>${data.data[2].Year}: ${data.data[2].Population}</p> <p>${data.data[3].Year}: ${data.data[3].Population}</p>`;
    }
    if(URL == "https://dog.ceo/api/breeds/image/random"){
        render.innerHTML = `<h3>This is a random doggo (So cute!)</h3> <br> <img class="somePic" src="${data.message}">`;
    }
    if(URL == "https://catfact.ninja/fact"){
        render.innerHTML = `<h3>This is a random fact about cats (Also cute!)</h3> <br> <p>${data.fact}</p>`;
    }
    document.getElementById("Render").appendChild(render);
}