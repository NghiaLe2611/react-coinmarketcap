import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

const Root = React.lazy(() => import('../layout/Root'));
const HomePage = React.lazy(() => import('../pages/Home'));

const AppRoutes = () => {
	return (
		<Suspense fallback={'Loading...'}>
			<Routes>
				<Route
					exact
					path='/'
					element={
						<Root>
							<HomePage />
						</Root>
					}
				/>
				<Route
					exact
					path='/watchlist'
					element={
						<Root>
							<div>Watchlist</div>
						</Root>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
