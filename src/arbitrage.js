document.addEventListener("DOMContentLoaded", () => {
    renderView(
        [
            [
                "h1",
                "Arbitrage.js"
            ],
            ["br"],
            [
                "button",
                (elem) => {
                    elem.textContent = "Start Game";
                    elem.onclick = onGameStartButtonClick.bind(document.gameState); // make gameState available
                }
            ]
        ],
        (gameState) => {
            gameState.daysLeft = 30;
            gameState.money = 20000;

            setupLocationsAndDistances(gameState);
        }
    );
});

function setupLocationsAndDistances(gameState) {
    gameState.locations = new Graph();
    const locations = [
        "Brooklyn",
        "Manhatten",
        "Queens",
        "Staten Island",
        "The Bronx"
    ];

    for (const location of locations) {
        gameState.locations.addVertex(location);
    }

    gameState.locations.addEdge("Brooklyn", "Manhatten");
    gameState.locations.addEdge("Brooklyn", "Queens");
    gameState.locations.addEdge("Brooklyn", "Staten Island");

    gameState.locations.addEdge("Manhatten", "Queens");
    gameState.locations.addEdge("Manhatten", "The Bronx");
    gameState.locations.addEdge("Manhatten", "Staten Island");
}

class Graph {
    constructor() {
        this.AdjList = new Map();
    }

    addVertex(vertex) {
        this.AdjList.set(vertex, []);
    }

    addEdge(source, target, cost) {
        this.AdjList.get(source).push(target);
        this.AdjList.get(target).push(source);
    }

    getEdges() {
        const keys = this.AdjList.keys();

        for (const i of keys) {
            const values = this.AdjList.get(i);
            let path = "";

            for (const j of values) {

            }
        }
    }
}

/**
 * @this {Object} gameState
 */
function onGameStartButtonClick() {
    const locationIndex = Math.floor(Math.random() * Math.floor(this.locations.length - 1));

    renderLocationView(this.locations[locationIndex]);
}

function renderLocationView(name, wares) {
    if (typeof name !== "string") {
        name = "nowhere";
    }

    if (!Array.isArray(wares)) {
        wares = [...getWares()];
    }

    renderView(
        [
            ...getStatusElements.call(this),
            ["hr"],
            ["br"],
            ...getBuyGoodsButtons.call(this, wares),
            ["br"],
            [
                "button",
                (elem, gameState) => {
                    elem.textContent = "Show Inventory";
                    elem.onclick = getShowInventoryClick.call(gameState);
                }
            ],
            ["br"],
            [
                "button",
                (elem, gameState) => {
                    elem.textContent = "Take a Cab";
                    elem.onclick = getCabClick.call(gameState);
                }
            ]
        ],
        (gameState) => {
            gameState.locationName = name;
            gameState.locationWares = wares;
        }
    );
}

/**
 * @this {Object} gameState
 */
function getShowInventoryClick() {
    return () => {
        const wares = this.hasOwnProperty("wares") ? this.wares : {};
        const items = this.hasOwnProperty("items") ? this.items : {};

        renderView(
            [
                ...getStatusElements.apply(this),
                ["hr"],
                ["br"],
                [
                    "h2",
                    "Wares"
                ],
                ...getWaresList(wares),
                ...getItemList(items),
                [
                    "button",
                    (elem, gameState) => {
                        elem.textContent = "Back";
                        elem.onclick = () => {
                            renderLocationView(gameState.locationName, gameState.locationWares);
                        };
                    }
                ]
            ]
        );
    };
}

function getCabClick() {
    const locations = this.hasOwnProperty("locations") ? this.locations : {};

    return () => {
        renderView(
            [
                ...getStatusElements.apply(this),
                ["hr"],
                ["br"],
                [
                    "h2",
                    "Take a Cab"
                ],
                ["br"],
                ...getLocationsList(locations),
            ]
        );
    };
}

function getBuyGoodsButtons(goods) {
    return goods.reduce((acc, good, i, arr) => {

        acc.push(
            [
                "span",
                (elem) => {
                    elem.textContent = good[0];
                }
            ],
            [
                "button",
                (elem, gameState) => {
                    elem.textContent = `Buy for ${good[1]}¤`;
                    elem.onclick = getOnBuyGoodClick.call(gameState, good);
                }
            ],
            [
                "button",
                (elem, gameState) => {
                    elem.textContent = `Sell for ${good[1]}¤`;
                    elem.onclick = getOnSellGoodClick.call(gameState, good);
                }
            ]
        );

        if (i < arr.length - 1) {
            acc.push(["br"]);
        }


        return acc;
    }, []);
}

function getWaresList(wares) {
    return Object.keys(wares).reduce((acc, wareKey, i, arr) => {
        const wareCount = wares[wareKey];

        acc.push(
            [
                "span",
                (elem) => {
                    elem.textContent = `${wareCount} x ${wareKey}`;
                }
            ]
        );

        if (i < arr.length) {
            acc.push(["br"]);
        }

        return acc;
    }, []);
}

function getItemList(items) {
    return Object.keys(items).reduce((acc, itemsKey, i, arr) => {
        const itemsCount = items[itemsKey];

        acc.push(
            [
                "span",
                (elem) => {
                    elem.textContent = `${itemsCount} x ${itemsKey}`;
                }
            ]
        );

        if (i < arr.length) {
            acc.push(["br"]);
        }

        return acc;
    }, []);
}

function getLocationsList(locations) {
    return locations.reduce((acc, locationKey, i, arr) => {
        acc.push(
            [
                "button",
                (elem) => {
                    elem.textContent = `To ${locationKey} for`;
                }
            ]
        );

        if (i < arr.length) {
            acc.push(["br"]);
        }

        return acc;
    }, []);
}

function getOnBuyGoodClick(ware) {
    return () => {
        const hasEnoughMoney = (gameState, wareName, warePrice) => {
            return gameState.money >= warePrice;
        };

        if (changeWareIfNotAvailable(this, ware, (gameState, wareName, warePrice) => {
            gameState.wares[wareName] = 1;

            gameState.money -= warePrice;
        }, hasEnoughMoney)) {
            renderLocationView(this.locationName, this.locationWares);

            return;
        }

        changeWaresIfAvailable(this, ware, (gameState, wareName, warePrice) => {
            gameState.wares[wareName] += 1;

            gameState.money -= warePrice;
        }, hasEnoughMoney);

        renderLocationView(this.locationName, this.locationWares);
    };
}

function getOnSellGoodClick(good) {
    return () => {
        changeWaresIfAvailable(this, good, (gameState, wareName, warePrice) => {
            if (gameState.wares[wareName] > 1) {
                gameState.wares[wareName] -= 1;
            } else {
                delete gameState.wares[wareName];
            }

            this.money += warePrice;
        });

        renderLocationView(this.locationName, this.locationWares);
    };
}

function ensureWares(gameState) {
    if (!gameState.hasOwnProperty("wares")) {
        gameState.wares = {};
    }
}

/**
 * If current gameState has an entry for provided ware, call changeCallback
 * @param {*} gameState
 * @param {*} ware
 * @param {(gameState, wareName, warePrice) => void} changeCallback
 * @param {(gameState, wareName, warePrice) => boolean} predicate
 * @returns {boolean} true if callback happened
 */
function changeWaresIfAvailable(gameState, ware, changeCallback, predicate) {
    ensureWares(gameState);

    if (typeof predicate === "function") {
        if (!predicate.call(this, gameState, ...ware)) {
            return false;
        }
    }

    if (gameState.wares.hasOwnProperty(ware[0])) {
        changeCallback.call(this, gameState, ...ware);
    } else {
        return false;
    }

    return true;
}

/**
 * If current gameState has no entry for provided ware, call changeCallback
 * @param {*} gameState
 * @param {*} ware
 * @param {(gameState, wareName, warePrice) => void} changeCallback
 * @param {(gameState, wareName, warePrice) => boolean} predicate
 * @returns {boolean} true if callback happened
 */
function changeWareIfNotAvailable(gameState, ware, changeCallback, predicate) {
    ensureWares(gameState);

    if (typeof predicate === "function") {
        if (!predicate.call(this, gameState, ...ware)) {
            return false;
        }
    }

    if (!gameState.wares.hasOwnProperty(ware[0])) {
        changeCallback.call(this, gameState, ...ware);
    } else {
        return false;
    }

    return true;
}

function* getStatusElements() {
    yield [
        "span",
        (elem, gameState) => {
            elem.textContent = `You have ${gameState.daysLeft} Days left`;
        }
    ];
    yield ["br"];
    yield [
        "span",
        (elem, gameState) => {
            elem.textContent = `You have ${gameState.money}¤`;
        }
    ];
    yield ["br"];
    yield [
        "span",
        (elem, gameState) => {
            elem.textContent = `You are in ${gameState.locationName}.`;
        }
    ];
}

// Game

function* getWares() {
    yield [
        "Drug A",
        10
    ];
    yield [
        "Drug B",
        175
    ];
    yield [
        "Drug Z",
        "589642"
    ];
}

// Utils

function renderView(newElementArgs, gameStateChange) {
    let that = this;

    resetView();

    if (!that.hasOwnProperty("gameState")) {
        if (!document.hasOwnProperty("gameState")) {
            document.gameState = {};
        }

        that = document.gameState;
    }

    if (typeof gameStateChange === "function") {
        gameStateChange(that);
    }

    for (const newElemArg of newElementArgs) {
        newElement.apply(that, newElemArg);
    }
}

function resetView() {
    const range = document.createRange();
    range.selectNodeContents(getBody());
    range.deleteContents();
    range.detach();
}

/**
 *
 * @this {Object} gameState
 * @param {*} tagName
 * @param {(element:HTMLElement, gameState:{}) => void | string} attachProperties If string will set textContent of element only
 * @param {*} parent
 */
function newElement(tagName, attachProperties, parent) {
    const element = document.createElement(tagName);

    if (typeof attachProperties === "function") {
        attachProperties.call(this, element, this);
    } else if (typeof attachProperties === "string") {
        element.textContent = attachProperties;
    }

    if (!(parent instanceof Node)) {
        parent = getBody();
    }

    parent.appendChild(element);
}

function getBody() {
    return document.getElementsByTagName("body")[0];
}
