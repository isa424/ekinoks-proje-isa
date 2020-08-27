import { Tab, List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Abilities from '../../components/abilities/abilities';
import Stats from '../../components/stats/stats';
import TabPanel from '../../components/tabPanel/tabPanel';
import IPokemon from '../../types/pokemon';
import Tabs from '@material-ui/core/Tabs';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import styles from './details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, releasePokemonById, catchPokemonById, addToFavsById, removeFromFavsById } from '../../reducers/pokemon';
import { RootState } from '../../reducers';
import NotFound from '../../components/error/error';

const a11yProps = (index: any) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

type InfoType = {
	label: string
	prop: keyof IPokemon // NOTE: 'prop' type is the keys of IPokemon object
	calc?: (prop: number | Array<unknown>) => number
	prefix?: string
	suffix?: string
}

const Info = ({pokemon, props}: { pokemon: IPokemon, props: InfoType }) => {
	const {label, prefix, suffix, prop, calc} = props;

	return (
		<>
			<strong>{label}: </strong>
			<span>{prefix && prefix} </span>
			<span className={styles.capital}>
				{calc && pokemon[prop] ? calc(pokemon[prop] as number | Array<unknown>) : pokemon[prop] as string}
			</span>
			<span>{suffix && suffix}</span>
		</>
	);
};

const DetailsPage = () => {
	const {id} = useParams();
	const pid = parseInt(id);
	const dispatch = useDispatch();
	const [tab, setTab] = useState(0);
	// Iterate over pokemon basic info properties and display them
	const infoProps: InfoType[] = [
		{label: 'ID', prop: 'id', prefix: '#'},
		{label: 'Name', prop: 'name'},
		{label: 'Height', prop: 'height', calc: prop => (prop as number) / 10, suffix: 'm'},
		{label: 'Width', prop: 'weight', calc: prop => (prop as number) / 10, suffix: 'kg'},
		{label: 'Base XP', prop: 'base_experience', suffix: 'xp'},
		{label: 'Number of Abilities', prop: 'abilities', calc: prop => (prop as Array<unknown>).length},
		{label: 'Number of Moves', prop: 'moves', calc: prop => (prop as Array<unknown>).length}
	];

	const handleTabChange = (e: ChangeEvent<{}>, newValue: number) => {
		setTab(newValue);
	}

	const handleCatching = (e: MouseEvent) => {
		e.preventDefault();
		const index = caught.indexOf(pid);

		if (index > -1) {
			dispatch(releasePokemonById(pid));
		} else {
			dispatch(catchPokemonById(pid));
		}
	}

	const handleFavs = (e: MouseEvent) => {
		e.preventDefault();
		const index = favorites.indexOf(pid);

		if (index > -1) {
			dispatch(removeFromFavsById(pid));
		} else {
			dispatch(addToFavsById(pid));
		}
	}

	const {pokemon, error, isLoading, favorites, caught} = useSelector(
		(state: RootState) => ({
			pokemon: state.pokemon.pokemonById[pid],
			error: state.pokemon.error,
			isLoading: state.pokemon.isLoading,
			favorites: state.pokemon.favorites,
			caught: state.pokemon.caught,
		}),
	);

	useEffect(() => {
		if (!pokemon || !pokemon.isFull) {
			dispatch(fetchPokemon(pid));
		}
	}, [pokemon, dispatch]);

	let content;

	if (!pokemon) {
		content = (
			<NotFound text={error as string}/>
		);
	} else {
		// Image, Order, Basic Info/Stats, Abilities
		content = (
			<>
				<Tabs
					indicatorColor={'primary'}
					textColor={'primary'}
					variant={'fullWidth'}
					centered={true}
					value={tab}
					className={styles.tabs}
					onChange={handleTabChange}
				>
					<Tab className={styles.tab} label={'Basic Info'} {...a11yProps(0)}/>
					<Tab className={styles.tab} label={'Stats'} {...a11yProps(1)}/>
					<Tab className={styles.tab} label={'Abilities'} {...a11yProps(2)}/>
				</Tabs>
				<TabPanel value={tab} index={0}>
					<div className={styles.panel}>
						<div className={styles.img_div}>
							{isLoading ? (
								<Skeleton variant={'rect'} height={128} width={128}/>
							) : (
								<img className={styles.img}
									 src={pokemon.sprites?.other['official-artwork'].front_default} alt=""/>
							)}
						</div>
						<div>
							<List>
								<ListItem dense>
									<ListItemText primary={
										<Button
											variant='contained'
											color='default'
											size='small'
											startIcon={<img className={styles.catch_img} src={'/catch.svg'}/>}
											onClick={handleCatching}
										>
											{caught.indexOf(pid) > -1 ? 'Release' : 'Catch'}
										</Button>
									}/>
								</ListItem>
								<ListItem dense>
									<ListItemText primary={
										<Button
											variant='contained'
											color='default'
											size='small'
											startIcon={
												<img className={styles.catch_img} src={'/star.svg'}/>
											}
											onClick={handleFavs}
										>
											{favorites.indexOf(pid) > -1 ? 'Remove from Favs' : 'Add to Favs'}
										</Button>
									}/>
								</ListItem>
								{infoProps.map((props, i) => (
									<ListItem key={i} dense>
										<ListItemText primary={
											isLoading ? <Skeleton className={styles.text_skeleton}/> :
												<Info pokemon={pokemon} props={props}/>
										}/>
									</ListItem>
								))}
							</List>
						</div>
					</div>
				</TabPanel>

				<TabPanel value={tab} index={1}>
					<div className={styles.panel}>
						<Stats pokemon={pokemon}/>
					</div>
				</TabPanel>

				<TabPanel value={tab} index={2}>
					<div className={styles.panel}>
						<Abilities pokemon={pokemon}/>
					</div>
				</TabPanel>
				<div className={styles.bottom_nav}>
					<Button
						component={Link}
						to={`/${pid - 1}`}
						size={'small'}
						disabled={pid === 1}
					>Prev</Button>
					<Button
						component={Link}
						to={`/${pid + 1}`}
						size={'small'}
					>Next</Button>
				</div>
			</>
		);
	}

	return content;
}

export default DetailsPage;
