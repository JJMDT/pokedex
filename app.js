const listaPokemon= document.querySelector('#listaPokemon');
const URL = "https://pokeapi.co/api/v2/pokemon/";

const botonHeader = document.querySelectorAll('.btn-header');
const pokemonIdInput = document.querySelector('#pokemonId');
const buscarPokemonButton = document.querySelector('#buscarPokemon');
const ver =document.getElementById('verTodo');



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
}
botonHeader.forEach(boton => boton.addEventListener('click', (event)=>{
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

const pokemonCountElement = document.querySelector('#pokemonCount');

function mostrarPokemon(pokemon) {
  // ...
  listaPokemon.append(div);
  updatePokemonCount();
}

function updatePokemonCount() {
  const pokemonCount = listaPokemon.childElementCount;
  pokemonCountElement.textContent = `Mostrando ${pokemonCount} Pokémon`;
}


// // busca 1 pokemon por nro ID
// idPokemon.addEventListener('click',()=>{
//     const idPokemons=idPokemonsInput.value;
//     fetchPokemon(idPokemons);
//     listaPokemon.innerHTML = '';
//  })















// // muestra cantidad de pokemon
// buscarPokemon.addEventListener('click',()=>{
//     const numPokemons=numPokemonsInput.value;
//     fetchPokemons(numPokemons);
//     listaPokemon.innerHTML = '';
// })
// // busca 1 pokemon por nro ID
// idPokemon.addEventListener('click',()=>{
//     const idPokemons=idPokemonsInput.value;
//     fetchPokemon(idPokemons);
//     listaPokemon.innerHTML = '';
//  })

// // ver todos los pokemon
//  verTodo.addEventListener('click',()=>{
//     fetchPokemons(151);
//     listaPokemon.innerHTML = '';
//  })

// function fetchPokemon(id) {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
//     .then ((res) => res.json())
//     .then ((data) => createPokemon(data));
// }

// function fetchPokemons (num){
//     for (let i = 1; i <= num; i++ ){
//         fetchPokemon(i)
//     }
// }

// function createPokemon(pokemon) {

//     let tipos = pokemon.types.map(type => {
//         let className = type.type.name;
      
//         return `<p class="${className} tipo">${type.type.name}</p>`;
//       });
      
//       tipos = tipos.join("");
      

//     const div= document.createElement('div');
//     div.classList.add('cardPokemon');
//     div.innerHTML =`
//     <div class="imgPokemon">
//                 <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
//             </div>
//             <div class="nombrePokemon">
//                 <p id="idPokemon"> #${pokemon.id} </p>
//                 <h2 id="nombrePokemon"> ${pokemon.name}</h2> 
//             </div>
//             <div class="tipoPokemon">
//                 ${tipos}
//             </div>
//             <div class="stats">
//                 <p class="stat">Height: ${pokemon.height}</p>
//                 <p class="stat">Weight: ${pokemon.weight}</p>
//             </div>
//      </div>
//     `;

//     listaPokemon.append(div);
// }
