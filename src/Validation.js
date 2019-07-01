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

    if(x.length > 0) {
        return false;
    }

    return true;
}

export {
    isNullOrUndefined,
    isEmpty
};
