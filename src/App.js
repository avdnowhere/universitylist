import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import { FilterProvider } from './components/FilterContext';
import ScrollArrow from './components/ScrollArrow';

function App() {
	return (
		<FilterProvider>
			<div className="pageContainer">
				<BrowserRouter>
					<NavigationBar />
					<ScrollArrow />
					<div className="contentWrap">
						<Routes />
						<Footer />
					</div>
				</BrowserRouter>
			</div>
		</FilterProvider>
	);
}

export default App;
