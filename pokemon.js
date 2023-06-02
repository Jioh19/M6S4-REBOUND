const fs = require("fs/promises");
const axios = require("axios");

//* Leemos el archivo para obtener una lista de pokemones
async function readFile() {
	try {
		const texto = await fs.readFile("./pokemones.txt", "utf8");
		const pokemon = JSON.parse(texto);
		return pokemon;
	} catch (err) {
		console.log(err);
	}
}

//* Seleccionamos de manera random a un pokemon de la lista
async function randomPokemon() {
	const pokemon = await readFile();
	const seleccion = Math.floor(Math.random() * pokemon.length);
	buscarPokemon(pokemon[seleccion]);
}

//* Buscamos por el nombre al pokemon en la pokeapi
function buscarPokemon(pokemon) {
	console.log("Este es mi pokemon: ", pokemon);
	axios.get("http://pokeapi.co/api/v2/pokemon").then((respuesta) => {
		const { data } = respuesta;
		for (const seleccion of data.results) {
			if(seleccion.name == pokemon) {
                console.log("Lo encontre!!!: ", seleccion);
            }
		}
	}).catch(err => console.log(err));
}
randomPokemon();
