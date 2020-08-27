import { Paper } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React, { useMemo, useState } from 'react';
import DetailsPage from '../../pages/details/details';
import FavsPage from '../../pages/favorites/favsPage';
import HomePage from '../../pages/home/home';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyPokemonPage from '../../pages/myPokemon/myPokemon';
import Sidebar from '../sidebar/sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './../../reducers/index';
import { Provider } from 'react-redux';

const store = configureStore({
	reducer: rootReducer,
});

const useStyles = makeStyles({
	root: {
		height: 600,
		width: 800,
		boxShadow: '1px 1px 15px #9E9E9E, -1px -1px 15px 0px #9E9E9E;',
		borderRadius: 5,
		display: 'flex',
	},
	main: {
		width: '100%',
		padding: 20,
	},
});

const App = () => {
	const [darkMode, setDarkMode] = useState(false);
	const {root, main} = useStyles();
	const theme = useMemo(() => createMuiTheme({
		palette: {
			type: darkMode ? 'dark' : 'light',
		},
	}), [darkMode]);

	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<Paper className={root}>
						<Sidebar darkMode={darkMode} setDarkMode={setDarkMode}/>
						<main className={main}>
							<Switch>
								<Route path={'/'} exact={true}>
									<HomePage/>
								</Route>
								<Route path={'/favs'}>
									<FavsPage/>
								</Route>
								<Route path={'/mine'}>
									<MyPokemonPage/>
								</Route>
								<Route path={'/:id'}>
									<DetailsPage/>
								</Route>
							</Switch>
						</main>
					</Paper>
				</ThemeProvider>
			</Router>
		</Provider>
	);
}

export default App;
