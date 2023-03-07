import api from './api';
import type { User as UserType } from '../types/types';

class User {
	public account: UserType | undefined;

	public idToken: string | undefined;

	public deviceInfos: string | undefined;

	constructor(account: UserType | undefined, idToken: string | undefined) {
		this.account = account;
		this.idToken = idToken;
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

	public async getAvailableGames(): Promise<any> {
		// TODO: Call using axios the backend to get all available games when backend is UP
		const res = await api({
			url: '/game/getAvailableGames',
			method: 'GET',
			data: {}, // Body
		});
		return res.data; // Return
	}
}

export default User;
