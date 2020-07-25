import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from '../firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			maxWidth: 345,
			minHeight: 340,
			position: 'relative',
			[theme.breakpoints.down('xs')]: {
				minWidth: 345
			}
		},
		title: {
			fontSize: 17,
			fontWeight: 'bold',
			height: 80,
			'& div': {
				marginTop: 5
			}
		},
		spanTitle: {
			fontSize: 12,
			fontWeight: 500,
			border: '1px solid #646464',
			padding: '4px 8px',
			borderRadius: 3
		},
		cardContent: {
			height: 130,
			textAlign: 'left'
		},
		cardMedia: {
			borderBottom: '1px solid #ededed',
			objectFit: 'contain'
		},
		cardAction: {
			padding: 16
		},
		actionArea: {
			'&:hover $focusHighlight': {
				opacity: 0
			}
		},
		focusHighlight: {},
	})
);

const CardItem = ({details}) => {
	const classes = useStyles();
	const [likes, setLikes] = useState([]);
	const [disabled, setDisabled] = useState([]);

	useEffect(() => {
		let isAbort = false;
		let ref = firebase.database().ref('/likes');
		ref.on('value', snapshot => {
			const state = snapshot.val();
			if(!isAbort){
				setLikes(state);
			}
		});
		return () => {
			isAbort = true;
		};
	}, []);

	const getPostLikes = (id) => {
		let value = likes[id];
		if (!value) {
			value = 0;
		}
		return value;
	};

	const updatePostLikes = (e, id) => {
		e.preventDefault();
		setDisabled([...disabled, id]);
		likes[id] = likes[id] + 1;
		if(!likes[id]){
			likes[id] = 1;
		}
		updateToFirebase();
	};

	const updateToFirebase = () => {
		firebase.database().ref('/likes').set(likes);
	};

	return (
		<Card className={classes.root}>
			<CardActionArea
				classes={{
					root: classes.actionArea,
					focusHighlight: classes.focusHighlight
				}}
			>
				<CardMedia
					component="img"
					alt={details.name}
					height="140"
					image={'https://www.countryflags.io/' + details.alpha_two_code + '/shiny/64.png'}
					title={details.name}
					className={classes.cardMedia}
				/>
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
						{details.name}
						<div>
							<span className={classes.spanTitle}>
								{details.country}
							</span>
						</div>
					</Typography>
					<Typography variant="body2" component="p">
						{details.web_pages[0]}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.cardAction}>
				<Button 
					size="small" 
					variant="outlined" 
					color="secondary" 
					startIcon={<FavoriteIcon />}
					disabled={disabled.indexOf(details.name.replace(/\s/g,''))!==-1}
					onClick={(e) => updatePostLikes(e, details.name.replace(/\s/g,''))}
				>
					{getPostLikes(details.name.replace(/\s/g,''))}
				</Button>
				<Button 
					size="small"
					variant="contained"
					color="primary"
					target="_blank"
					disabled={!details.web_pages[0]}
					href={details.web_pages[0]}
				>
                    Visit Website
				</Button>
			</CardActions>
		</Card>
	);
};

CardItem.propTypes = {
	details: PropTypes.object
};

export default CardItem;