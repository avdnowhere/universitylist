import React, { useState, createContext } from 'react';
import PropTypes from "prop-types";

export const FilterContext = createContext();

export const FilterProvider = props => {
	const [filter, setFilter] = useState('');

	return(
		<FilterContext.Provider value={[filter, setFilter]}>
			{props.children}
		</FilterContext.Provider>
	);
};

FilterProvider.propTypes = {
	children: PropTypes.element
};