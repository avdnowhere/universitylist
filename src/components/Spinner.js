import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
	createStyles({
		loading: {
			display: 'flex',
			padding: 30,
			borderRadius: 5,
			backgroundColor: 'white',
			justifyContent: 'center',
			boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
		},
	}),
);

const Spinner = () => {
	const classes = useStyles();

	return(
		<div className={classes.loading}>
			<svg
				width="80"
				height="80"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
			>
				<circle
					cx="50"
					cy="50"
					fill="none"
					stroke="#f50057"
					strokeWidth="10"
					r="35"
					strokeDasharray="164.93361431346415 56.97787143782138"
					transform="rotate(275.845 50 50)"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						calcMode="linear"
						values="0 50 50;360 50 50"
						keyTimes="0;1"
						dur="1s"
						begin="0s"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		</div>
	);
};

export default Spinner;