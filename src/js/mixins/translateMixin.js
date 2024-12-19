import { isEmptyObject } from '../helpers/utils.js';
export const translateMixin = {
    methods: {
        Translate(input, lang = this.$store.getters.getLang, load = 0) {
            let res = input;
            let dic = this.$store.getters.getDictionary;

            if (isEmptyObject(dic)) {
                if (!load) {
                    setTimeout(() => this.Translate(input, lang, 1), 300);
                }
            } else {
                for (const [key, value] of Object.entries(dic)) {
                    if (input === value['en']) {
                        res = value[lang] || value['en'];
                    }
                }
            }
            return res;
        },
    },
};