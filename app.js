const listaPokemon= document.querySelector('#listaPokemon');
const URL = "https://pokeapi.co/api/v2/pokemon/";

const botonHeader = document.querySelectorAll('.btn-header');
const pokemonIdInput = document.querySelector('#pokemonId');
const buscarPokemonButton = document.querySelector('#buscarPokemon');
const ver =document.getElementById('verTodo');
const totalPokemon= document.getElementById('pokemonCount');

let contador = 0;


for (let i=1; i<= ver; i++){
    fetch(URL +i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
       
}

function mostrarPokemon(pokemon) {
    let tipos = pokemon.types.map(type => {
                let className = type.type.name;
              
                return `<p class="${className} tipo">${type.type.name}</p>`;
              });
              
              tipos = tipos.join("");

    const div= document.createElement('div');
    div.classList.add('cardPokemon');
    div.innerHTML =`
    <div class="imgPokemon">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
            </div>
            <div class="nombrePokemon">
                <p id="idPokemon"> #${pokemon.id} </p>
                <h2 id="nombrePokemon"> ${pokemon.name}</h2> 
            </div>
            <div class="tipoPokemon">
                ${tipos}
            </div>
            <div class="stats">
            <p class="stat">EXP ${pokemon.base_experience}</p>
            </div>
     </div>
    `;

    listaPokemon.append(div);
    contador ++;
    mostrarPokemonConsola(pokemon)
}
botonHeader.forEach(boton => boton.addEventListener('click', (event)=>{
    contador = 0;
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML='';
    for (let i=1; i<= 151; i++){
        fetch(URL +i)
            .then((response) => response.json())
            .then(data =>{
                if( botonId === "verTodo"){
                    mostrarPokemon(data)
                } else {
                const tipos= data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data)
                }
            }
            } )
    }
}))
function mostrarPokemonConsola(pokemon) {
    totalPokemon.innerHTML=`Nro de resultado ${contador} pokemon`
    

}
