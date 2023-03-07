import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import DashboardView from 'views/DashboardView';
import LoginView from 'views/LoginView';

import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';

const Routes = (): JSX.Element => (
	<BrowserRouter>
		<Switch>
			<AuthRoute path="/login" children={<LoginView />} />
			<PrivateRoute path="/dashboard" children={<DashboardView />} />
			<Redirect push to="/dashboard" />
		</Switch>
	</BrowserRouter>
);

export default Routes;
