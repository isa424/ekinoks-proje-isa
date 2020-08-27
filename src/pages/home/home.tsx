import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Pagination } from '@material-ui/lab';
import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { TextField, InputAdornment, Typography, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PokemonList from '../../components/pokemonList/pokemonList';
import IPokemon from '../../types/pokemon';
import styles from './home.module.css';
import LoadingListContent from '../../components/loadingListContent/loadingListContent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList } from '../../reducers/pokemon';
import { RootState } from '../../reducers';

const HomePage = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [alertOpen, setAlertOpen] = useState(false);
	const itemPerPage = 10;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setAlertOpen(true);
	}

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

	const handleAlertClose = () => setAlertOpen(false);

	const handlePagination = (e: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	}

	const {count, loading, pagesWithIds} = useSelector((state: RootState) => ({
		all: state.pokemon.all,
		count: state.pokemon.count,
		loading: state.pokemon.isLoading,
		pagesWithIds: state.pokemon.pagesWithIds,
	}));

	useEffect(() => {
		// If the first id of the page is not in the list 'all' that page was not fetched before
		if (!pagesWithIds[page]) {
			dispatch(fetchPokemonList(page));
		}
	}, [page, dispatch, pagesWithIds]); // Run once on mount

	let list: IPokemon['id'][] = [];
	if (pagesWithIds[page]) {
		list = pagesWithIds[page];
	}

	return (
		<div>
			<div className={styles.top}>
				<Typography variant={'h4'}>Pokemon</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						id={'search'}
						label={'Search'}
						variant={'outlined'}
						placeholder={'Type Bulbasaur..'}
						size={'small'}
						value={search}
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
				<Dialog
					open={alertOpen}
					onClose={handleAlertClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'Search'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Unfortunately PokeApi does not provide a functionality to search through a list of pokemon
							with by their name or other properties.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleAlertClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<div className={styles.main}>
				{loading ? <LoadingListContent/> : <PokemonList list={list}/>}
			</div>
			<div className={styles.pagination}>
				<Pagination
					count={Math.ceil(count / itemPerPage)}
					page={page}
					onChange={handlePagination}
					color={'primary'}
					size={'small'}
				/>
			</div>
		</div>
	);
}

export default HomePage;
