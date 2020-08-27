import { IListDataItem } from '../types/data';

const API_URL = `https://pokeapi.co/api/v2/pokemon/`;

const getAllPokemon = async (page = 0, limit = 10) => {
	const skip = (page - 1) * limit;
	const res = await fetch(`${API_URL}?limit=${limit}&offset=${skip}`);

	if (res.status !== 200) {
		throw new Error(res.statusText);
	}

	const data = await res.json();
	data.page = page;

	data.results = data.results.map((p: IListDataItem) => {
		const url = p.url.split('/');
		const id = parseInt(url[url.length - 2]); // When fetching a list of pokemon, 'id' prop is not sent

		return {id, ...p};
	});

	return data;
}

const getPokemonById = async (id: number) => {
	const res = await fetch(`${API_URL}${id}`);

	if (res.status === 404) {
		throw new Error('Pokemon Not Found!');
	} else if (res.status !== 200) {
		throw new Error(res.statusText);
	}

	const {
		name, height, width, base_experience, types, abilities, moves, sprites, stats,
	} = await res.json();

	return { id, name, height, width, base_experience, types, abilities, moves, sprites, stats, isFull: true };
}

export {
	API_URL,
	getAllPokemon,
	getPokemonById,
}
