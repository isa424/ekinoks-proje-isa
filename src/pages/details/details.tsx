import { Tab, List, ListItem } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPokemonByName } from '../../api';
import Abilities from '../../components/abilities/abilities';
import Progress from '../../components/progress/progress';
import Stats from '../../components/stats/stats';
import TabPanel from '../../components/tabPanel/tabPanel';
import { IData } from '../../types/data';
import IPokemon from '../../types/pokemon';
import Tabs from '@material-ui/core/Tabs';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './details.module.css';

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
	const {name} = useParams();
	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState<IPokemon>({name: '', id: 0});
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

	useEffect(() => {
		const fetchPokemon = async () => {
			const data: IData = await getPokemonByName(name);

			setLoading(false);
			setPokemon(data);
		};

		fetchPokemon().catch(e => console.error(e));
	}, [name]);

	// Image, Order, Basic Info/Stats, Abilities
	return (
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
						{loading ? (
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
									<Button variant='contained' color='default' size='small' startIcon={
										<img className={styles.catch_img} src={'/catch.svg'}/>
									}>Catch</Button>
								}/>
							</ListItem>
							<ListItem dense>
								<ListItemText primary={
									<Button variant='contained' color='default' size='small' startIcon={
										<img className={styles.catch_img} src={'/star.svg'}/>
									}>Add to Favs</Button>
								}/>
							</ListItem>
							{infoProps.map((props, i) => (
								<ListItem key={i} dense>
									<ListItemText primary={
										loading ? <Skeleton className={styles.text_skeleton}/> :
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
		</>
	);
}

export default DetailsPage;
