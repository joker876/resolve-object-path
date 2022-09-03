import resolvePath from './index';

const testObj = {
    foo: 'abc',
    'tes"t': 'pizza',
    'bra[ck"][et': 'cheese',
    bar: {
        baz: -5,
        'str-ing': { prop: 86 },
        'qux': [{}, { def: 'ghi' }],
        'fred': [1, 3, 5],
    }
}

describe('resolvePath', () => {
    it('should return the whole object when passed an empty string as path', () => {
        expect(resolvePath(testObj, '')).toEqual(testObj);
    });
    // simple string
    it('should work properly for simple string path', () => {
        expect(resolvePath(testObj, 'foo')).toBe('abc');
    });
    it('should work properly for chained simple string path', () => {
        expect(resolvePath(testObj, 'bar.baz')).toBe(-5);
    });
    // string using brackets
    it('should work properly for string path using brackets, for all string delimiters', () => {
        expect(resolvePath(testObj, '["foo"]')).toBe('abc');
        expect(resolvePath(testObj, '[\'foo\']')).toBe('abc');
        expect(resolvePath(testObj, '[`foo`]')).toBe('abc');
    });
    // both simple and bracket string
    it('should work properly for combined types of string property getting', () => {
        expect(resolvePath(testObj, 'bar["str-ing"].prop')).toBe(86);
    });
    // number property
    it('should work properly for index number path', () => {
        expect(resolvePath(testObj, 'bar.fred[2]')).toBe(5);
    });
    // both string and number using brackets
    it('should work properly for path with both index and string property getting', () => {
        expect(resolvePath(testObj, '["bar"].qux[1].def')).toBe('ghi');
    });
    //optional chaining
    it('should work properly for path with optional chaining', () => {
        expect(resolvePath(testObj, 'bar?.baz')).toBe(-5);
    });
    it('should work properly for path with both index and string property getting and also optional chaining', () => {
        expect(resolvePath(testObj, '["bar"].qux?.[1].def')).toBe('ghi');
    });
    //path does not exist
    it('should return undefined when the path does not exist', () => {
        expect(resolvePath(testObj, 'this.path.does.not.exist')).toBe(undefined);
    });
    //throws
    it('should throw when passed something else instead of object', () => {
        expect(function () {
            // typescript actually restricts that anyways, so just for JS related tests
            resolvePath(1e3 as any, '')
        }).toThrowError('Expected object argument to be an object, got number');
    });
    it('should throw when passed a non-string path', () => {
        expect(function () {
            // typescript actually restricts that anyways, so just for JS related tests
            resolvePath(testObj, 3 as any)
        }).toThrowError('Expected path argument to be a string, got number');
    });
    it('should throw when passed an invalid path', () => {
        let path = 'v|hgf.s';
        expect(function () {
            resolvePath(testObj, path)
        }).toThrowError('Object path is invalid: ' + path);
    });
    // special edge cases
    it('should work properly for quotation-mark-delimited string containing a quotation mark', () => {
        expect(resolvePath(testObj, '["tes"t"]')).toBe('pizza');
    });
    it('should work properly for an extreme edge case string', () => {
        expect(resolvePath(testObj, '["bra[ck"][et"]')).toBe('cheese');
    });
});