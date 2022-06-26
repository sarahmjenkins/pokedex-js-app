//Creates the list of Pokemon that will be available in the Pokedex app.
let pokemonList = [
  {name: 'Snorlax', height: 2.1, type: ['normal']},
  {name: 'Frillish', height: 1.2, type: ['water', 'ghost']},
  {name: 'Cubchoo', height: 0.5, type: ['ice']},
  {name: 'Jigglypuff', height: 0.5, type: ['fairy', 'normal']},
  {name: 'Meganium', height: 1.8, type: ['grass']}
];


//From Task 1.5: forEach() function to take the place of for loop
pokemonList.forEach(function(pokemon) {
  document.write(`<p>${pokemon.name}, height: ${pokemon.height} meters`);
  if (pokemon.height >= 2) {
    document.write('<br>(Wow, that\'s big!)');
  }
  document.write('</p>');
});




//From Task 1.3: loop lists names and heights of pokemon and adds note "Wow, that's big!" if the pokemon's height is greater than or equal to 2 meters.
//for (let i=0; i<pokemonList.length; i++) {
//  if (pokemonList[i].height >= 2) {
//    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters<br>(Wow, that's big!)</p>`)
//  } else {
//    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters</p>`);
//  }
//};
