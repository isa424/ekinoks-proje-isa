import { List, ListItem, ListItemText, Typography, Link } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IListDataItem } from '../../types/data';
import styles from './pokemonList.module.css';

type Props = {
	pokemon: IListDataItem[],
}

const PokemonList = ({pokemon}: Props) => {
	return (
		<List>
			{pokemon.map(({name}, i) => (
				<ListItem key={i} dense divider={i + 1 < pokemon.length}>
					<ListItemText primary={
						<div className={styles.text}>
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
