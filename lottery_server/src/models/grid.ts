import { Game } from './';

export interface Grid {
    readonly id: string;
    readonly game: Partial<Game>;
    claimed_cash: number | null;
    title: string; // Only for frontend part
    numbers: Array<number>;
}
