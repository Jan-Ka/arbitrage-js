function isNullOrUndefined(x) {
    if (typeof (x) === "undefined") {
        return true;
    }

    if (x === null) {
        return true;
    }

    return false;
}

function isEmpty(x) {
    if (isNullOrUndefined(x)) {
        return false;
    }

    if (!Object.prototype.hasOwnProperty.call(x, "length")) {
        return false;
    }

    if (x.length > 0) {
        return false;
    }

    return true;
}

function isNullOrWhitespace(x) {
    if (isNullOrUndefined(x)) {
        return true;
    }

    return isEmpty(x);
}

export {
    isNullOrUndefined,
    isEmpty,
    isNullOrWhitespace
};
