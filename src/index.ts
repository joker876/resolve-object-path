const _PATH_NEXT_STEPS_REGEXP = /((?:\??\.|(?:\?\.)?\[).*$|$)/.source;
// https://regexr.com/6t8t5
const _STRING_PROP_REGEXP = new RegExp(/^([\w$]+)/.source + _PATH_NEXT_STEPS_REGEXP);
// I don't like how complicated this pattern is, but eh
// https://regexr.com/6t8ru
const _ARRAY_PROP_REGEXP = new RegExp(/^\[(?:(-?\d+(?:\.\d+)?)|(['"`])(.*?)\2)\](?=\??\.|\[(?:(?:-?\d+(?:\.\d+)?)|(['"`]).*?\4)|$)/.source + _PATH_NEXT_STEPS_REGEXP);

function resolvePath(object: object, path: string) {
    if (typeof object != 'object') throw new TypeError('Expected object argument to be an object, got ' + typeof object);
    if (typeof path != 'string') throw new TypeError('Expected path argument to be a string, got '+ typeof path);

    return _processPathRecursive(object, path);
}
function _processPathRecursive(object: any, path: string, originalPath: string = path): any {
    if (!path) return object;

    let step: string | number;
    [step, path] = _getPathStep(path, originalPath);
    if (object.hasOwnProperty(step)) {
        return _processPathRecursive(object[step], path, originalPath);
    }
    return undefined;
}

function _getPathStep(path: string, originalPath: string): [string | number, string] {
    let step: string | number;
    let newPath: string;

    let match = path.match(_STRING_PROP_REGEXP);
    if (match) {
        step = match[1];
        newPath = _removeChainOperator(match[2]);
        return [step, newPath];
    }
    match = path.match(_ARRAY_PROP_REGEXP);
    if (match) {
        step = match[1] ? _convertStepToNumberIfNeeded(match[1]) : match[3];
        newPath = _removeChainOperator(match[5]);
        return [step, newPath];
    }
    throw new Error('Object path is invalid: '+originalPath);
}

function _removeChainOperator(step: string): string {
    if (step.charAt(0) == '.') return step.slice(1);
    if (step.charAt(0) == '?') return step.slice(2);
    return step;
}
function _convertStepToNumberIfNeeded(step: string): string | number {
    if (!isNaN(Number(step))) {
        return Number(step);
    }
    return step;
}

export default resolvePath;