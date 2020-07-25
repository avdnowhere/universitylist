import React, { useContext, useState, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import SchoolIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import { FilterContext } from './FilterContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2),
			fontSize: '2.5rem'
		},
		title: {
			display: 'block',
			fontWeight: 'bold',
			'& a': {
				textDecoration: 'none',
				color: '#FFFFFF'
			}
		},
		search: {
			position: 'relative',
			display: 'none',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('md')]: {
				marginLeft: theme.spacing(1),
				width: 'auto',
				display: 'inline-flex'
			},
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		clearIcon: {
			display: 'inline-block',
			top: '7px',
			position: 'relative',
			paddingRight: '5px',
			cursor: 'pointer'
		},
		clearIconRoot: {
			fontSize: '22px'
		},
		inputRoot: {
			color: 'inherit'
		},
		inputInput: {
			padding: theme.spacing(1.2, 1.2, 1.2, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '15ch',
				'&:focus': {
					width: '18ch'
				},
			},
		},
		divSeparator: {
			flexGrow: 8
		},
	}),
);

const Header = () => {
	const classes = useStyles();
	const [keyword, setKeyword] = useState('');
	const [, setFilter] = useContext(FilterContext);

	const updateKeyword = (e) => {
		setKeyword(e.target.value);
	};

	const filterByName = e => {
		e.preventDefault();
		setFilter(keyword);
	};

	const handleKeyDown = e => {
		if(e.key === 'Enter'){
			e.preventDefault();
			filterByName(e);
		}
	};

	const resetFilter = e => {
		e.preventDefault();
		setKeyword('');
		setFilter('');
	};

	return (
		<Fragment>
			<SchoolIcon
				edge="start"
				className={classes.menuButton}
				color="inherit"
			/>
			<Typography className={classes.title} variant="h6" noWrap>
				<Link to="/">UNIVERSITYLIST.COM</Link>
			</Typography>
			<div className={classes.divSeparator}>&nbsp;</div>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search name..."
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
					value={keyword}
					onChange={updateKeyword}
					onKeyDown={handleKeyDown}
				/>
				{   keyword 
					?   <div className={classes.clearIcon}>
						<ClearIcon
							classes={{
								root: classes.clearIconRoot,
							}}
							onClick={resetFilter}
						/>
					</div> 
					:   null
				}
				<Button 
					size="small"
					variant="contained"
					color="secondary"
					onClick={filterByName}
				>
                    Search
				</Button>
			</div>
		</Fragment>
	);
};

export default Header;