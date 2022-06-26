// Creates the list of Pokemon that will be available in the Pokedex app. Includes IIFE from Task 1.5
let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Snorlax', height: 2.1, type: ['normal']},
    {name: 'Frillish', height: 1.2, type: ['water', 'ghost']},
    {name: 'Cubchoo', height: 0.5, type: ['ice']},
    {name: 'Jigglypuff', height: 0.5, type: ['fairy', 'normal']},
    {name: 'Meganium', height: 1.8, type: ['grass']}
  ];

  // function to return pokemonList (Task 1.5)
  function getAll() {
    return pokemonList;
  }

  // function to add a pokemon to pokemonList if it is an object with the right keys (Task 1.5 bonus)
  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon) === ['name', 'height', 'type']) { 
      pokemonList.push(pokemon);
    }
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
    console.log(pokemon);
  }

  // Adding filter/search functionality
  function search(query) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === query.toLowerCase());
  }

  // How to access pokemonRepository
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    search: search
  };
})();

// Task 1.6: access pokemonRepository and create a button for each pokemon in the repository using their name
pokemonRepository.getAll().forEach(function(pokemon) {
 pokemonRepository.addListItem(pokemon);
});


// Accesses pokemonRepository to include details on searched for pokemon
let result = pokemonRepository.search('Jigglypuff');
  document.write(`<p class="filter">Here is the result of your search:<br> ${result[0].name}<br>${result[0].height} meters<br>Type: ${result[0].type}</p>`);

