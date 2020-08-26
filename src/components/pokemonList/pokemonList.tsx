import { List, ListItem, ListItemText, Typography, Link } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IPokemon from '../../types/pokemon';
import styles from './pokemonList.module.css';

type Props = {
	pokemon: IPokemon[],
}

const PokemonList = ({pokemon}: Props) => {
	const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

	return (
		<List>
			{pokemon.map(({id, name}, i) => (
				<ListItem key={i} dense divider={i + 1 < pokemon.length}>
					<ListItemText primary={
						<div className={styles.text}>
							<img className={styles.img} src={`${url}/${id}.svg`} alt=""/>
							<Typography>
								<Link
									to={`/${name}`}
									className={styles.name}
									component={RouterLink}
									color={'inherit'}
								>{name}</Link>
							</Typography>
						</div>
					}/>
				</ListItem>
			))}
		</List>
	);
}

export default PokemonList;
