/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
	const [sidebarShow, setSidebarShow] = useState(true);
	const [unfoldable, setUnfoldable] = useState(false);

	const toggleSidebar = () => {
		setSidebarShow(!sidebarShow);
	};

	const toggleUnfoldable = () => {
		setUnfoldable(!unfoldable);
	};

	return (
		<SidebarContext.Provider
			value={{
				sidebarShow,
				toggleSidebar,
				unfoldable,
				toggleUnfoldable
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

SidebarProvider.propTypes = {
	children: PropTypes.node
};
