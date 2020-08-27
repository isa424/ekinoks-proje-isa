import { getAllPokemon, getPokemonById } from '../api';
import IPokemon from "../types/pokemon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from '.';

interface IPokemonState {
	pokemonById: Record<number, IPokemon>
	pagesWithIds: Record<number, number[]>
	all: number[]
	favorites: number[]
	caught: number[]
	isLoading: boolean
	error: string | null
	count: number
}

/**
 * When a pokemon data is first fetched we store it in the store.
 * Data fetched from API is not complete unless it is a single pokemon resource and not a list.
 * When user navigates to home page we fetch a list of incomplete pokemon data and store in the store with the 'isFull'
 * flag on each pokemon being false. When user clicks on a pokemon to see details we fetch the rest of the pokemon data
 * and set 'isFull' to 'true'
 */
const pokemonInitialState: IPokemonState = {
	pokemonById: {},
	pagesWithIds: {}, // key: page number, value: pokemon ids
	all: [], // All pokemon ids
	favorites: [], // Favorite pokemon ids
	caught: [], // Caught pokemon ids
	isLoading: false,
	error: null,
	count: 0, // Total number of pokemon in the database
}

const pokemon = createSlice({
	name: 'pokemon',
	initialState: pokemonInitialState,
	reducers: { // NOTE: Redux toolkit handles state immutability, so mutating state in reducers here is fine
		getPokemonStart: (state) => {
			state.isLoading = true;
		},
		getPokemonSuccess: (state, { payload }: PayloadAction<IPokemon>) => {
			const { id } = payload;
			state.pokemonById[id] = payload;
			state.isLoading = false;
			state.error = null;
			const index = state.all.indexOf(id);

			if (index < 0) {
				state.all.push(id);
			}
		},
		getPokemonListSuccess: (state, { payload }: PayloadAction<{count: number, results: IPokemon[], page: number}>) => {
			const { count, results, page } = payload;

			results.forEach(p => {
				const exists = state.pokemonById[p.id];

				if (!exists) {
					state.all.push(p.id);
					state.all.sort((a, b) => (Number(a) - Number(b)));
					state.pokemonById[p.id] = p;
				}
			});

			state.pagesWithIds[page] = results.map(({id}) => id);
			state.count = count;
			state.isLoading = false;
		},
		getPokemonFailure: (state, { payload }: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = payload;
		},
		catchPokemon: (state, { payload }: PayloadAction<number>) => {
			const id = payload;
			const index = state.caught.indexOf(id);

			if (index < 0) {
				state.caught.push(id);
			}
		},
		releasePokemon: (state, { payload }: PayloadAction<number>) => {
			const id = payload;
			const index = state.caught.indexOf(id);

			if (index > -1) {
				state.caught.splice(index, 1);
			}
		},
		releaseAllPokemon: (state) => {
			state.caught.splice(0);
		},
		addToFavs: (state, { payload }: PayloadAction<number>) => {
			const id = payload;
			const index = state.favorites.indexOf(id);

			if (index < 0) {
				state.favorites.push(id);
			}
		},
		removeFromFavs: (state, { payload }: PayloadAction<number>) => {
			const id = payload;
			const index = state.favorites.indexOf(id);

			if (index > -1) {
				state.favorites.splice(index, 1);
			}
		},
		removeAllFromFavs: (state) => {
			state.favorites.splice(0);
		},
	},
});

export const {
	getPokemonStart,
	getPokemonSuccess,
	getPokemonListSuccess,
	getPokemonFailure,
	catchPokemon,
	releasePokemon,
	releaseAllPokemon,
	addToFavs,
	removeFromFavs,
	removeAllFromFavs,
} = pokemon.actions;

export const fetchPokemon = (id: number): AppThunk => async dispatch => {
	try {
		dispatch(getPokemonStart());
		const pokemon = await getPokemonById(id);
		dispatch(getPokemonSuccess(pokemon));
	} catch(e) {
		dispatch(getPokemonFailure(e.toString()));
	}
}

export const fetchPokemonList = (page: number): AppThunk => async dispatch => {
	try {
		dispatch(getPokemonStart());
		const data = await getAllPokemon(page);
		dispatch(getPokemonListSuccess(data));
	} catch(e) {
		dispatch(getPokemonFailure(e.toString()));
	}
}

export const catchPokemonById = (id: number): AppThunk => async dispatch => {
	try {
		dispatch(catchPokemon(id));
	} catch(e) {
		console.error(e);
	}
}

export const releasePokemonById = (id: number): AppThunk => async dispatch => {
	try {
		dispatch(releasePokemon(id));
	} catch(e) {
		console.error(e);
	}
}

export const addToFavsById = (id: number): AppThunk => async dispatch => {
	try {
		dispatch(addToFavs(id));
	} catch(e) {
		console.error(e);
	}
}

export function removeFromFavsById(id: number): AppThunk {
	return async function (dispatch) {
		try {
			dispatch(removeFromFavs(id));
		} catch(e) {
			console.error(e);
		}
	}
}

export default pokemon;
