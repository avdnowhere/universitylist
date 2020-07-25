import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import emailjs from 'emailjs-com';
import Validate from '../../utils/Validate';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			paddingTop: '50px',
			paddingBottom: '20px',
			[theme.breakpoints.up('sm')]: {
				marginLeft: 0,
				padding: '70px 0px 25px 40px'
			},
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(1)
		},
		submit: {
			padding: '15px 0px',
			margin: theme.spacing(3, 0, 2)
		},
		wrapper: {
			position: 'relative'
		},
		buttonProgress: {
			color: green[500],
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: -8,
			marginLeft: -12
		},
	}),
);

const Contact = () =>{
	const classes = useStyles();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [submitButtonName, setSubmitButtonName] = useState('Send Message');
	const [disabled, setDisabled] = useState(true);
	const [isSending, setIsSending] = useState(false);

	const [error, setError] = useState({
		name: false,
		email: false,
		message: false
	});

	const checkValidation = () => {
		if(name && email && message){
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	const updateName = (e) => {
		if (e.target.value.length > 1) {
			setError({
				...error,
				name: false
			}); 
		} else {
			setError({
				...error,
				name: true
			});
		}
		checkValidation();
		setName(e.target.value);
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

	const updateMessage = (e) => {
		if (e.target.value.length > 1) {
			setError({
				...error,
				message: false
			}); 
		} else {
			setError({
				...error,
				message: true
			});
		}
		checkValidation();
		setMessage(e.target.value);
	};

	const sendEmail = e => {
		e.preventDefault();
		setDisabled(true);
		setIsSending(true);
		const templateParams = {
			'from_name': name,
			'to_name': 'Xendit',
			'message_html': name + '<br/><br/>' + email + '<br/><br/>' + message
		};
		emailjs.send('default_service','template_Z693eKmE_clone', templateParams, 'user_rM5r3JS5TCm0OWjhFfUTU')
			.then(() => {
				setName('');
				setEmail('');
				setMessage('');
				setSubmitButtonName('Message Sent!');
				setIsSending(false);
			}, (err) => {
				console.error('FAILED...', err);
			});
	};

	return(
		<Container maxWidth="xs" classes={{root: classes.container}}>
			<div>
				<h1>Contact Us</h1>
				<form className={classes.form}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="name"
						label="Name"
						error={error.name}
						value={name}
						onChange={updateName}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="email"
						label="Email Address"
						error={error.email}
						value={email}
						onChange={updateEmail}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="message"
						label="Message"
						multiline
						rows={3}
						rowsMax={5}
						error={error.message}
						value={message}
						onChange={updateMessage}
					/>
					<div className={classes.wrapper}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}
							disabled={disabled || error.name || error.email || error.message}
							onClick={sendEmail}
						>
							{submitButtonName}
						</Button>
						{isSending && <CircularProgress size={24} className={classes.buttonProgress} />}
					</div>
				</form>
			</div>
		</Container>
	);
};

export default Contact;