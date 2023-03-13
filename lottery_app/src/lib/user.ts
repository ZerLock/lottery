import axios, { AxiosInstance } from 'axios';
import { onSnapshot, doc, getFirestore } from 'firebase/firestore';
import type { User as UserType, Game as GameType, Grid } from '../types/types';
import { SERVER_URL } from 'config/constants';
import firebase from './firebase';

class User {
	public account: UserType | undefined;

	public idToken: string | undefined;

	public games: Array<GameType> = [];

	public api: AxiosInstance;

	constructor(userId: string | undefined, idToken: string | undefined) {
		onSnapshot(doc(getFirestore(firebase), `users/${userId}`), async (docSnap) => {
			if (docSnap.exists()) {
				this.account = docSnap.data() as UserType;
			}
		});
		this.idToken = idToken;
		this.api = axios.create({
			baseURL: SERVER_URL,
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		});
		this.getGames();
	}

	public getAccount = (): UserType => {
		if (this.account) {
			return this.account;
		}
		return {
			uid: 'unknown',
			name: 'Unknown',
			normalized_name: 'unknown',
			cash: 0,
		} as UserType;
	};

	public async getGames(): Promise<Array<GameType>> {
		const res = await this.api.get('/game/getAll');
		this.games = res.data.data;
		return res.data.data as Array<GameType>; // Return
	}

	public async playNewGrid(numbers: Array<number>, gameId: GameType['id']): Promise<void> {
		await this.api.post(`/game/new?gameId=${gameId}`, {
			numbers,
		});
	}

	public async getUserGrids(): Promise<Array<Grid>> {
		const res = await this.api.get('/user/getGrids');
		return res.data.data;
	}

	public async topUpAccount(amount: number): Promise<void> {
		const res = await this.api.post('/user/refillAccount', { amount });
		this.account = res.data.data;
	}

	public async claimGrid(gridId: string): Promise<void> {
		await this.api.post(`/game/claim?gridId=${gridId}`);
	}
}

export default User;
