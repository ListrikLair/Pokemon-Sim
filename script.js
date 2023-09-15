// model
let app = document.getElementById('app')
const pokemon = [
    'img/pokemon/snivy.png',
    'img/pokemon/tepig.png',
    'img/pokemon/oshawott.png',
    'img/pokemon/pikachu.png',
    'img/pokemon/pidgey.png',
    'img/pokemon/eevee.png',
    'img/pokemon/rattata.png',
    'img/pokemon/patrat.png',
    'img/pokemon/drilbur.png',
    'img/pokemon/sandile.png',
    'img/pokemon/sudowoodo.png',
    'img/pokemon/solosis.png',
    'img/pokemon/litwick.png'
];
let trainers = [
    Bill = { Pokemon: pokemon[5], Img: 'img/extras/bill.png' },
    Joey = { Pokemon: pokemon[6], Img: 'img/extras/joey.png' },
    Red = { Pokemon: pokemon[3], Img: 'img/extras/trainer.png' }
];
let yourPokemon = [];
let starterChosen = false;
let randomPokemon;
let randomTrainer;
let currentLocation;
let currentIndex = 0;

// view
updateView();
function updateView() {
    if (starterChosen != false) {
        if (currentLocation == 'grass') {
            updateViewBattleGrass();
            return;
        }
        if (currentLocation == 'trainer') {
            updateViewBattleTrainer();
            return;
        }
        updateViewChoice();
    } else {
        updateViewStarter();
    }
}

function updateViewStarter() {
    app.innerHTML = /*HTML*/`
    <div id="startPage">
        <div id="labHeader">Select your starter!</div>
        <div id="starterChoices">
                <div id="starter1" onclick="chooseStarter(0)"><img src="${pokemon[0]}" alt="" /></div>
                <div></div>
                <div id="starter2" onclick="chooseStarter(2)"><img src="${pokemon[2]}" alt="" /></div>
                <div></div>
                <div id="starter3" onclick="chooseStarter(1)"><img src="${pokemon[1]}" alt="" /></div>
            </div>
    </div>
    `;
}

function updateViewChoice() {
    app.innerHTML = /*HTML*/`
        <div id="whichBattle">
            <div id="boxedPokemon">${createBoxHtml()}</div>
            <div id="grass" onclick="setLocationGrass()"></div>
            <div id="trainer" onclick="setLocationTrainer()"></div>
        </div>
    `;
}

function updateViewBattleTrainer() {
    app.innerHTML = /*HTML*/`
        <div class="battlefield">
            <div class="yourPokemon"><img src="${yourPokemon[currentIndex]}" alt="" /></div>
            <div id="enemyTrainer"><img src="${randomTrainer.Img}" alt="" /></div>
            <div class="enemyPokemon"><img src="${randomTrainer.Pokemon}" alt="" /></div>
            <button class="fightButton" onclick="fight()">Fight</button>
        </div>
    `;
}

function updateViewBattleGrass() {
    app.innerHTML = /*HTML*/`
        <div class="battlefield">
            <div class="yourPokemon"><img src="${yourPokemon[currentIndex]}" alt="" /></div>
            <div class="enemyPokemon"><img src="${randomPokemon}" alt="" /></div>
            <button class="fightButton" onclick ="fight()">Fight</button>
            <button class="catchButton" onclick="catchPokemon()">Catch</button>
        </div>
    `;
}

function createBoxHtml() {
    let html = '';
    for (let i = 0; i < yourPokemon.length; i++) {
        html += /*HMLT*/`
        <div><img class="boxedPokemon" src="${yourPokemon[i]}" alt="" /></div>
        `;
    }
    return html;
}

// controller
function chooseStarter(pokemonIndex) {
    starterChosen = true;
    yourPokemon.push(pokemon[pokemonIndex])
    updateView();
}

function setLocationGrass() {
    currentLocation = 'grass';
    randomizeEncounter();
    updateView();
}

function setLocationTrainer() {
    currentLocation = 'trainer';
    randomizeTrainer();
    updateView();
}

function fight() {
    let battleIndex;
    if (currentLocation = 'trainer') {
        battleIndex = Math.floor(Math.random() * 2);
    } else {
        battleIndex = Math.floor(Math.random() * 4)
    }
    if (battleIndex > 0) {
        randomPokemon = '';
        alert('You Win')
        currentLocation = '';
    } else {
        alert('Your pokemon faints')
        yourPokemon.splice(currentIndex, 1)
        if (currentIndex >= yourPokemon.length) {
            alert('You Lose');
            location.reload();
        }
    }
    updateView();
}

function catchPokemon() {
    if (yourPokemon.length < 6) {
        yourPokemon.push(randomPokemon);
    } else { return; }
    currentLocation = '';
    updateView();
}

function randomizeEncounter() {
    let randomIndex = Math.floor(Math.random() * pokemon.length);
    randomPokemon = pokemon[randomIndex];
}

function randomizeTrainer() {
    let randomIndex = Math.floor(Math.random() * trainers.length);
    randomTrainer = trainers[randomIndex];
}