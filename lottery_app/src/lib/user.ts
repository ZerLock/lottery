import axios, { AxiosInstance } from 'axios';
import type { User as UserType, Game as GameType, Grid } from '../types/types';
import { SERVER_URL } from 'config/constants';

class User {
	public account: UserType | undefined;

	public idToken: string | undefined;

	public deviceInfos: string | undefined;

	public api: AxiosInstance;

	constructor(account: UserType | undefined, idToken: string | undefined) {
		this.account = account;
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

	public setDeviceInfos(deviceInfos: string) {
		this.deviceInfos = deviceInfos;
	}

	public isOnApple(): boolean {
		if (this.deviceInfos && this.deviceInfos.includes('iPhone')) return true;
		return false;
	}

	public async getGames(): Promise<Array<GameType>> {
		const res = await this.api.get('/game/getAll');
		return res.data.data.games as Array<GameType>; // Return
	}

	public async playNewGrid(numbers: Array<number>, gameId: GameType['id']): Promise<void> {
		const res = await this.api.post(`/game/new?gameId=${gameId}`, {
			numbers,
		});
		if (this.account) {
			this.account = res.data.data;
		}
	}

	public async getUserGrids(): Promise<Array<Grid>> {
		const res = await this.api.get('/user/getGrids');
		return res.data;
	}

	public async topUpAccount(amount: number): Promise<void> {
		const res = await this.api.post('/user/refillAccount', { amount });
		this.account = res.data.data;
	}
}

export default User;
