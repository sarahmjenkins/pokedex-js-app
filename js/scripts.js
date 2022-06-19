//Creates the list of Pokemon that will be available in the Pokedex app.
let pokemonList = [
  {name: 'Snorlax', height: 2.1, type: ['normal']},
  {name: 'Frillish', height: 1.2, type: ['water', 'ghost']},
  {name: 'Cubchoo', height: 0.5, type: ['ice']},
  {name: 'Jigglypuff', height: 0.5, type: ['fairy', 'normal']},
  {name: 'Meganium', height: 1.8, type: ['grass']}
];

//Loop lists names and heights of pokemon and adds note "Wow, that's big!" if the pokemon's height is greater than or equal to 2 meters.

//This was the original way I wrote it, and it worked, but I wanted to try out addigning a variable like the tips at the end of the exercise talked about. (see below)

for (let i=0; i<5; i++) {
  if (pokemonList[i].height >= 2) {
    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters<br>(Wow, that's big!)</p>`)
  } else {
    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters</p>`);
  }
}

/* 
Trying out creating a variable based on tip at the bottom said that "assigning variables can help with readability and avoid lines becoming too long"

First attempt--problem is that bigPokemon becomes a true/false, so bigPokemon.name and bigPokemon.height is undefined bc value of bigPokemon is true or false

for (let i=0; i<5; i++) {
  let bigPokemon = pokemonList[i].height >= 2 
  if (bigPokemon) {
    document.write(`<p>${bigPokemon.name}, height: ${bigPokemon.height} meters<br>(Wow, that's big!)</p>`)
  } else {
    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters</p>`);
  }


Second attempt--This one works, but it seems like more work than the version above, so I'm going with the one that doesn't create the variable

for (let i=0; i<5; i++) {
  if (pokemonList[i].height >= 2) {
    let bigPokemon = pokemonList[i];
    document.write(`<p>${bigPokemon.name}, height: ${bigPokemon.height} meters<br>(Wow, that's big!)</p>`)
  } else {
    document.write(`<p>${pokemonList[i].name}, height: ${pokemonList[i].height} meters</p>`);
  }
}
*/
