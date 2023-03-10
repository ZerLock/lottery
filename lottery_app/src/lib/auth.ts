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
import axios, { AxiosInstance } from 'axios';
import appFirebase from './firebase';
import type { User as UserType } from '../types/types';
import { SERVER_URL } from 'config/constants';

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

	private api: AxiosInstance;

	constructor() {
		this.connectedToken = undefined;
		this.connectedUser = undefined;
		this.auth = getAuth(appFirebase);
		this.provider = new GoogleAuthProvider();
		setPersistence(this.auth, browserLocalPersistence);
		this.api = axios.create({
			baseURL: SERVER_URL,
		});
	}

	public logout = async (): Promise<void> => {
		// localStorage.clear();
		// this.connectedToken = undefined;
		// this.connectedUser = undefined;
	};

	private handleSuccess = async (response: UserCredential) => {
		if (response.user) {
			const token = await response.user.getIdToken();
			localStorage.setItem('idToken', token);
			this.connectedToken = token;

			// Get user from backend
			const res = await this.api.post('/auth', {
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
		return { user: user, idToken: user.idToken, message: 'Successful login' };
	};

	public getConnectedUser = async (): Promise<AuthReturnType> => {
		const user = new User(
			{
				uid: '',
				name: '',
				normalized_name: '',
				cash: 0,
				avatar: '',
				number_of_grids: 0,
				current_games: [],
				old_games: [],
			},
			'',
		);
		return { user: user, idToken: '', message: 'tbd' };
	};

	public isConnected = (): boolean => {
		const token = localStorage.getItem('idToken');
		// Check token validity
		return token !== null;
	};
}

export type { AuthReturnType };
export default Auth;
