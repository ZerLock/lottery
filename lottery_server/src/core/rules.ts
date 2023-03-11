import diacritics from 'diacritics';
import _ from 'lodash';

const rules = {
  normalizeName(name: string): string {
    return diacritics.remove(name.toLocaleLowerCase('fr')).trim();
  },

  getPriceMultiplier(game: Array<number>, user: Array<number>): number {
    const diff = _.difference(game, user);
    switch (diff.length) {
      case 0:
        return 1;
      case 1:
        return 0.8;
      case 2:
        return 0.6;
      case 3:
        return 0.4;
      case 4:
        return 0.2;
      default:
          return 0;
    }
  },
};

export default rules;
