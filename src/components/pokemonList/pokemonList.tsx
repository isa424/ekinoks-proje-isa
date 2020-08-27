import { List, ListItem, ListItemText, Typography, Link } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IPokemon from '../../types/pokemon';
import styles from './pokemonList.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

type Props = {
	list: IPokemon['id'][]
}

const PokemonList = ({list}: Props) => {
	const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

	const { pokemonById } = useSelector((state: RootState) => ({
		pokemonById: state.pokemon.pokemonById
	}));

	if (!list.length) {
		return <div>
			<p>Empty!</p>
		</div>
	}

	return (
		<List>
			{list.map((id, i) => (
				<ListItem key={i} dense divider={i + 1 < list.length}>
					<ListItemText primary={
						<div className={styles.text}>
							<img className={styles.img} src={`${url}/${id}.svg`} alt=""/>
							<strong>#{id}&nbsp;</strong>
							<Typography>
								<Link
									to={`/${id}`}
									className={styles.name}
									component={RouterLink}
									color={'inherit'}
								>{pokemonById[id].name}</Link>
							</Typography>
						</div>
					}/>
				</ListItem>
			))}
		</List>
	);
}

export default PokemonList;
