import { LinearProgress } from '@material-ui/core';
import React, { FC, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import lazyImport from '../lazy-import';
import Page404 from '../Screens/Page404';
import UserView from '../Screens/UserView';

const Landing = lazyImport('../Screens/Landing');

const Appnavigation: FC = () => {
	return (
		<>
			<Suspense fallback={<LinearProgress />}>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/users/:username" component={UserView} />
					<Route path="/*" exact component={Page404} />
				</Switch>
			</Suspense>
		</>
	);
};

export default Appnavigation;
