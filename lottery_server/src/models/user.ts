import { Grid } from './';

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
