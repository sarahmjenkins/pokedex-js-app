// Creates the list of Pokemon that will be available in the Pokedex app. Includes IIFE from Task 1.5
let pokemonRepository = (function () {
  let pokemonList = [];

  // API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // function to return pokemonList (Task 1.5)
  function getAll() {
    return pokemonList;
  }

  // function to add a pokemon to pokemonList
  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  // Task 1.6: create buttons with names of pokemon in pokemonList
  function addListItem(pokemon) {
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    //function that logs pokemon details in console when clicked on
    clickPokemon(button, pokemon);
  }
  
  // Functions to create event handler that will log details of clicked on pokemon in the console
  function clickPokemon(button, pokemon) {
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }
  
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  // Adding filter/search functionality
  function search(query) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === query.toLowerCase());
  }

  // Task 1.7: fetches data from the API, adds each pokemon to pokemonList with add function. Each will have name and detailsUrl
  function loadList() {
    showLoadingMessage('Loading...');
    return fetch(apiUrl).then(function (response) {
      hideLoadingMessage();
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
      hideLoadingMessage();
      console.error(e);
    })
  }

  // Task 1.7: similar to loadList() function, this adds image, height, and type data for each pokemon from the API
  function loadDetails(item){
    showLoadingMessage('Loading...');
    let url = item.detailsUrl;
    // fetch(url) is shorthand for using GET method
    return fetch(url).then(function(response){
      hideLoadingMessage();
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

  // How to access pokemonRepository
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    search: search
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Task 1.6: access pokemonRepository and create a button for each pokemon in the repository using their name
pokemonRepository.getAll().forEach(function(pokemon) {
 pokemonRepository.addListItem(pokemon);
});


// Accesses pokemonRepository to include details on searched for pokemon
// let result = pokemonRepository.search('Jigglypuff');
//   document.write(`<p class="filter">Here is the result of your search:<br> ${result[0].name}<br>${result[0].height} meters<br>Type: ${result[0].type}</p>`);

