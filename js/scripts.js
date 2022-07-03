// IIFE for pokemon display in pokedex
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  // return pokemonList
  function getAll() {
    return pokemonList;
  }

  // add a pokemon to pokemonList
  function add(pokemon) {
    if(typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
  } else {
    console.log('Error adding pokemon');
  }}

  // create buttons with names of pokemon in pokemonList
  function addListItem(pokemon) {
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    clickPokemon(button, pokemon); //pokemon details logged to console
  }
  // Adding filter/search functionality
  // function search(query) {
  //   return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === query.toLowerCase());
  // }

  // fetches data from the API, adds pokemon to pokemonList, including name and detailsUrl
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // fetches pokemon details (image, height, types) from API--detailsUrl
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      console.error(e);
    });
  }

  // log details of clicked on pokemon in the console
  function clickPokemon(button, pokemon) {
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  // get details of pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Adding modal to pokedex that shows name, image, height, types of each pokemon when clicked on
  function showModal(pokemon) {
    modalContainer.classList.add('is-visible');
    modalContainer.innerHTML = '';
    
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // add a close button (X) that will close the modal when you click on it
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    // add title to modal with name of pokemon
    let titleElement = document.createElement('h2');
    titleElement.innerText = pokemon.name;

    // add pokemon height and types to the modal
    let contentElement = document.createElement('p');
    let pokemonTypes = pokemon.types.map((item) => item.type.name).join(', ');
    contentElement.innerHTML = `<b>height</b>: ${pokemon.height} meters<br><b>type(s)</b>: ${pokemonTypes}`;
    
    // add pokemon image to the modal
    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image');
    pokemonImage.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);


    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }


  document.querySelector('#modal-button-test').addEventListener('click', () => {
    showModal('Pokemon name', 'Pokemon image and details');
  });

  // closes the modal if it's open when use hits esc key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // closes the modal if use clicks anywhere outside of it when it's open
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modalContainer) {
      hideModal();
    }
  });

  // ways to access pokemonRepository outside of IIFE
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
    // search: search
  };
})();

// call function to add pokemon from API
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Accesses pokemonRepository to include details on searched for pokemon
// let result = pokemonRepository.search('Jigglypuff');
//   document.write(`<p class="filter">Here is the result of your search:<br> ${result[0].name}<br>${result[0].height} meters<br>Type: ${result[0].type}</p>`);

