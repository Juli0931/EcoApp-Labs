let PokeId;

async function getData (PokeId){
    try {
        const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${PokeId}`)
        data = await response.json();
        console.log(data);
        render(data);
    } catch (error) {
        console.log(error);
    }
}


document.getElementById("Bulbasaur").addEventListener('click', ()=>{
    PokeId = 1;
    getData(PokeId);
});

document.getElementById("Charmander").addEventListener('click', ()=>{
    PokeId = 4;
    getData(PokeId);
});

document.getElementById("Squirtle").addEventListener('click', ()=>{
    PokeId = 7;
    getData(PokeId);
});


function render(){
    document.getElementById('Render').innerHTML = ``;
    const PokeData = document.createElement('div');
    PokeData.innerHTML = ` <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${PokeId}.gif">
                            <div class="Pokemon">
                                <h2>${data.name}</h2>
                                <div class="generalInfo">
                                    <div>
                                        <h3>Type</h3>
                                        <p>${data.types[0].type.name}</p>
                                    </div>
                                    <div>
                                        <h3>Height</h3>
                                        <p>${data.height} cm</p>
                                    </div>
                                    <div>
                                        <h3>Weight</h3>
                                        <p>${data.weight} grs</p>
                                    </div>
                                </div>
                                <div>
                                    <button onclick="Involve()" class="Evolution">Involve</button>
                                    <button onclick="Evolve()" class="Evolution">Evolve</button>
                                </div>
                            </div>
                        `;
    document.getElementById('Render').appendChild(PokeData);
}

function Evolve() {
    console.log("Se conectó");
    if(PokeId == 1 || PokeId == 2 || PokeId == 4 || PokeId == 5 || PokeId == 7 || PokeId == 8){
        getData(++PokeId);
    }
}

function Involve() {
    if(PokeId == 2 || PokeId == 3 || PokeId == 5 || PokeId == 6 || PokeId == 8 || PokeId == 9){
        getData(--PokeId);
    }
}