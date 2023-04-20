/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import AppSidebar from '@components/AppSidebar';
import AppHeader from '@components/AppHeader';
import AppFooter from '@components/AppFooter';
import AppContainer from '@components/AppContainer';
import { SidebarProvider } from '@context/SidebarContext';
export function DefaultLayout() {
	return (
		<SidebarProvider>
			{/* <AppSidebar /> */}
			<div className="wrapper d-flex flex-column min-vh-100 bg-light">
				<AppHeader />
				<div className="body flex-grow-1 px-3">
					<AppContainer />
				</div>
				<AppFooter />
			</div>
		</SidebarProvider>
	);
}
