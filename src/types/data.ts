import IPokemon from './pokemon';

export interface IListDataItem {
	name: string
	url: string
}

export interface IListData {
	count: number
	next: string|null
	prev: string|null
	results: IListDataItem[]
}

export interface IData extends IPokemon {}
