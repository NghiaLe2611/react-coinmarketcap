import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const Root = React.lazy(() => import('layout/root'));
const HomePage = React.lazy(() => import('pages/home'));
const CategoryPage = React.lazy(() => import('pages/category'));
const CategoriesPage = React.lazy(() => import('pages/categories'));
const DetailPage = React.lazy(() => import('pages/detail'));

const AppRoutes = () => {
	return (
		<Suspense fallback={<LinearProgress />}>
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
				<Route
					exact
					path='/currencies/:id'
					element={
						<Root>
							<DetailPage />
						</Root>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
