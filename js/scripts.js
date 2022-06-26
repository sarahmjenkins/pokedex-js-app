//Creates the list of Pokemon that will be available in the Pokedex app. Includes IIFE from Task 1.5
let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Snorlax', height: 2.1, type: ['normal']},
    {name: 'Frillish', height: 1.2, type: ['water', 'ghost']},
    {name: 'Cubchoo', height: 0.5, type: ['ice']},
    {name: 'Jigglypuff', height: 0.5, type: ['fairy', 'normal']},
    {name: 'Meganium', height: 1.8, type: ['grass']}
  ];
//function to return pokemonList (Task 1.5)
  function getAll() {
    return pokemonList;
  }
//function to add a pokemon to pokemonList if it is an object with the right keys (Task 1.5 bonus)
  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon) === ['name', 'height', 'type']) { 
      pokemonList.push(pokemon);
    }
  }
//How to access pokemonRepository
  return {
    getAll: getAll,
    add: add
  }
})();

//From Task 1.5, Part 2: updated forEach() because of IIFE
pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(`<p>${pokemon.name}, height: ${pokemon.height} meters`);
  if (pokemon.height >= 2) {
    document.write('<br>(Wow, that\'s big!)');
  }
  document.write('</p>');
});

//Task 1.5 bonus: filter by name. I got this far then I got stuck! 
let result = pokemonRepository.getAll().filter(obj => obj.name === 'Snorlax');
document.write(`<p class="filter">Here is the result of your search:<br> ${result}</p>`);



//From Task 1.5, Part 1: forEach() function to take the place of for loop
//pokemonList.forEach(function(pokemon) {
//  document.write(`<p>${pokemon.name}, height: ${pokemon.height} meters`);
//  if (pokemon.height >= 2) {
//    document.write('<br>(Wow, that\'s big!)');
//  }
//  document.write('</p>');
//});


//From Task 1.3: loop lists names and heights of pokemon and adds note "Wow, that's big!" if the pokemon's height is greater than or equal to 2 meters.
//for (let i=0; i<pokemonList.length; i++) {
//  if (pokemonList[i].height >= 2) {
//    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters<br>(Wow, that's big!)</p>`)
//  } else {
//    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters</p>`);
//  }
//};
