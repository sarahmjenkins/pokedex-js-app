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
    listItem.classList.add('group-list-item')
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button', 'btn', 'btn-outline-primary', 'btn-lg');
    button.setAttribute('data-target', '#modal-container');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    clickPokemon(button, pokemon);
  }

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

  // function for what happens when pokemon is clicked (showDetails will showModal of name, details, image)
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
    // elements for different parts of the model
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    // make sure pokemon modals are emptied between opening different ones
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    // elements for content in the model
    // name
    let pokemonName = document.createElement('h3');
    pokemonName.innerText = pokemon.name;

    // image
    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add('pokemon-image', 'modal-img');
    pokemonImage.setAttribute('style', 'width=50%');
    
    //height
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = `height: ${pokemon.height} meters`;

    //types
    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = `type(s): ${pokemon.types.map((item) => item.type.name).join(', ') }`;

    // add pokemon-specific content to the differnet parts of the modal
    modalTitle.appendChild(pokemonName);
    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonTypes);
  }

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

