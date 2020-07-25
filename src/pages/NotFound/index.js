import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			paddingTop: '50px',
			paddingBottom: '15px',
			textAlign: 'center',
			[theme.breakpoints.up('sm')]: {
				padding: '70px 0px 15px 40px',
				textAlign: 'left'
			},
		},
		link: {
			textAlign:'center',
			'& a': {
				textDecoration: 'none',
				fontWeight: 'bold',
				color: '#f50057'
			}
		},
	}),
);

const NotFound = () =>{
	const classes = useStyles();

	return(
		<Container classes={{root: classes.container}}>
			<div>
				<h1>404 Not Found!</h1>
				<p className={classes.link}>
					<Link to="/">Go to Home</Link>
				</p>
			</div>
		</Container>
	);
};

export default NotFound;