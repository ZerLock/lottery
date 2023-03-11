import { Game } from './';

export interface Grid {
    readonly id: string;
    readonly game: Partial<Game>;
    claimed_cash: number | undefined;
    numbers: Array<number>;
}
