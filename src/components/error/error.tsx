import React from 'react';
import styles from './error.module.css';

type Props = {
	text: string
}

const NotFound = ({text}: Props) => {
	return (
		<div className={styles.error}>
			<h1>{text}</h1>
		</div>
	);
}

export default NotFound;
