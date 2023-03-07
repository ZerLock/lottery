import { Game } from '.';

export interface GlobalConfig {
    games: Array<Game['id']>;
    total_cash: number;
}
