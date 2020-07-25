import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardItem from '../../components/CardItem';
import { FilterContext } from '../../components/FilterContext';
import LazyLoad from 'react-lazyload';
import Spinner from '../../components/Spinner';
import axios from 'axios';

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			padding: theme.spacing(3),
			paddingTop: 90
		},
		paper: {
			padding: theme.spacing(2)
		},
		gridItem: {
			[theme.breakpoints.down('xs')]: {
				display: 'grid',
				justifyContent: 'center'
			},
		}
	})
);

const Dashboard = () =>{
	const apiUrl = 'http://universities.hipolabs.com/search?';
	const classes = useStyles();
	const [universityList, setUniversityList] = useState([]);
	const [search, ] = useContext(FilterContext);

	useEffect(() => {
		const filterData = (value) => {
			let criteria;
			if(value !== ''){
				criteria = 'name=' + value.toLowerCase();
			} else {
				criteria = 'name=jakarta';
			}
			axios.get(apiUrl + criteria , { headers: { 'Content-Type': 'application/json' } })
				.then(response => {
					let sortedDate = [];
					if(response.data.length > 0){
						sortedDate = response.data.sort((a, b) =>  a.name > b.name);
					}
					setUniversityList(sortedDate);
				})
				.catch(error => {
					console.error(error);
				});
		};
		filterData(search);
	}, [search]);

	return(
		<Container className={classes.container}>
			<Grid container spacing={6}>
				{   universityList.length > 0   
					?   [...new Map(universityList.map(x => [x.name, x])).values()].map((item, index) => (
						<Grid key={index} item xs={12} sm={12} md={6} lg={4} className={classes.gridItem}>
							<div className={classes.paper}>
								<LazyLoad
									key={index}
									height={100}
									offset={[-100, 100]}
									placeholder={<Spinner />}
								>
									<CardItem details={item} />
								</LazyLoad>
							</div>
						</Grid>
					))
					:   <div className={classes.paper}>
                            No data available!
						</div>
				}
			</Grid>
		</Container>
	);
};

export default Dashboard;