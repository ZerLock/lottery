import axios, { AxiosInstance } from 'axios';
import { onSnapshot, doc, query, collection, getFirestore } from 'firebase/firestore';
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
		onSnapshot(query(collection(getFirestore(firebase), `games`)), async (queryx) => {
			this.games = queryx.docs.map(
				(docx) =>
					({
						id: docx.id,
						...docx.data(),
					} as GameType),
			);
		});
		this.idToken = idToken;
		this.api = axios.create({
			baseURL: SERVER_URL,
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		});
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
		const res = await this.api.post(`/game/claim?gridId=${gridId}`);
		return res.data.data;
	}
}

export default User;
