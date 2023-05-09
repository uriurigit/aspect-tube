import { isArray, isString, union } from 'lodash';

import { FullToHalfWidthReplacer, splitByWhiteSpace } from '../../modules/utility/string-utility';

const enum SearchPattern {
    /** 完全一致 */
    perfectMatching = 1,
    /** 部分一致 */
    partialMatching
}

const dataSource: Array<string> = ['test', 'test2', 'test3'];

export class SearchEngine {
    constructor(private searchMode: SearchPattern, private sortMode = '') {}

    public search(searchWordData: string | Array<string>): Array<string> {
        try {
            return this.searchByMultipleWord(this.convertSearchWordToList(searchWordData));
        } catch {
            return [];
        }
    }

    private convertSearchWordToList(searchWordData: string | Array<string>): Array<string> {
        if (isArray(searchWordData)) {
            return searchWordData as Array<string>;
        } else if (isString(searchWordData)) {
            return splitByWhiteSpace(searchWordData as string);
        }

        throw Error();
    }

    private searchByMultipleWord(searchWordList: Array<string>): Array<string> {
        let resultList = [];
        searchWordList.forEach((searchWord) => {
            resultList = union(resultList, this.searchByOnceWord(searchWord));
        });

        return resultList;
    }

    private searchByOnceWord(searchWord: string): Array<string> {
        return dataSource.filter((sourceWord) => this.diffWord(searchWord, sourceWord));
    }

    private diffWord(searchWord: string, sourceWord: string): boolean {
        const { replace } = FullToHalfWidthReplacer;

        const srhWrd = replace(searchWord);
        const srcWrd = replace(sourceWord);
        return (SearchPattern.perfectMatching === this.searchMode)
            ? srcWrd === srhWrd
            : srcWrd.indexOf(srhWrd) >= 0
        ;
    }
}

export const sample = (): Array<string> => {
    return new SearchEngine(SearchPattern.perfectMatching).search(['ｔｅｓｔ', 'st3']);
};
