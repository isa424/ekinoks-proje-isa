import Chip from '@material-ui/core/Chip';
import React from 'react';
import styles from './stats.module.css';
import IPokemon from '../../types/pokemon';
import Progress from '../progress/progress';

type Props = {
	pokemon: IPokemon
}

const Stats = ({pokemon}: Props) => {
	return (
		<div className={styles.stats}>
			<div>
				<strong>Types: </strong>
				{pokemon.types && pokemon.types.map((t, i) => (
					<Chip label={t.type.name} className={styles.chip} key={i}/>
				))}
			</div>
			{pokemon.stats && pokemon.stats.map((s, i) => (
				<div key={i}>
					<strong>{s.stat.name}: </strong>
					<Progress value={s.base_stat} classes={{root: styles.stat_root}}/>
				</div>
			))}
		</div>
	);
}

export default Stats;
