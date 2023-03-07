import diacritics from 'diacritics';

const rules = {
    normalizeName: function (name: string): string {
        return diacritics.remove(name.toLocaleLowerCase('fr')).trim();
    }
};

export default rules;
