const API_URL = `https://pokeapi.co/api/v2/pokemon/`;

const getAllPokemon = async (skip = 0, limit = 10) => {
	const res = await fetch(`${API_URL}?limit=${limit}&offset=${skip}`);

	if (res.status !== 200) {
		throw new Error(res.statusText);
	}

	return await res.json();
}

const getPokemonByName = () => {}

export {
	API_URL,
	getAllPokemon,
	getPokemonByName,
}
