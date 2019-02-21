document.addEventListener("DOMContentLoaded", () => {
    renderView(
        [
            [
                "button",
                (elem) => {
                    elem.textContent = "Start Game";
                    elem.onclick = onGameStartButtonClick.bind(document.gameState); // make gameState available
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
    renderLocationView();
}

function renderLocationView(name, goods) {
    if (typeof name !== "string") {
        name = "nowhere";
    }

    if (!Array.isArray(goods)) {
        goods = [...getGoods()];
    }

    renderView(
        [
            ...getStatusElements.call(this),
            ["br"],
            ...getBuyGoodsButtons.call(this, goods),
            ["br"],
            [
                "button",
                (elem, gameState) => {
                    elem.textContent = "Show Inventory";
                    elem.onclick = getShowInventoryClick.call(gameState);
                }
            ]
        ],
        (gameState) => {
            gameState.locationName = name;
            gameState.locationGoods = goods;
        }
    );
}

/**
 * @this {Object} gameState
 */
function getShowInventoryClick() {
    return () => {
        const goods = this.hasOwnProperty("goods") ? this.goods : {};
        const items = this.hasOwnProperty("items") ? this.items : {};

        renderView(
            [
                ...getStatusElements.apply(this),
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
                    (elem, gameState) => {
                        elem.textContent = "Back";
                        elem.onclick = () => {
                            renderLocationView(gameState.locationName, gameState.locationGoods);
                        };
                    }
                ]
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

function getOnBuyGoodClick(good) {
    return () => {
        if (!this.hasOwnProperty("goods")) {
            this.goods = {};
        }

        const goodName = good[0];
        const goodPrice = good[1];

        if (this.money < goodPrice) {
            return;
        }

        if (this.goods.hasOwnProperty(goodName)) {
            this.goods[goodName] += 1;
        } else {
            this.goods[goodName] = 1;
        }

        this.money -= goodPrice;

        renderLocationView(this.locationName, this.locationGoods);
    };
}

function getOnSellGoodClick(good) {
    return () => {
        if (!this.hasOwnProperty("goods")) {
            this.goods = {};
        }

        const goodName = good[0];
        const goodPrice = good[1];

        if (this.goods.hasOwnProperty(goodName)) {
            if (this.goods[goodName] > 1) {
                this.goods[goodName] -= 1;
            } else {
                delete this.goods[goodName];
            }

            this.money += goodPrice;
        }

        renderLocationView(this.locationName, this.locationGoods);
    };
}

function* getStatusElements() {
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
            elem.textContent = `You are at ${gameState.locationName}.`;
        }
    ];
}

// Game

function* getGoods() {
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
 * @param {(element:HTMLElement, gameState:{}) => void} attachProperties
 * @param {*} parent
 */
function newElement(tagName, attachProperties, parent) {
    const element = document.createElement(tagName);

    if (typeof attachProperties === "function") {
        attachProperties.call(this, element, this);
    }

    if (!(parent instanceof Node)) {
        parent = getBody();
    }

    parent.appendChild(element);
}

function getBody() {
    return document.getElementsByTagName("body")[0];
}
