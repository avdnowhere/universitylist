import React, { useState, useEffect } from 'react';
import { makeStyles, fade, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import firebase from '../firebase';
import Validate from '../utils/Validate';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			color: 'white',
			backgroundColor: '#3f51b5',
			position: 'relative',
			bottom: 0,
			width: '100%'
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center'
		},
		list: {
			padding: 0,
			listStyleType: 'none',
			'& li': {
				padding: 5
			},
			'& a': {
				textDecoration: 'none',
				color: '#FFFFFF'
			}
		},
		subscription: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('xs')]: {
				marginLeft: theme.spacing(1),
				width: 'auto',
				display: 'inline-flex'
			},
		},
		inputRoot: {
			color: 'inherit'
		},
		inputInput: {
			padding: theme.spacing(1.2, 1.2, 1.2, 0),
			paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '23ch'
			},
		},
	}),
);

const Footer = () => {
	const classes = useStyles();
	const [subscribers, setSubscribers] = useState([]);
	const [email, setEmail] = useState('');
	const [disabled, setDisabled] = useState(true);

	const [error, setError] = useState({
		email: false
	});

	useEffect(() => {
		let ref = firebase.database().ref('/subscribers');
		ref.on('value', snapshot => {
			const state = snapshot.val();
			setSubscribers(state);
		});
	}, []);

	const checkValidation = () => {
		if(email){
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	const updateEmail = (e) => {
		if (Validate.email(e.target.value)) {
			setError({
				...error,
				email: false
			}); 
		} else {
			setError({
				...error,
				email: true
			});
		}
		checkValidation();
		setEmail(e.target.value);
	};

	const postSubscribers = (e) => {
		e.preventDefault();
		let objectExist = [];
		for (let i = 0; i < Object.keys(subscribers).length; i++){
			if(subscribers[Object.keys(subscribers)[i]] === email){
				objectExist.push(email);
				break;
			}
		}
		if(objectExist.length === 0){
			const uniqueId = 'email' + (Object.keys(subscribers).length + 1);
			subscribers[uniqueId] = email;
			updateToFirebase();
		}
		setEmail('');
		setDisabled(true);
	};

	const updateToFirebase = () => {
		firebase.database().ref('/subscribers').set(subscribers);
	};

	return(
		<div className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12} sm={4} md={4} lg={4}>
					<div className={classes.paper}>
						<h4>SOCIAL MEDIA</h4>
						<ul className={classes.list}>
							<li>Facebook</li>
							<li>Twitter</li>
							<li>Instagram</li>
						</ul>
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={4}>
					<div className={classes.paper}>
						<h4>PARTNERSHIP</h4>
						<ul className={classes.list}>
							<li>
								<Link to="/about">About Us</Link>
							</li>
							<li>
								<Link to="/contact">Contact Us</Link>
							</li>
							<li>
								<Link to="/subscribers">Subscribers</Link>
							</li>
						</ul>
					</div>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={4}>
					<div className={classes.paper}>
						<h4>NEWSLETTER</h4>
						<ul className={classes.list}>
							<li>
								<div className={classes.subscription}>
									<InputBase
										placeholder="Email address..."
										classes={{
											root: classes.inputRoot,
											input: classes.inputInput,
										}}
										inputProps={{ 'aria-label': 'search' }}
										error={error.email}
										value={email}
										onChange={updateEmail}
									/>
									<Button 
										size="small"
										variant="contained"
										color="secondary"
										disabled={disabled || error.email}
										onClick={postSubscribers}
									>
										Subscribe
									</Button>
								</div>
							</li>
						</ul>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={classes.paper}>
                        &copy;{new Date().getFullYear()} UNIVERSITYLIST.COM | All Right Reserved
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Footer;