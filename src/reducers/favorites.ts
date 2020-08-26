import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IPokemon from '../types/pokemon';

const favorites = createSlice({
	name: 'favorites',
	initialState: [] as IPokemon[],
	reducers: {
		add: (state, action: PayloadAction<IPokemon>) => {
			// NOTE: createSlice handles updating immutable states, push function here is fine
			const {id, name} = action.payload;
			state.push({id, name});
		},
		remove: (state, action: PayloadAction<number>) => {
			const index = state.findIndex(({id}) => id === action.payload);
			state.splice(index, 1);
		},
	},
});

export const { add, remove } = favorites.actions;

export default favorites.reducer;
