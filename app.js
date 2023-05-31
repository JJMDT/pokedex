const listaPokemon= document.querySelector('#listaPokemon');
const URL = "https://pokeapi.co/api/v2/pokemon/";

const botonHeader = document.querySelectorAll('.btn-header');
const pokemonIdInput = document.querySelector('#pokemonId');
const buscarPokemonButton = document.querySelector('#buscarPokemon');
const ver =document.getElementById('verTodo');
const totalPokemon= document.getElementById('pokemonCount');

let contador = 0;
const modal = document.createElement('div');
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = 'auto';
modal.style.width = '100%';
modal.style.height = 'auto';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
modal.classList.add('modal');
document.body.append(modal);


for (let i=1; i<= 0; i++){
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
 
    div.addEventListener('click',()=> {
        console.log(`hiciste click en ${pokemon.name}`)
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.tabIndex = -1;
        modal.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${pokemon.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <p>EXP: ${pokemon.base_experience}</p>
              </div>
            </div>
          </div>
        `;
        document.body.append(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    
      
    //     modal.style.display = 'block';
    // modal.innerHTML = `
    //   <div  style="background-color: white; padding: 20px;">

    //      <div class="imgPokemon">
    //             <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
    //         </div>
    //         <div class="nombrePokemon">
    //             <p id="idPokemon"> #${pokemon.id} </p>
    //             <h2 id="nombrePokemon"> ${pokemon.name}</h2> 
    //         </div>
    //         <div class="tipoPokemon">
    //             ${tipos}
    //         </div>
    //         <div class="stats">
    //         <p class="stat">EXP ${pokemon.base_experience}</p>
          
    //         <p class="stat">Height ${pokemon.height}</p>
          
    //         <p class="stat">Weight ${pokemon.weight}</p>
    //         <p class="stat">Weight ${pokemon.weight}</p>
    //         <p class="stat">Weight ${pokemon.weight}</p>
    //         </div>
    //         <button id="closeModal">Cerrar</button>
    //  </div>
    // `;
    const closeModalButton = document.querySelector('#closeModal');
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';})

    });
    
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
