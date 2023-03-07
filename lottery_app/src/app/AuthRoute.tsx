import { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import { useUserContext } from 'contexts/user';

type AuthRouteProps = { children: JSX.Element } & RouteProps;

const AuthRoute = ({ children, ...rest }: AuthRouteProps): JSX.Element => {
	const { user } = useUserContext();
	const history = useHistory();

	useEffect(() => {
		if (user) {
			// Push to application home page
			history.push('/dashboard');
		}
	}, [user]);

	return <Route {...rest}>{children}</Route>;
};

export default AuthRoute;
