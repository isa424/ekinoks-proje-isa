import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import styles from './loadingListContent.module.css';

type Props = {
	max?: number
}

const LoadingListContent = ({max = 10}: Props) => {
	const numbers: number[] = [];
	for (let i = 0; i < max; i++)
		numbers.push(i);

	return (
		<List>
			{numbers.map((n) => (
				<ListItem dense key={n} disableGutters={true}>
					<ListItemText primary={
						<Skeleton key={n} className={styles.skeleton}/>
					}/>
				</ListItem>
			))}
		</List>
	);
}

export default LoadingListContent;
