import { initDatabase } from "../database";

export const newGameTask = async (): Promise<boolean> => {
    // Connect to db
    initDatabase();

    // TODO: some work

    // Everything is good
    return true;
}
