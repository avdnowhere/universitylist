import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../../firebase';

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			paddingTop: '50px',
			paddingBottom: '30px',
			[theme.breakpoints.up('sm')]: {
				padding: '70px 0px 40px 40px'
			},
		},
		paper: {
			padding: theme.spacing(2)
		},
		table: {
			marginTop: 30,
			borderCollapse: 'collapse',
			width: '50%',
			[theme.breakpoints.down('sm')]: {
				width: '70%'
			},
			[theme.breakpoints.down('xs')]: {
				width: '100%'
			},
			'& th': {
				paddingTop: 12,
				paddingBottom: 12,
				backgroundColor: '#f50057',
				color: 'white'
			},
			'& td, th': {
				padding: 8,
				border: '1px solid #dddddd',
				textAlign: 'center',
			},
			'& tr:nth-child(even)': {
				backgroundColor: '#f2f2f2'
			},
			'& tr:hover': {
				backgroundColor: '#dddddd'
			}
		}
	})
);

const Subscribers = () => {
	const classes = useStyles();
	const [subscribers, setSubscribers] = useState([]);

	useEffect(() => {
		let isAbort = false;
		let ref = firebase.database().ref('/subscribers');
		ref.on('value', snapshot => {
			const state = snapshot.val();
			let object = [];
			for (let i = 0; i < Object.keys(state).length; i++){
				object.push(state[Object.keys(state)[i]]);
			}
			if(!isAbort){
				setSubscribers(object.sort((a, b) => a - b || a.toString().localeCompare(b.toString())));
			}
		});
		return () => {
			isAbort = true;
		};
	}, []);

	return(
		<Container classes={{root: classes.container}}>
			{   subscribers.length > 0
				?   <div>
					<h1>Subscribers</h1>
					<table className={classes.table}>
						<thead>
							<tr>
								<th>
									No
								</th>
								<th>
									Email Address
								</th>
							</tr>
						</thead>
						<tbody>
							{subscribers.map((item, index) => (
								<Fragment key={index}>
									<tr>
										<td>
											{index + 1}
										</td>
										<td>
											{item}
										</td>
									</tr>
								</Fragment>
							))}
						</tbody>
					</table>
				</div>
				:   <div className={classes.paper}>
                        No data available!
				</div>
			}
		</Container>
	);
};

export default Subscribers;