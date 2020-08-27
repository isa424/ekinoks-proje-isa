import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Pagination } from '@material-ui/lab';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonList from '../../components/pokemonList/pokemonList';
import { removeAllFromFavs } from '../../reducers/pokemon';
import { RootState } from '../../reducers';
import styles from '../myPokemon/myPokemon.module.css';

const FavsPage = () => {
	const dispatch = useDispatch();
	const [ page, setPage ] = useState(1);
	const [ list, setList ] = useState<number[]>([]);
	const itemPerPage = 10;

	const handlePagination = (e: ChangeEvent<unknown>, newValue: number) => {
		setPage(newValue);
	}

	const removeAllFavs = () => {
		dispatch(removeAllFromFavs());
	}

	const { favorites } = useSelector((state: RootState) => ({
		favorites: state.pokemon.favorites,
	}));

	useEffect(() => {
		const skip = (page - 1) * itemPerPage;
		const newList = favorites.slice(skip, skip + itemPerPage);
		setList(newList);
	}, [page, favorites, dispatch]);

	return (
		<>
			<div className={styles.header}>
				<Typography variant={'h4'}>Favorite Pokemon <small>({favorites.length} total)</small></Typography>
				<Button
					variant={'contained'}
					disabled={!favorites.length}
					size={'small'}
					color={'default'}
					onClick={removeAllFavs}
				>Release All</Button>
			</div>
			<div className={styles.main}>
				<PokemonList list={list}/>
			</div>
			<div className={styles.pagination}>
				<Pagination
					count={Math.ceil(favorites.length / itemPerPage)}
					page={page}
					onChange={handlePagination}
					color={'primary'}
					size={'small'}
				/>
			</div>
		</>
	);
}

export default FavsPage;
