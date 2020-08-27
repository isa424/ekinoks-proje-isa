import React from 'react';
import { Box, LinearProgress, LinearProgressProps, Typography } from '@material-ui/core';
import styles from './progress.module.css';

const Progress = (props: LinearProgressProps & { value: number }) => {
	return (
		<Box className={styles.box}>
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

export default Progress;
