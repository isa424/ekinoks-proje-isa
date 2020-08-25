import { Pagination } from '@material-ui/lab';
import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getAllPokemon } from '../../api';
import PokemonList from '../../components/pokemonList/pokemonList';
import { IListData, IListDataItem } from '../../types/data';
import styles from './home.module.css';
import LoadingListContent from '../../components/loadingListContent/loadingListContent';

const HomePage = () => {
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pokemon, setPokemon] = useState<IListDataItem[]>([]); // Note: plural of pokemon is pokemon
	const itemPerPage = 10;

	const fetchData = async (page: number) => {
		const skip = (page - 1) * itemPerPage;

		const data: IListData = await getAllPokemon(skip);
		console.log(data);
		setLoading(false);
		setCount(data.count);
		setPokemon(data.results);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(search);
	}

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}

	const handlePagination = (e: ChangeEvent<unknown>, value: number) => {
		setLoading(true);
		setPage(value);
		fetchData(value).catch(e => console.error(e));
	}

	useEffect(() => {
		fetchData(page).catch(e => console.error(e));
	}, []); // Run once on mount

	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<h3>Pokémon</h3>
				<form onSubmit={handleSubmit}>
					<TextField
						id={'search'}
						label={'Search'}
						variant={'outlined'}
						placeholder={'Type Bulbasaur..'}
						size={'small'}
						onChange={handleSearch}
						InputProps={{
							startAdornment: (
								<InputAdornment position={'start'}>
									<SearchIcon/>
								</InputAdornment>
							),
						}}
					/>
				</form>
			</div>
			<div>
				{loading ? <LoadingListContent/> : <PokemonList pokemon={pokemon}/>}
			</div>
			<div className={styles.pagination}>
				<Pagination
					count={Math.floor(count / itemPerPage)}
					page={page}
					onChange={handlePagination}
					color={'primary'}
				/>
			</div>
		</div>
	);
}

export default HomePage;
