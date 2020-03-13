const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function showTrainers(trainerArray){
    trainerArray.map(trainer => {
        createTrainer(trainer)
    })
};

fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => showTrainers(trainers))
    

function createTrainer(trainer){
    const trainer_list = document.querySelector("main")
    const div = makeTrainerCard(trainer)
    trainer_list.append(div);
}

function makeTrainerCard(trainer) {
    const div = document.createElement("div")
    div.className = "card";

    const btn = document.createElement("button")
    btn.innerText = "Add Pokemon"

    btn.addEventListener("click", () => {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        })
        .then(res => res.json())
        .then(newPokemon => createLi(newPokemon))
    });

    function createLi(pokemon){
        const li = document.createElement("li")
        const delBtn = document.createElement("button")
        delBtn.className = "release"
        li.innerText = `${pokemon.nickname}(${pokemon.species})`
        delBtn.innerText = "release"

        delBtn.addEventListener("click", () => {
            fetch(POKEMONS_URL+`/${pokemon.id}`, {
                method: "DELETE"
            })
        
        .then(res => res.json())
        .then(remove => {
            li.remove()
        })
    });

        li.append(delBtn)
        ul.append(li)
    }

    const ul = document.createElement("ul")
    // need to iterate through pokemons of trainer to make an li for each pokemon... ??
    // function listPokemon(trainer){
        trainer.pokemons.map(pokemon => {
        // const li = document.createElement("li")
        // const delBtn = document.createElement("button")
        // delBtn.className = "release"
        // li.innerText = `${pokemon.nickname}(${pokemon.species})`
        // delBtn.innerText = "release"
        // li.append(delBtn)
        // ul.append(li)
        createLi(pokemon)
        })
    // const li = document.createElement("li")
    // li.innerText = `${trainer['pokemons']['nickname']}(${trainer.pokemons.species})`

    // const relBtn = document.createElement("button")
    // relBtn.className = "release"

    // li.append(relBtn)
    // ul.append(li)
    div.append(btn,ul)
    return div;
}



