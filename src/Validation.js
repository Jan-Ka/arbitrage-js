function isNullOrUndefined(x) {
    if (typeof (x) === "undefined") {
        return true;
    }

    if (x === null) {
        return true;
    }

    return false;
}

export {
    isNullOrUndefined
};
