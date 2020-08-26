import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import IPokemon from '../../types/pokemon';

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.common.white,
		},
		body: {
			fontSize: 14,
		},
	}),
)(TableCell);

type Props = {
	pokemon: IPokemon
}

const Abilities = ({pokemon}: Props) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>#</StyledTableCell>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell>Hidden</StyledTableCell>
						<StyledTableCell>Slot</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pokemon.abilities && pokemon.abilities.map((row, i) => (
						<TableRow key={row.ability.name}>
							<TableCell>{i + 1}</TableCell>
							<TableCell>{row.ability.name}</TableCell>
							<TableCell>{String(row.is_hidden)}</TableCell>
							<TableCell>{row.slot}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Abilities;
