import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Subscribers from '../pages/Subscribers';
import NotFound from '../pages/NotFound';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route path="/about" component={About} />
			<Route path="/contact" component={Contact} />
			<Route path="/subscribers" component={Subscribers} />
			<Route component={NotFound} />
		</Switch>
	);
}