import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

const Root = React.lazy(() => import('../layout/Root'));
const HomePage = React.lazy(() => import('../pages/Home'));
const CategoryPage = React.lazy(() => import('../pages/Category'));
const CategoriesPage = React.lazy(() => import('../pages/Categories'));

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
                <Route
					exact
					path='/categories'
					element={
						<Root>
							<CategoriesPage />
						</Root>
					}
				/>
                <Route
					path='/category/:slug'
					element={
						<Root>
							<CategoryPage />
						</Root>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
