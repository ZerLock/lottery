import { Timestamp } from 'firebase/firestore';

export interface GlobalConfig {
	games: Array<Game['id']>;
	total_cash: number;
}

export interface Grid {
	readonly id: string;
	readonly game: Partial<Game>;
	claimed_cash: number | null;
	title: string; // Only for frontend part
	numbers: Array<number>;
}

export interface Game {
	readonly id: string;
	name: string;
	grid: Array<number>;
	users: Array<User['uid']>;
	play_cash: number;
	total_cash: number;
	created_at: Timestamp;
	played_at: Timestamp;
}

export interface User {
	readonly uid: string;
	name: string;
	normalized_name: string;
	avatar: string;
	cash: number;
	number_of_grids: number;
	current_games: Array<Grid>;
	old_games: Array<Grid>;
}
