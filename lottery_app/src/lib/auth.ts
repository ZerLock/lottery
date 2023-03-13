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

	private api: AxiosInstance;

	constructor() {
		this.auth = getAuth(appFirebase);
		this.provider = new GoogleAuthProvider();
		setPersistence(this.auth, browserLocalPersistence);
		this.api = axios.create({
			baseURL: SERVER_URL,
		});
	}

	public logout = async (): Promise<void> => {
		localStorage.clear();
	};

	private handleSuccess = async (response: UserCredential): Promise<[UserType | undefined, string]> => {
		let tmpToken = '';

		if (response.user) {
			const token = await response.user.getIdToken();
			localStorage.setItem('idToken', token);
			tmpToken = token;

			// Get user from backend
			const res = await this.api.post('/auth', {
				user: {
					uid: response.user.uid,
					name: response.user.displayName,
					avatar: response.user.photoURL,
				},
			});
			return [res.data.data, tmpToken];
		}
		return [undefined, tmpToken];
	};

	public loginWithGoogle = async (): Promise<AuthReturnType> => {
		const [tmpUser, tmpToken] = await signInWithPopup(this.auth, this.provider).then(await this.handleSuccess);

		const user = new User(tmpUser?.uid, tmpToken);
		return { user: user, idToken: user.idToken, message: 'Successful login' };
	};

	public getConnectedUser = async (): Promise<AuthReturnType> => {
		const user = new User(undefined, '');
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
