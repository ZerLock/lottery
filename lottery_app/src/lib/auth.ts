import {
	browserLocalPersistence,
	getAuth,
	GoogleAuthProvider,
	setPersistence,
	UserCredential,
	Auth as AuthFirebase,
	signInWithPopup,
} from 'firebase/auth';
import User from './user';
import api, { ServerReturn } from './api';
import appFirebase from './firebase';
import type { User as UserType } from '../types/types';

type AuthReturnType = {
	user: User | undefined;
	idToken: string | undefined;
	message: string;
};

class Auth {
	private auth: AuthFirebase;

	private provider: GoogleAuthProvider;

	private connectedUser: UserType | undefined;

	private connectedToken: string | undefined;

	constructor() {
		this.connectedToken = undefined;
		this.connectedUser = undefined;
		this.auth = getAuth(appFirebase);
		this.provider = new GoogleAuthProvider();
		setPersistence(this.auth, browserLocalPersistence);
	}

	public logout = async (): Promise<void> => {
		localStorage.clear();
		this.connectedToken = undefined;
		this.connectedUser = undefined;
	};

	private handleSuccess = async (response: UserCredential) => {
		if (response.user) {
			const token = await response.user.getIdToken();
			localStorage.setItem('idToken', token);
			this.connectedToken = token;

			// Get user from backend
			const res = await api.post('/auth', {
				user: {
					uid: response.user.uid,
					name: response.user.displayName,
					avatar: response.user.photoURL,
				},
			});
			this.connectedUser = res.data.data;
		}
	};

	public loginWithGoogle = async (): Promise<AuthReturnType> => {
		await signInWithPopup(this.auth, this.provider).then(this.handleSuccess);

		const user = new User(this.connectedUser, this.connectedToken);
		console.log(user);
		return { user: user, idToken: user.idToken, message: 'Successful login' };
	};
}

export type { AuthReturnType };
export default Auth;
