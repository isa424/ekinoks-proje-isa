import React, { Component } from 'react';
import { AppBar, Button, Toolbar, useTheme } from '@material-ui/core';
import styles from './nav.module.css';

const Nav = () => {
	const theme = useTheme();

	return (
		<AppBar position={'static'} color={'default'} elevation={1} className={styles.nav}>
			<Toolbar variant={'dense'}>
				<Button color={'inherit'}>Home</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Nav;
