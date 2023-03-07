export interface GlobalConfig {
	id: number;
	grids: Array<string>; // Array of games ids
}

export interface Grid {
	id: string;
	numbers: Array<number>;
}

export interface Game {
	grid: Grid;
	players: Array<number>; // Array of players ids
	total_amount: number;
	is_available: boolean;
	creation_date: number;
}

export interface User {
	readonly uid: string;
	name: string;
	normalized_name: string;
	avatar: string;
	cash: number;
}
