import { Divider, List, ListItemText, ListItemIcon, Checkbox, Switch } from '@material-ui/core';
import SwitchBase from '@material-ui/core/internal/SwitchBase';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';

type Props = {
	darkMode: boolean
	setDarkMode: (value: boolean) => void
}

const Sidebar = ({darkMode, setDarkMode}: Props) => {
	const links = [
		{text: 'Home', to: '/', src: 'pokemon.svg'},
		{text: 'My Pokemon', to: '/mine', src: 'trainer.svg'},
		{text: 'Favourites', to: '/favs', src: 'star.svg'},
	];

	const handleDarkMode = () => {
		setDarkMode(!darkMode);
	}

	return (
		<Drawer
			variant={'permanent'}
			anchor={'left'}
			className={styles.sidebar}
			classes={{
				paper: styles.sidebar_paper,
			}}
		>
			<div className={styles.toolbar}>
				<h3>Pokedex</h3>
			</div>
			<Divider/>
			<List>
				{links.map(({text, src, to}, n) => (
					<ListItem
						key={n}
						button
						dense
						component={NavLink}
						to={to}
						exact={true}
						activeClassName={'Mui-selected'}
					>
						<ListItemIcon classes={{root: styles.sidebar_icon}}>
							<img className={styles.icon} src={src}/>
						</ListItemIcon>
						<ListItemText primary={text}/>
					</ListItem>
				))}
				<Divider/>
				<ListItem dense button onClick={handleDarkMode}>
					<ListItemText primary={'Dark Mode'}/>
					<Switch
						checked={darkMode}
						color={'secondary'}
						size={'small'}
					/>
				</ListItem>
			</List>
		</Drawer>
	);
}

export default Sidebar;
