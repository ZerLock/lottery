import diacritics from 'diacritics';
import _ from 'lodash';

const rules = {
  normalizeName(name: string): string {
    return diacritics.remove(name.toLocaleLowerCase('fr')).trim();
  },

  getPrizeMultiplier(game: Array<number>, user: Array<number>): [number, string] {
    const diff = _.difference(game, user);
    switch (diff.length) {
      case 0:
        return [1, 'Fabulous'];
      case 1:
        return [0.8, 'Amazing'];
      case 2:
        return [0.6, 'Keep on going'];
      case 3:
        return [0.4, 'Again'];
      case 4:
        return [0.2, 'Can do better'];
      default:
          return [0, 'The next time'];
    }
  },
};

export default rules;
