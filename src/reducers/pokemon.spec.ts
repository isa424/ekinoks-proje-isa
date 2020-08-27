import pokemon, {
	getPokemonStart, getPokemonSuccess, getPokemonFailure, getPokemonListSuccess, catchPokemon, releasePokemon, addToFavs, removeFromFavs, removeAllFromFavs
} from './pokemon';

const reducer = pokemon.reducer;
const initialState = {
	pokemonById: {},
	pagesWithIds: {},
	all: [],
	favorites: [],
	caught: [],
	isLoading: false,
	error: null,
	count: 0,
};
const testPokemon = {id: 1, name: 'First', isFull: true};

describe('pokemon reducer', () => {
	it('should handle initial state', () => {
		const action = {type: 'getPokemonStart'};

		expect(reducer(undefined, action)).toEqual(initialState);
	});

	it('should handle setting isLoading true', () => {
		const action = {type: getPokemonStart.type};
		const expected = {...initialState, isLoading: true};

		expect(reducer(initialState, action)).toEqual(expected)
	});

	it('should handle getting new pokemon', () => {
		const newPokemon = {id: 1, name: 'First', isFull: true};
		const action = {type: getPokemonSuccess.type, payload: newPokemon};
		const expected = {
			...initialState,
			all: [newPokemon.id],
			pokemonById: {
				[newPokemon.id]: newPokemon,
			},
		}

		expect(reducer(initialState, action)).toEqual(expected);
	});

	it('should handle getting pokemon error', () => {
		const initial = {
			...initialState,
			isLoading: true,
		};
		const action = {type: getPokemonFailure, payload: 'Error!'};
		const expected = {
			...initialState,
			isLoading: false,
			error: action.payload,
		};

		expect(reducer(initial, action)).toEqual(expected)
	});

	it('should handle getting a list of pokemon', () => {
		const pokemon = [
			{id: 1, name: 'First'},
			{id: 2, name: 'Second'},
			{id: 3, name: 'Third'},
		];
		const payload = {count: 3, results: pokemon, page: 1};
		const action = {type: getPokemonListSuccess, payload};
		const initial = {
			...initialState,
			isLoading: true,
		}
		const expected = {
			...initialState,
			all: pokemon.map(({id}) => id),
			pokemonById: {
				1: pokemon[0],
				2: pokemon[1],
				3: pokemon[2],
			},
			pagesWithIds: {
				1: pokemon.map(({id}) => id),
			},
			count: payload.count,
		};

		expect(reducer(initial, action)).toEqual(expected);
	});

	it('should catch a pokemon', () => {
		const action = {type: catchPokemon.type, payload: testPokemon.id};
		const initial = {
			...initialState,
			all: [testPokemon.id],
			pokemonById: {
				[testPokemon.id]: testPokemon,
			},
		};
		const expected = {
			...initial,
			caught: [testPokemon.id],
		};

		expect(reducer(initial, action)).toEqual(expected);
	});

	it('should release a pokemon', () => {
		const action = {type: releasePokemon.type, payload: testPokemon.id};
		const initial = {
			...initialState,
			all: [testPokemon.id],
			pokemonById: {
				[testPokemon.id]: testPokemon,
			},
			caught: [testPokemon.id],
		};
		const expected = {
			...initial,
			caught: [],
		};

		expect(reducer(initial, action)).toEqual(expected);
	});

	it('should release all pokemon', () => {
		const action = {type: releasePokemon.type, payload: testPokemon.id};
		const initial = {
			...initialState,
			all: [testPokemon.id],
			pokemonById: {
				[testPokemon.id]: testPokemon,
			},
			caught: [testPokemon.id],
		};
		const expected = {
			...initial,
			caught: [],
		};

		expect(reducer(initial, action)).toEqual(expected);
	});

	it('should add a pokemon to favorites', () => {
		const action = {type: addToFavs.type, payload: testPokemon.id};
		const initial = {
			...initialState,
			all: [testPokemon.id],
			pokemonById: {
				[testPokemon.id]: testPokemon,
			},
		};
		const expected = {
			...initial,
			favorites: [testPokemon.id],
		};

		expect(reducer(initial, action)).toEqual(expected);
	});

	it('should remove a pokemon from favorites', () => {
		const action = {type: removeFromFavs.type, payload: testPokemon.id};
		const initial = {
			...initialState,
			all: [testPokemon.id],
			pokemonById: {
				[testPokemon.id]: testPokemon,
			},
			favorites: [testPokemon.id],
		};
		const expected = {
			...initial,
			favorites: [],
		};

		expect(reducer(initial, action)).toEqual(expected);
	});

	it('should remove all pokemon from favorites', () => {
		const action = {type: removeAllFromFavs.type, payload: testPokemon.id};
		const initial = {
			...initialState,
			all: [testPokemon.id],
			pokemonById: {
				[testPokemon.id]: testPokemon,
			},
			favorites: [testPokemon.id],
		};
		const expected = {
			...initial,
			favorites: [],
		};

		expect(reducer(initial, action)).toEqual(expected);
	});
});
