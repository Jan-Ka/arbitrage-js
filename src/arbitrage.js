document.addEventListener("DOMContentLoaded", () => {
    renderView(
        [
            [
                "button",
                (elem) => {
                    elem.textContent = "Start Game";
                    elem.onclick = onGameStartButtonClick.bind(document.gameState);
                }
            ]
        ],
        (gameState) => {
            gameState.money = 20000;
        }
    );
});

/**
 * @this {Object} gameState
 */
function onGameStartButtonClick() {
    const goodsForLocation = getGoods();

    renderView(
        [
            ...getStatus.call(this),
            ["br"],
            ...getBuyGoodsButtons.call(this, goodsForLocation),
            ["br"],
            [
                "button",
                (elem) => {
                    elem.textContent = "Show Inventory";
                    elem.onclick = getShowInventoryClick.call(this);
                }
            ]
        ],
        (gameState) => {
            gameState.location = "Location A";
            gameState.locationGoods = goodsForLocation;
        }
    );
}

/**
 * @this {Object} gameState
 */
function getShowInventoryClick() {
    const goods = this.hasOwnProperty("goods") ? this.goods : {};
    const items = this.hasOwnProperty("items") ? this.items : {};

    return () => {
        renderView(
            [
                ...getStatus.apply(this),
                ["br"],
                [
                    "h2",
                    (elem) => {
                        elem.textContent = "Goods";
                    }
                ],
                ...getGoodsList(goods),
                ...getItemList(items),
                [
                    "button",
                    (elem) => {
                        elem.textContent = "Back";
                        elem.onclick = onGameStartButtonClick.bind(this);
                    }
                ]
            ]
        );
    };
}

function getBuyGoodsButtons(goods) {
    return goods.reduce((acc, good, i, arr) => {

        acc.push([
            "button",
            (elem) => {
                elem.textContent = `Buy ${good[0]} for ${good[1]}¤`;
                elem.onclick = getOnBuyGoodClick.call(this, good);
            }
        ]);

        if (i < arr.length - 1) {
            acc.push(["br"]);
        }


        return acc;
    }, []);
}

function getGoodsList(goods) {
    return Object.keys(goods).reduce((acc, goodsKey, i, arr) => {
        const goodsCount = goods[goodsKey];

        acc.push(
            [
                "span",
                (elem) => {
                    elem.textContent = `${goodsCount} x ${goodsKey}`;
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

function getOnBuyGoodClick(goodName) {
    return () => {
        if (!this.hasOwnProperty("goods")) {
            this.goods = {};
        }

        if (this.goods.hasOwnProperty(goodName)) {
            this.goods[goodName] += 1;
        } else {
            this.goods[goodName] = 1;
        }
    };
}

function getStatus() {
    return [
        [
            "span",
            (elem) => {
                elem.textContent = `You have ${this.money}¤`;
            }
        ],
        ["br"],
        [
            "span",
            (elem) => {
                elem.textContent = `You are at ${this.location}.`;
            }
        ]
    ];
}

// Game

function getGoods() {
    return [
        [
            "Drug A",
            10
        ],
        [
            "Drug B",
            175
        ]
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
 * @param {*} attachProperties
 * @param {*} parent
 */
function newElement(tagName, attachProperties, parent) {
    const element = document.createElement(tagName);

    if (typeof attachProperties === "function") {
        attachProperties(element);
    }

    if (!(parent instanceof Node)) {
        parent = getBody();
    }

    parent.appendChild(element);
}

function getBody() {
    return document.getElementsByTagName("body")[0];
}
