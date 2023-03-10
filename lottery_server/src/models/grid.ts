import { Game } from './';

export interface Grid {
    readonly id: string;
    readonly game_id: Game['id'];
    readonly game_name: Game['name'];
    numbers: Array<number>;
}
