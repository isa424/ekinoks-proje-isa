import { Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import pokemon from './pokemon';

export type RootState = ReturnType<typeof reducers>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const reducers = combineReducers({
	pokemon: pokemon.reducer,
});

export default reducers;
