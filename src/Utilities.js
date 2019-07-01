/**
 * generate a {@link http://www.cse.yorku.ca/~oz/hash.html djb2} hash code for this instance
 * @borrows {@link https://github.com/darkskyapp/string-hash}
 */
function hashWithDjb2(hashString) {
    /**
     * See {@link https://stackoverflow.com/a/13809282} for magic number explanations
     */

    let hash = 5381;
    let i = hashString.length;

    while (i > 0) {
        hash = (hash * 33) ^ hashString.charCodeAt(--i);
    }

    return (hash >>> 0).toString();
}

export {
    hashWithDjb2
};
