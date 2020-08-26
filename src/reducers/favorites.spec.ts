import favorites, { add, remove } from './favorites';

describe('favorites reducer', () => {
	it('should handle initial state', () => {
		expect(favorites(undefined, {type: 'add'})).toEqual([]);
	});

	it('should handle add favorite', () => {
		const payload = {id: 1, name: 'First'};
		const action = {type: add.type, payload};

		expect(favorites([], action)).toEqual([payload])
	});

	it('should handle remove favorite', () => {
		const state = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}];
		const action = {type: remove.type, payload: state[0].id};

		expect(favorites(state, action)).toEqual([state[1]]);
	});
});

describe('favorites actions', () => {
	it('should generate correct payloads', () => {
		const action1 = add({id: 1, name: 'First'});
		const action2 = remove(1);

		expect(action1.payload).toEqual({id: 1, name: 'First'});
		expect(action2.payload).toEqual(1);
	});
});
